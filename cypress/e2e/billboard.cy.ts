describe('Intranet login tests', () => {
    beforeEach(() => {
        cy.visit('/')

    })

    it('Check product counter for Food category', () => {
        cy.login(Cypress.env('username'), Cypress.env('password'))

        const products: string[] = ['Electronics', 'Other', 'Food']

        cy.get(products).each(($el) => {

            cy.visit('https://intranet.ctco.lv/billboard/')
            cy.contains($el).find('.count').then(($productTest) => {
                cy.contains($el).click()
                const expectedCount = $productTest.text().substring(0, $productTest.text().indexOf(' '))
                cy.log('Display count ' + expectedCount)
                //how to get values length?
                let actualCount = 0;
                cy.get('.product-details').its('length').then((pageFirst) =>{
                    actualCount += pageFirst
                })
                cy.log('actualCount ' + actualCount)

                
                const findPage = () => {
                    cy.get('.wrap-content').find('.next').then(($wrap) => {
                        cy.log('$wrap text>' + $wrap.text() + '<')
                        cy.log('$wrap text length>' + $wrap.text().length + '<')

                        //fails if 'woocommerce-pagination' not exists how to check if it doesn't exist
                        cy.get('.woocommerce-pagination').then(($paging) => {
                            cy.log('nextPage text>' + $paging.text() + '<')

                            if ($paging.text().includes('→')) {
                                cy.get('.woocommerce-pagination').find('.next').click();
                                 cy.get('.product-details').its('length').then((pageNext) => {
                                     actualCount += pageNext
                                    cy.log('countFirst + ' + actualCount)
                                })

                                findPage()
                            }
                        })
                        return
                    }) //cy.get('.wrap-content').find('.next').then(($wrap)
                    expect(expectedCount == 3, $el +' count on main page differs from ' + $el + ' sum on all pages')
                }
                expect(expectedCount == 3, $el +' count on main page differs from ' + $el + ' sum on all pages')
                findPage()
            })
           
        })// cy.get(datal).each(($el, index) =>
    })

    // it('Check product counter for Food category', () => {
    //     cy.login(Cypress.env('username'), Cypress.env('password'))
    //    
    //     const datal = ['Electronics','Food']
    //
    //     cy.get(datal).each(($el) => {
    //        
    //
    //     cy.visit('https://intranet.ctco.lv/billboard/')
    //     cy.contains($el).find('.count').then(($productTest) => {
    //         cy.contains($el).click()
    //         const expectedCount = $productTest.text().substring(0, $productTest.text().indexOf(' '))
    //         cy.log('Display count ' + expectedCount)
    //         //how to get values length?
    //         let countFirst: string = (cy.get('.product-details').its('length'))
    //         cy.log('countFirst ' + countFirst)
    //        
    //         const findPage = () => {
    //             cy.get('.woocommerce-pagination').then(($paging) => {
    //                 cy.log('nextPage text>' + $paging.text() +'<')
    //                
    //             if ($paging.text().includes('→')){
    //                 cy.get('.woocommerce-pagination').find('.next').click();
    //                 let countNext  = (cy.get('.product-details').its('length'))
    //               
    //                 cy.log('countNext + ' + countNext)
    //                
    //                 findPage()
    //             }
    //         })
    //          return
    //         }
    //         findPage()
    //     })
    //
    // })// cy.get(datal).each(($el, index) =>
    // })
    //
    // it('Check product counter for Food category', () => {
    //     cy.login(Cypress.env('username'), Cypress.env('password'))
    //
    //     cy.visit('https://intranet.ctco.lv/billboard/')
    //     cy.contains('Electronics').find('.count').then(($productTest) => {
    //         cy.contains('Electronics').click()
    //         const expectedCount = $productTest.text().substring(0, $productTest.text().indexOf(' '))
    //         cy.log('Display count ' + expectedCount)
    //         //cy.get('.product-details').should('have.length', Number(count))
    //         let countFirst: string = (cy.get('.product-details').its('length'))
    //         cy.log('countFirst ' + countFirst)
    //        
    //       //  const findPage = () => {
    //             cy.get('.woocommerce-pagination').find('.next').then(($nextPage) => {
    //                 cy.log('nextPage text' + $nextPage.text())
    //                 if ($nextPage.text().length > 0) {
    //                     cy.get('.woocommerce-pagination').find('.next').click();
    //                     let countNext: number = Number(cy.get('.product-details').its('length'))
    //                     countFirst = countFirst + countNext
    //                     cy.log('countNext + ' + countNext)
    //
    //               //      findPage()
    //                 }
    //             })
    //           //  return
    //         //}
    //        
    //     })
    // })

})



