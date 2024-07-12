export const isValidCPF = (value) => {
    if (typeof value !== 'string') {
        return false;
    }

    const cpf = value.replace(/\D/g, '');

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    for (let t = 9; t < 11; t++) {
        let d = 0;
        for (let c = 0; c < t; c++) {
            d += parseInt(cpf[c]) * ((t + 1) - c);
        }
        d = ((10 * d) % 11) % 10;
        if (parseInt(cpf[t]) !== d) {
            return false;
        }
    }

    return true;
};