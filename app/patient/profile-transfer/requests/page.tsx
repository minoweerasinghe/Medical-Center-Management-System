"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle2, XCircle, Clock } from "lucide-react"

type ReqStatus = "pending" | "accepted" | "rejected"

interface TransferRequest {
  id: string
  fromFamilyUsername: string
  newOwnerName: string
  newOwnerNIC: string
  newOwnerContact: string
  actionType: "transferExisting" | "createNew"
  createdAt: string
  status: ReqStatus
}

export default function ProfileTransferRequestsPage() {
  const [requests, setRequests] = useState<TransferRequest[]>([
    {
      id: "REQ-001",
      fromFamilyUsername: "perera_family",
      newOwnerName: "Rohith Perera",
      newOwnerNIC: "987654321V",
      newOwnerContact: "075 1234567",
      actionType: "transferExisting",
      createdAt: "2026-01-24 10:20",
      status: "pending",
    },
  ])

  const [selected, setSelected] = useState<TransferRequest | null>(null)
  const [dialog, setDialog] = useState<null | "accept" | "reject" | "done">(null)

  const updateStatus = (id: string, status: ReqStatus) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Transfer Requests</h1>
        <p className="text-gray-600">Accept or reject incoming profile transfer requests.</p>
      </div>

      <Card className="p-6 bg-white max-w-3xl space-y-4">
        {requests.length === 0 ? (
          <div className="text-gray-600">No requests.</div>
        ) : (
          requests.map((r) => (
            <div key={r.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900">
                    From: <span className="font-bold">{r.fromFamilyUsername}</span>
                  </p>
                  <p className="text-sm text-gray-600">New Owner: {r.newOwnerName}</p>
                  <p className="text-sm text-gray-600">NIC: {r.newOwnerNIC} • Contact: {r.newOwnerContact}</p>
                  <p className="text-xs text-gray-500 mt-1">Requested at: {r.createdAt}</p>
                </div>

                <div className="flex items-center gap-2">
                  {r.status === "pending" && (
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                      <Clock className="h-3.5 w-3.5" /> Pending
                    </span>
                  )}
                  {r.status === "accepted" && (
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                      Accepted
                    </span>
                  )}
                  {r.status === "rejected" && (
                    <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                      Rejected
                    </span>
                  )}
                </div>
              </div>

              {r.status === "pending" && (
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setSelected(r)
                      setDialog("reject")
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      setSelected(r)
                      setDialog("accept")
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  >
                    Accept
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </Card>

      {/* Accept dialog */}
      <Dialog open={dialog === "accept"} onOpenChange={(o) => (!o ? setDialog(null) : null)}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Accept Transfer Request</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Accept transfer request from <span className="font-semibold">{selected?.fromFamilyUsername}</span>?
            </p>

            <div className="flex gap-3">
              <Button
                onClick={() => setDialog(null)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!selected) return
                  updateStatus(selected.id, "accepted")
                  setDialog("done")
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject dialog */}
      <Dialog open={dialog === "reject"} onOpenChange={(o) => (!o ? setDialog(null) : null)}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Reject Transfer Request</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Reject transfer request from <span className="font-semibold">{selected?.fromFamilyUsername}</span>?
            </p>

            <div className="flex gap-3">
              <Button
                onClick={() => setDialog(null)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!selected) return
                  updateStatus(selected.id, "rejected")
                  setDialog("done")
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Reject
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Done dialog */}
      <Dialog open={dialog === "done"} onOpenChange={(o) => (!o ? setDialog(null) : null)}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Updated</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-700" />
              </div>
            </div>

            <p className="text-center text-sm text-gray-700">
              Your decision was saved. (Connect API to finalize real transfer actions.)
            </p>

            <Button onClick={() => setDialog(null)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
