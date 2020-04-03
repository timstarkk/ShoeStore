const query = `
query {
    listStoreItems(limit: 999) {
    items {
        id
        fields {
        name 
        slug
        itemType
        price
        featured
        description
        images {
            imageFields {
            file {
                url
            }
            }
        }
        }
    }
    }
}
`

export default query;

// const items = [
//     {
//         sys: {
//             id: '1'
//         },
//         fields: {
//             name: 'item 1',
//             slug: 'item-1',
//             type: 'custom',
//             price: 100,
//             featured: true,
//             description: 'an amazing item from the world of items',
//             images: [
//                 {
//                     fields: {
//                         file: {
//                             url: sneaker1
//                         }
//                     }
//                 }
//             ]
//         }
//     },
//     {
//         sys: {
//             id: '2'
//         },
//         fields: {
//             name: 'item 2',
//             slug: 'item-2',
//             type: 'custom',
//             price: 200,
//             featured: true,
//             description: 'an amazing item from the world of items',
//             images: [
//                 {
//                     fields: {
//                         file: {
//                             url: sneaker2
//                         }
//                     }
//                 }
//             ]
//         }
//     },
//     {
//         sys: {
//             id: '3'
//         },
//         fields: {
//             name: 'item 3',
//             slug: 'item-3',
//             type: 'custom',
//             price: 300,
//             featured: true,
//             description: 'an amazing item from the world of items',
//             images: [
//                 {
//                     fields: {
//                         file: {
//                             url: sneaker3
//                         }
//                     }
//                 }
//             ]
//         }
//     },
//     {
//         sys: {
//             id: '4'
//         },
//         fields: {
//             name: 'item 4',
//             slug: 'item-4',
//             type: 'custom',
//             price: 400,
//             featured: true,
//             description: 'an amazing item from the world of items',
//             images: [
//                 {
//                     fields: {
//                         file: {
//                             url: sneaker4
//                         }
//                     }
//                 }
//             ]
//         }
//     },
//     {
//         sys: {
//             id: '5'
//         },
//         fields: {
//             name: 'item 5',
//             slug: 'item-5',
//             type: 'custom',
//             price: 500,
//             featured: true,
//             description: 'an amazing item from the world of items',
//             images: [
//                 {
//                     fields: {
//                         file: {
//                             url: sneaker5
//                         }
//                     }
//                 }
//             ]
//         }
//     },
//     {
//         sys: {
//             id: '6'
//         },
//         fields: {
//             name: 'item 6',
//             slug: 'item-6',
//             type: 'custom',
//             price: 600,
//             featured: true,
//             description: 'an amazing item from the world of items',
//             images: [
//                 {
//                     fields: {
//                         file: {
//                             url: sneaker6
//                         }
//                     }
//                 }
//             ]
//         }
//     },
//     {
//         sys: {
//             id: '7'
//         },
//         fields: {
//             name: 'item 7',
//             slug: 'item-7',
//             type: 'custom',
//             price: 700,
//             featured: true,
//             description: 'an amazing item from the world of items',
//             images: [
//                 {
//                     fields: {
//                         file: {
//                             url: sneaker7
//                         }
//                     }
//                 }
//             ]
//         }
//     },
//     {
//         sys: {
//             id: '8'
//         },
//         fields: {
//             name: 'item 8',
//             slug: 'item-8',
//             type: 'custom',
//             price: 800,
//             featured: false,
//             description: 'an amazing item from the world of items',
//             images: [
//                 {
//                     fields: {
//                         file: {
//                             url: sneaker8
//                         }
//                     }
//                 }
//             ]
//         }
//     },
//     {
//         sys: {
//             id: '9'
//         },
//         fields: {
//             name: 'item 9',
//             slug: 'item-9',
//             type: 'custom',
//             price: 900,
//             featured: false,
//             description: 'an amazing item from the world of items',
//             images: [
//                 {
//                     fields: {
//                         file: {
//                             url: sneaker9
//                         }
//                     }
//                 }
//             ]
//         }
//     },
//     {
//         sys: {
//             id: '10'
//         },
//         fields: {
//             name: 'item 10',
//             slug: 'item-10',
//             type: 'custom',
//             price: 1000,
//             featured: false,
//             description: 'an amazing item from the world of items',
//             images: [
//                 {
//                     fields: {
//                         file: {
//                             url: sneaker10
//                         }
//                     }
//                 }
//             ]
//         }
//     },
//     {
//         sys: {
//             id: '11'
//         },
//         fields: {
//             name: 'item 11',
//             slug: 'item-11',
//             type: 'custom',
//             price: 1100,
//             featured: false,
//             description: 'an amazing item from the world of items',
//             images: [
//                 {
//                     fields: {
//                         file: {
//                             url: sneaker11
//                         }
//                     }
//                 }
//             ]
//         }
//     }
// ]