document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-up');
    animatedElements.forEach(el => observer.observe(el));


    // 2. Interactive Calculator Logic
    const calcRows = document.querySelectorAll('.calc-row');
    const totalSetupEl = document.getElementById('total-setup');
    const totalMonthlyEl = document.getElementById('total-monthly');
    const totalSumEl = document.getElementById('total-sum');
    const btnFechar = document.getElementById('btn-fechar');
    
    // Format number to BRL Currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value).replace('R$', 'R$ ');
    };

    // Calculate Totals
    const calculateTotals = () => {
        let setupTotal = 0;
        let monthlyTotal = 0;

        calcRows.forEach(row => {
            if (row.classList.contains('active')) {
                const price = parseFloat(row.getAttribute('data-price'));
                const type = row.getAttribute('data-type');
                
                if (type === 'setup') {
                    setupTotal += price;
                } else if (type === 'monthly') {
                    monthlyTotal += price;
                }
            }
        });

        // Animate total update
        totalSetupEl.style.opacity = '0.5';
        totalMonthlyEl.style.opacity = '0.5';
        if (totalSumEl) totalSumEl.style.opacity = '0.5';
        
        setTimeout(() => {
            totalSetupEl.textContent = formatCurrency(setupTotal);
            totalMonthlyEl.textContent = formatCurrency(monthlyTotal);
            if (totalSumEl) totalSumEl.textContent = formatCurrency(setupTotal + monthlyTotal);
            
            totalSetupEl.style.opacity = '1';
            totalMonthlyEl.style.opacity = '1';
            if (totalSumEl) totalSumEl.style.opacity = '1';
        }, 200);
    };

    // Toggle Row Event
    calcRows.forEach(row => {
        row.addEventListener('click', () => {
            row.classList.toggle('active');
            calculateTotals();
        });
    });

    // 3. WhatsApp Integration
    if (btnFechar) {
        btnFechar.addEventListener('click', () => {
            let selectedServices = [];
            
            calcRows.forEach(row => {
                if (row.classList.contains('active')) {
                    selectedServices.push(row.querySelector('.calc-name').textContent);
                }
            });

            const setupValue = totalSetupEl.textContent;
            const monthlyValue = totalMonthlyEl.textContent;
            const totalSumValue = totalSumEl ? totalSumEl.textContent : '';
            
            let message = `Olá! Analisei a proposta comercial e gostaria de avançar.\n\n`;
            
            if (selectedServices.length > 0) {
                message += `*Serviços selecionados:*\n- ${selectedServices.join('\n- ')}\n\n`;
                message += `*Investimento Estimado:*\nSetup (Único): ${setupValue}\nMensalidade: ${monthlyValue}\n*Total no 1º Mês:* ${totalSumValue}\n\n`;
                message += `Podemos dar o próximo passo?`;
            } else {
                message += `Ainda estou com algumas dúvidas sobre os serviços, podemos conversar?`;
            }

            const encodedMessage = encodeURIComponent(message);
            // Replace with the actual consultant's number
            const whatsappNumber = '5582998437418'; 
            
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        });
    }

    // Initial calculation to set the default values
    calculateTotals();
});
