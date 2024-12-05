
'use client';
import React, { useState, useRef } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:5000/api';

const InventoryManager = () => {
  const initialData = {
    'CARNES': [
      { nombre: 'Carne Molida 1kg', stockRequerido: 15 },
      { nombre: 'Salchichas Sureña 1kg', stockRequerido: 15 },
      { nombre: 'Longanizas 1kg', stockRequerido: 15 },
      { nombre: 'Tuto de pollo x5', stockRequerido: 20 },
      { nombre: 'Chuleta de Cerdo x5', stockRequerido: 20 },
      { nombre: 'Osobuco x5', stockRequerido: 20 },
      { nombre: 'Carne Ahumada 1kg', stockRequerido: 15 },
      { nombre: 'Bistec x5', stockRequerido: 20 }
    ],
    'ABARROTES': [
      { nombre: 'Aceite', stockRequerido: 20 },
      { nombre: 'Vinagre 500ml', stockRequerido: 15 },
      { nombre: 'Sucedáneo de Limón 500ml', stockRequerido: 15 },
      { nombre: 'Caldo de carne', stockRequerido: 10 },
      { nombre: 'Caldo de gallina', stockRequerido: 10 },
      { nombre: 'Caldo de verdura', stockRequerido: 10 },
      { nombre: 'Orégano', stockRequerido: 8 },
      { nombre: 'Comino', stockRequerido: 8 },
      { nombre: 'Pimienta', stockRequerido: 8 },
      { nombre: 'Aliño completo', stockRequerido: 8 },
      { nombre: 'Ají color', stockRequerido: 8 },
      { nombre: 'Mayonesa', stockRequerido: 15 },
      { nombre: 'Ketchup', stockRequerido: 15 },
      { nombre: 'Ají', stockRequerido: 10 },
      { nombre: 'Mostaza', stockRequerido: 10 },
      { nombre: 'Salsa de tomates 200gr', stockRequerido: 20 },
      { nombre: 'Sal 1kg', stockRequerido: 15 },
      { nombre: 'Azúcar 1kg', stockRequerido: 15 },
      { nombre: 'Arvejas congeladas 200gr', stockRequerido: 20 },
      { nombre: 'Choclo congelado 200gr', stockRequerido: 20 },
      { nombre: 'Primavera congelada 200gr', stockRequerido: 20 },
      { nombre: 'Porotos 1kg', stockRequerido: 20 },
      { nombre: 'Paquetes de Fideos', stockRequerido: 25 },
      { nombre: 'Lentejas 1kg', stockRequerido: 20 },
      { nombre: 'Arroz 1kg', stockRequerido: 25 },
      { nombre: 'Jurel', stockRequerido: 20 },
      { nombre: 'Atún', stockRequerido: 20 }
    ],
    'FRESCOS': [
      { nombre: 'Ajo (cabeza)', stockRequerido: 20 },
      { nombre: 'Cebolla (unidad)', stockRequerido: 30 },
      { nombre: 'Lechuga (unidad)', stockRequerido: 25 },
      { nombre: 'Pepinos (unidad)', stockRequerido: 25 },
      { nombre: 'Limones 1kg', stockRequerido: 15 },
      { nombre: 'Manzanas 1kg', stockRequerido: 20 },
      { nombre: 'Naranja 1kg', stockRequerido: 20 },
      { nombre: 'Pimentón (unidad)', stockRequerido: 25 },
      { nombre: 'Repollo (unidad)', stockRequerido: 20 },
      { nombre: 'Tomates 1kg', stockRequerido: 25 },
      { nombre: 'Zanahorias 1kg', stockRequerido: 20 },
      { nombre: 'Zapallo 1kg', stockRequerido: 15 },
      { nombre: 'Papas saco 25kg', stockRequerido: 10 },
      { nombre: 'Leche en polvo 1kg', stockRequerido: 20 },
      { nombre: 'Queso laminado 1kg', stockRequerido: 15 },
      { nombre: 'Mantequilla 500gr', stockRequerido: 15 },
      { nombre: 'Manjar 1kg', stockRequerido: 10 },
      { nombre: 'Bandeja Huevos', stockRequerido: 20 }
    ],
    'PANADERIA Y REPOSTERIA': [
      { nombre: 'Polvos de Hornear 500gr', stockRequerido: 10 },
      { nombre: 'Manteca 1kg', stockRequerido: 15 },
      { nombre: 'Levadura 500gr', stockRequerido: 10 },
      { nombre: 'Harina 25kg', stockRequerido: 20 },
      { nombre: 'Dulce de membrillo 500gr', stockRequerido: 15 },
      { nombre: 'Mermeladas Pate 200gr', stockRequerido: 20 }
    ],
    'BEBIDAS': [
      { nombre: 'Yerba mate 1/2kg', stockRequerido: 15 },
      { nombre: 'Té hierbas (100 unidades)', stockRequerido: 20 },
      { nombre: 'Té (100 unidades)', stockRequerido: 20 },
      { nombre: 'Milo 500gr', stockRequerido: 15 },
      { nombre: 'Jugo en polvo', stockRequerido: 20 },
      { nombre: 'Café 1kg (Tarro)', stockRequerido: 15 },
      { nombre: 'Agua bidón', stockRequerido: 50 },
      { nombre: 'Jugo líquido', stockRequerido: 25 }
    ],
    'LIMPIEZA Y OTROS': [
      { nombre: 'Cloro gel 1L', stockRequerido: 15 },
      { nombre: 'Desinfectante ambiental', stockRequerido: 15 },
      { nombre: 'Lavaloza 750gr', stockRequerido: 15 },
      { nombre: 'Papel absorvente (unidad)', stockRequerido: 30 },
      { nombre: 'Papel higiénico (unidad)', stockRequerido: 40 },
      { nombre: 'Esponjas', stockRequerido: 20 },
      { nombre: 'Jabón liquido 250ml', stockRequerido: 15 },
      { nombre: 'Bolsas basura GRANDE', stockRequerido: 25 },
      { nombre: 'Bolsas basura CHICA', stockRequerido: 25 },
      { nombre: 'CIF', stockRequerido: 15 },
      { nombre: 'Detergente', stockRequerido: 15 },
      { nombre: 'Virutilla', stockRequerido: 20 },
      { nombre: 'Fosforos (Set de cajas)', stockRequerido: 15 },
      { nombre: 'Bidones Llenos', stockRequerido: 20 },
      { nombre: 'Bidones vacios', stockRequerido: 20 },
      { nombre: 'Balón de gas', stockRequerido: 5 }
    ]
  };

 const [formInicial, setFormInicial] = useState({
   nombre: '',
   nombreEmbarcacion: '',
   fecha: new Date().toLocaleDateString()
 });

 const [formularioCompletado, setFormularioCompletado] = useState(false);

 const stockActualRef = useRef(null);

 const [inventory, setInventory] = useState(() => {
   const initialInventory = {};
   Object.keys(initialData).forEach(category => {
     initialInventory[category] = {
       items: initialData[category].map(item => ({
         ...item,
         stockActual: '',
         necesario: item.stockRequerido,
         observaciones: ''
       })),
       otros: []
     };
   });
   return initialInventory;
 });

 const [categoriaActiva, setCategoriaActiva] = useState(Object.keys(initialData)[0]);

 const handleStockChange = (category, index, value) => {
   const newValue = value === '' ? '' : parseInt(value);
   setInventory(prev => ({
     ...prev,
     [category]: {
       ...prev[category],
       items: prev[category].items.map((item, i) => {
         if (i === index) {
           return {
             ...item,
             stockActual: newValue,
             necesario: newValue === '' ? item.stockRequerido : item.stockRequerido - newValue
           };
         }
         return item;
       })
     }
   }));
 };

 const handleObservacionChange = (category, index, value) => {
   setInventory(prev => ({
     ...prev,
     [category]: {
       ...prev[category],
       items: prev[category].items.map((item, i) => {
         if (i === index) {
           return {
             ...item,
             observaciones: value
           };
         }
         return item;
       })
     }
   }));
 };

 const handleAddOtroProducto = (category) => {
   setInventory(prev => ({
     ...prev,
     [category]: {
       ...prev[category],
       otros: [...prev[category].otros, { nombre: '', observaciones: '' }]
     }
   }));
 };
 const saveInventory = async () => {
  try {
    const inventoryData = {
      nombre: formInicial.nombre,
      embarcacion: formInicial.nombreEmbarcacion,
      categorias: Object.entries(inventory).map(([nombre, data]) => ({
        nombre,
        items: data.items.map(item => ({
          nombre: item.nombre,
          stockActual: item.stockActual,
          stockRequerido: item.stockRequerido,
          necesario: item.necesario,
          observaciones: item.observaciones
        }))
      }))
    };
    
    const response = await axios.post(`${API_URL}/inventory/save`, inventoryData);
    alert('Inventario guardado exitosamente');
  } catch (error) {
    alert('Error al guardar inventario');
    console.error(error);
  }
};

 const handleOtroProductoChange = (category, index, field, value) => {
   setInventory(prev => ({
     ...prev,
     [category]: {
       ...prev[category],
       otros: prev[category].otros.map((item, i) => 
         i === index ? { ...item, [field]: value } : item
       )
     }
   }));
 };

 const handleFormularioInicial = (e) => {
   e.preventDefault();
   console.log('Formulario iniciado');
   console.log('Nombre:', formInicial.nombre);
   console.log('Embarcación:', formInicial.nombreEmbarcacion);
   
   if (formInicial.nombre && formInicial.nombreEmbarcacion) {
     console.log('Validación exitosa');
     setFormularioCompletado(true);
     console.log('Estado actualizado');
   } else {
     console.log('Validación fallida');
   }
 };

 const generateReport = (type) => {
   let report = 'LISTA DE COMPRAS\n\n';
   Object.entries(inventory).forEach(([category, data]) => {
     let hasCategoryItems = false;
     
     // Productos regulares
     data.items.forEach(item => {
       if (item.necesario > 0) {
         if (!hasCategoryItems) {
           report += `${category}\n`;
           hasCategoryItems = true;
         }
         report += `- ${item.nombre}: Faltan ${item.necesario} unidades para llegar al stock requerido`;
         if (item.observaciones) {
           report += ` (${item.observaciones})`;
         }
         report += '\n';
       }
     });

     // Otros productos
     data.otros.forEach(otro => {
       if (otro.nombre) {
         if (!hasCategoryItems) {
           report += `${category}\n`;
           hasCategoryItems = true;
         }
         report += `- OTRO: ${otro.nombre}`;
         if (otro.observaciones) {
           report += ` (${otro.observaciones})`;
         }
         report += '\n';
       }
     });

     if (hasCategoryItems) {
       report += '\n';
     }
   });
   
   if (type === 'email') {
     const mailtoLink = `mailto:correo@ejemplo.com?subject=Lista de Compras&body=${encodeURIComponent(report)}`;
     window.location.href = mailtoLink;
   } else if (type === 'download') {
     const blob = new Blob([report], { type: 'text/plain' });
     const url = window.URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = 'lista-compras.txt';
     a.click();
     window.URL.revokeObjectURL(url);
   }
 };

 const saveAndSend = () => {
  saveInventory();
  generateReport('email');
};

return (
  <div className="min-h-screen bg-black">
    {!formularioCompletado ? (
      <div className="max-w-md mx-auto p-6">
        <img 
          src="/logo.png"
          alt="Logo de la empresa"
          className="h-24 mx-auto mb-8"
        />
        <h1 className="text-2xl font-bold mb-12 text-center text-white">Control de Inventario</h1>
        <form onSubmit={handleFormularioInicial} className="bg-gray-800 rounded-lg p-6 mt-8">
          <div className="mb-4">
            <label className="block text-white mb-2">Nombre</label>
            <input
              type="text"
              value={formInicial.nombre}
              onChange={(e) => setFormInicial({...formInicial, nombre: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2">Embarcación</label>
            <input
              type="text"
              value={formInicial.nombreEmbarcacion}
              onChange={(e) => setFormInicial({...formInicial, nombreEmbarcacion: e.target.value})}
              placeholder="Nombre de la embarcación"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Continuar
          </button>
        </form>
      </div>
    ) : (
      <div className="max-w-4xl mx-auto p-4">
        <img 
          src="/logo.png"
          alt="Logo de la empresa"
          className="h-24 mx-auto mb-8"
        />
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Control de Inventario</h1>
        
        {/* Selector móvil */}
        <div className="w-full px-4">
        <select 
             value={categoriaActiva}
             onChange={(e) => setCategoriaActiva(e.target.value)}
             className="w-full mb-4 p-3 bg-gray-700 text-white rounded border border-gray-600 text-lg"
           >
             {Object.keys(inventory).map(category => (
               <option key={category} value={category}>
                 {category}
               </option>
             ))}
           </select>

           {/* Contenido de la categoría */}
           <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4">
             <h2 className="text-xl font-bold mb-4 text-white">{categoriaActiva}</h2>
             <div className="grid grid-cols-3 gap-4 font-bold mb-2 text-white">
               <div>Producto</div>
               <div>Stock Actual</div>
               <div>Observaciones</div>
             </div>
             {inventory[categoriaActiva].items.map((item, index) => (
               <div key={index} className="grid grid-cols-3 gap-4 mb-2 text-white">
                 <div>{item.nombre}</div>
                 <div>
                 <input
                   type="text"
                   inputMode="numeric"
                   pattern="[0-9]*"
                   value={item.stockActual}
                   onKeyPress={(e) => {
                     if (e.key === 'Enter') {
                        const inputs = document.querySelectorAll('input[type="text"]');
                        const index = Array.from(inputs).indexOf(e.target);
                        if (index < inputs.length - 1) {
                          inputs[index + 1].focus();
                        }
                      }
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\d+$/.test(value)) {
                      handleStockChange(categoriaActiva, index, value);
                    }
                  }}
                className="w-full px-2 py-1 border rounded bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
                 </div>
                 <div>
                   <input
                     type="text"
                     value={item.observaciones}
                     onChange={(e) => handleObservacionChange(categoriaActiva, index, e.target.value)}
                     placeholder="Observaciones"
                     className="w-full px-2 py-1 border rounded bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none"
                   />
                 </div>
               </div>
             ))}
             {/*boton continuar */}
             <button
              onClick={() => {
                const allFieldsFilled = inventory[categoriaActiva].items.every(item => item.stockActual !== '');
                if (allFieldsFilled) {
                  const categories = Object.keys(inventory);
                  const currentIndex = categories.indexOf(categoriaActiva);
                  if (currentIndex < categories.length - 1) {
                    setCategoriaActiva(categories[currentIndex + 1]);
                  }
                } else {
                  alert('Por favor complete todos los campos de stock actual');
                }
              }}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
            >
              Continuar a siguiente categoría
            </button>

             {/* Sección de otros productos */}
             <div className="mt-4 border-t border-gray-600 pt-4">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="font-bold text-white">Otros Productos</h3>
                 <button
                   onClick={() => handleAddOtroProducto(categoriaActiva)}
                   className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
                 >
                   + Agregar Producto
                 </button>
               </div>
               {inventory[categoriaActiva].otros.map((otro, index) => (
                 <div key={`otro-${index}`} className="grid grid-cols-2 gap-4 mb-2">
                   <input
                     type="text"
                     value={otro.nombre}
                     onChange={(e) => handleOtroProductoChange(categoriaActiva, index, 'nombre', e.target.value)}
                     placeholder="Nombre del producto"
                     className="w-full px-2 py-1 border rounded bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none"
                   />
                   <input
                     type="text"
                     value={otro.observaciones}
                     onChange={(e) => handleOtroProductoChange(categoriaActiva, index, 'observaciones', e.target.value)}
                     placeholder="Observaciones"
                     className="w-full px-2 py-1 border rounded bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none"
                   />
                 </div>
               ))}
             </div>
           </div>

           {/* Botones de acción */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <button
               onClick={() => generateReport('email')}
               className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
             >
               Enviar por Correo
             </button>
             <button
               onClick={() => generateReport('download')}
               className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
             >
               Descargar Lista
             </button>
             <button
               onClick={saveAndSend}
               className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
             >
               Guardar y Enviar
             </button>
           </div>
         </div>
       </div>
     )}
   </div>
 );
};

export default InventoryManager;