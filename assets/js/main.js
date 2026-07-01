document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isActive = question.classList.contains('active');
            
            // Close all answers
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });

            // If it wasn't active, open it
            if (!isActive) {
                question.classList.add('active');
                const answer = question.nextElementSibling;
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Form Submission to WhatsApp
    const leadForm = document.getElementById('leadForm');
    
    if(leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Format message for WhatsApp
            let text = `Olá, meu nome é ${nome}. Gostaria de agendar uma avaliação gratuita.`;
            text += `\nMeu número é: ${telefone}`;
            
            if(mensagem.trim() !== '') {
                text += `\n\nSobre a criança: ${mensagem}`;
            }
            
            const encodedText = encodeURIComponent(text);
            
            // WhatsApp Number (Placeholder, the user will change it)
            const whatsappNumber = '5582999999999';
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    // Phone Mask (Simple implementation)
    const phoneInput = document.getElementById('telefone');
    if(phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
});
