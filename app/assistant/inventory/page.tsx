'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Medicine {
  id: string
  medicineName: string
  stockQuantity: number
  unitPrice: number
  expiryDate: string
  storagePlace: string
  dosage: string
  quantityPerPack: number
}

export default function InventoryPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: 'ME1001',
      medicineName: 'Paracetamol',
      stockQuantity: 100,
      unitPrice: 10,
      expiryDate: '2025-01-31',
      storagePlace: 'Shelf A1',
      dosage: '500mg',
      quantityPerPack: 10,
    },
    {
      id: 'ME1002',
      medicineName: 'Ibuprofen',
      stockQuantity: 250,
      unitPrice: 50,
      expiryDate: '2025-08-15',
      storagePlace: 'Shelf B2',
      dosage: '200mg',
      quantityPerPack: 50,
    },
    {
      id: 'ME1003',
      medicineName: 'Amoxicillin',
      stockQuantity: 50,
      unitPrice: 25,
      expiryDate: '2025-06-30',
      storagePlace: 'Shelf C1',
      dosage: '250mg',
      quantityPerPack: 10,
    },
    {
      id: 'ME1004',
      medicineName: 'Aspirin',
      stockQuantity: 150,
      unitPrice: 5,
      expiryDate: '2025-09-12',
      storagePlace: 'Shelf A3',
      dosage: '100mg',
      quantityPerPack: 50,
    },
  ])

  const [newMedicine, setNewMedicine] = useState({
    medicineName: '',
    stockQuantity: '',
    unitPrice: '',
    expiryDate: '',
    storagePlace: '',
    dosage: '',
    quantityPerPack: '',
  })

  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAddMedicine = () => {
    if (newMedicine.medicineName && newMedicine.unitPrice) {
      const newId = `ME${medicines.length + 1001}`
      setMedicines([
        ...medicines,
        {
          id: newId,
          medicineName: newMedicine.medicineName,
          stockQuantity: parseInt(newMedicine.stockQuantity) || 0,
          unitPrice: parseFloat(newMedicine.unitPrice),
          expiryDate: newMedicine.expiryDate,
          storagePlace: newMedicine.storagePlace,
          dosage: newMedicine.dosage,
          quantityPerPack: parseInt(newMedicine.quantityPerPack) || 0,
        },
      ])
      setNewMedicine({
        medicineName: '',
        stockQuantity: '',
        unitPrice: '',
        expiryDate: '',
        storagePlace: '',
        dosage: '',
        quantityPerPack: '',
      })
    }
  }

  const handleDelete = (id: string) => {
    setMedicines(medicines.filter((m) => m.id !== id))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Medicine Inventory Management</h1>
      </div>

      {/* Medicines Table */}
      <Card className="p-6 bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Current Inventory</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Medicine ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Stock Quantity</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Unit Price</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Expiry Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Storage Place</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Dosage</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Quantity per Pack</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {medicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{medicine.id}</td>
                  <td className="px-4 py-3 text-gray-900">{medicine.medicineName}</td>
                  <td className="px-4 py-3 text-gray-600">{medicine.stockQuantity}</td>
                  <td className="px-4 py-3 text-gray-600">Rs. {medicine.unitPrice}</td>
                  <td className="px-4 py-3 text-gray-600">{medicine.expiryDate}</td>
                  <td className="px-4 py-3 text-gray-600">{medicine.storagePlace}</td>
                  <td className="px-4 py-3 text-gray-600">{medicine.dosage}</td>
                  <td className="px-4 py-3 text-gray-600">{medicine.quantityPerPack}</td>
                  <td className="px-4 py-3 space-x-2">
                    <Button
                      onClick={() => setEditingId(medicine.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(medicine.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Medicine Form */}
      <Card className="p-8 bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add/Edit Medicine</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name</label>
            <input
              type="text"
              placeholder="Medicine Name"
              value={newMedicine.medicineName}
              onChange={(e) => setNewMedicine({ ...newMedicine, medicineName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
              <input
                type="number"
                placeholder="Stock Quantity"
                value={newMedicine.stockQuantity}
                onChange={(e) => setNewMedicine({ ...newMedicine, stockQuantity: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price</label>
              <input
                type="number"
                placeholder="Unit Price"
                value={newMedicine.unitPrice}
                onChange={(e) => setNewMedicine({ ...newMedicine, unitPrice: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
            <input
              type="date"
              value={newMedicine.expiryDate}
              onChange={(e) => setNewMedicine({ ...newMedicine, expiryDate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Storage Place</label>
            <input
              type="text"
              placeholder="Storage Place"
              value={newMedicine.storagePlace}
              onChange={(e) => setNewMedicine({ ...newMedicine, storagePlace: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
            <input
              type="text"
              placeholder="Dosage"
              value={newMedicine.dosage}
              onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity per Pack</label>
            <input
              type="number"
              placeholder="Quantity per Pack"
              value={newMedicine.quantityPerPack}
              onChange={(e) => setNewMedicine({ ...newMedicine, quantityPerPack: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleAddMedicine} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3">
              Add Medicine
            </Button>
            <Button
              onClick={() =>
                setNewMedicine({
                  medicineName: '',
                  stockQuantity: '',
                  unitPrice: '',
                  expiryDate: '',
                  storagePlace: '',
                  dosage: '',
                  quantityPerPack: '',
                })
              }
              className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-3"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
