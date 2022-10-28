describe('Intranet login tests', () => {
    beforeEach(() => {
        cy.visit('/')

    })
    
//Tried to find common solution for  all cases no pagination/multiple pagination
//Limitation - can be executed only for two pages   
//Faced issues:  
//1. how to check that pagination is displayed, property expected
//2. actualCount value returned by function checkTwoPages() is 0, most probably not better solution for typescript
    
    it('Check product counter for \'Other\', \'Electronics\' category', () => {
        cy.login(Cypress.env('username'), Cypress.env('password'))

        const productList: string[] = ['Other', 'Electronics']
        
        cy.get(productList).each(($product) => {
            let actualCount = 0
            cy.visit('') //billboard
            cy.contains($product).find('.count').then(($productTotal) => {
                
                let expectedCount = Number($productTotal.text().substring(0, $productTotal.text().indexOf(' ')))
                cy.contains($product).click()
                
                cy.get('.product-details').its('length').then((firtPageCount) => {
                    actualCount += firtPageCount
                })
                
                function checkTwoPages() {
                    //fails if 'woocommerce-pagination' doest exist - no pagination
                    cy.get('.woocommerce-pagination').then(($paging) => {
                        if ($paging.text().includes('→')) {
                            cy.get('.woocommerce-pagination').find('.next').click();
                            cy.get('.product-details').its('length').then((pageNext) => {
                                actualCount += pageNext
                                //assertion inside the function since fased issue to return value, returned as 0
                                 expect(expectedCount).to.equal(actualCount, 'Total ' +$product+ ' differs from pagination count')
                            })
                            checkTwoPages() //not needed since not checked if pagination displayed
                        }
                    })
                    return
                }
                checkTwoPages()
            })
        })
    })
    
})



