"use client"

import { useState, useRef, type ChangeEvent, type DragEvent } from "react"
import { UploadCloud, X, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  multiple?: boolean
  maxSize?: number // in MB
  acceptedTypes?: string[]
  onUpload: (formData: FormData) => Promise<{ success: boolean; message: string; urls?: string[] }>
  onSuccess?: (urls: string[]) => void
}

export default function FileUploader({
  multiple = false,
  maxSize = 5, // Default 5MB
  acceptedTypes = ["*/*"],
  onUpload,
  onSuccess,
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    success?: boolean
    message?: string
    urls?: string[]
  }>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files)
      validateAndSetFiles(fileList)
    }
  }

  const validateAndSetFiles = (fileList: File[]) => {
    const validFiles = fileList.filter((file) => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        setUploadStatus({
          success: false,
          message: `File ${file.name} exceeds the maximum size of ${maxSize}MB`,
        })
        return false
      }

      // Check file type if specific types are provided
      if (acceptedTypes[0] !== "*/*") {
        const fileType = file.type
        const isValidType = acceptedTypes.some((type) => {
          if (type.endsWith("/*")) {
            const category = type.split("/")[0]
            return fileType.startsWith(`${category}/`)
          }
          return type === fileType
        })

        if (!isValidType) {
          setUploadStatus({
            success: false,
            message: `File ${file.name} is not an accepted file type`,
          })
          return false
        }
      }

      return true
    })

    if (multiple) {
      setFiles((prev) => [...prev, ...validFiles])
    } else {
      setFiles(validFiles.slice(0, 1))
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      const fileList = Array.from(e.dataTransfer.files)
      validateAndSetFiles(fileList)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadStatus({
        success: false,
        message: "Please select at least one file to upload",
      })
      return
    }

    setIsUploading(true)
    setUploadStatus({})

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append("files", file)
      })

      const result = await onUpload(formData)

      setUploadStatus({
        success: result.success,
        message: result.message,
        urls: result.urls,
      })

      if (result.success) {
        if(onSuccess) {
          onSuccess(result.urls || []);
        }
        setFiles([])
      }
    } catch {
      setUploadStatus({
        success: false,
        message: "An error occurred during upload",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="w-full space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        tabIndex={0}
        role="button"
        aria-label="Upload files"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple={multiple}
          accept={acceptedTypes.join(",")}
        />
        <div className="flex flex-col items-center justify-center space-y-2">
          <UploadCloud className="h-10 w-10 text-gray-400" />
          <h3 className="text-lg font-medium">{isDragging ? "Drop files here" : "Drag and drop files here"}</h3>
          <p className="text-sm text-gray-500">
            or <span className="text-primary font-medium">browse</span> to select files
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {multiple ? "Upload multiple files" : "Upload a single file"} up to {maxSize}MB
            {acceptedTypes[0] !== "*/*" && <span> ({acceptedTypes.join(", ")})</span>}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Selected Files ({files.length})</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {uploadStatus.message && (
        <div
          className={cn(
            "p-3 rounded-md text-sm",
            uploadStatus.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800",
          )}
        >
          <div className="flex items-center space-x-2">
            {uploadStatus.success ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            <span>{uploadStatus.message}</span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={isUploading || files.length === 0}
        className={cn(
          "w-full py-2 px-4 rounded-md font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
          isUploading || files.length === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary/90",
        )}
      >
        {isUploading ? "Uploading..." : "Upload Files"}
      </button>
    </div>
  )
}
