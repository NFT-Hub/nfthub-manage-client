class ValidationUtil {
    static typeExceptionMsg(cbName: string, type: string) {
        return `${cbName} can only use when value is ${type}`;
    }
}

export class ValidationCheck {
    static checkFalsy(value: any, msg: string): string {
        if (!value) return msg;
        return '';
    }
    static string(value: string) {
        return new StringValidation(value);
    }
    static number(value: number) {
        return new NumberValidation(value);
    }
    static file(value: File) {
        return new FileValidation(value);
    }
}

class FileValidation {
    errorMessage = '';
    value;
    constructor(value: File) {
        this.value = value;
    }
    private byteToMegaByte(byte: number) {
        return Math.floor(byte / (1024 * 1024));
    }
    private megaByteToByte(megaByte: number) {
        return megaByte * 1024 * 1024;
    }
    max(maxMegaByte: number, msg: string) {
        if (this.value.size > this.megaByteToByte(maxMegaByte)) this.errorMessage = msg;
        return this;
    }
    min(minMegaByte: number, msg: string) {
        if (this.value.size < this.megaByteToByte(minMegaByte)) this.errorMessage = msg;
        return this;
    }
    minMax(minMegaByte: number, maxMegaByte: number, msg: string) {
        if (
            this.value.size > this.megaByteToByte(maxMegaByte) ||
            this.value.size < this.megaByteToByte(minMegaByte)
        ) {
            this.errorMessage = msg;
        }
        return this;
    }
    type(type: string, msg: string) {
        if (!this.value.type.includes(type)) {
            this.errorMessage = msg;
        }
        return this;
    }
}

class NumberValidation {
    value;
    errorMessage = '';
    constructor(value: number) {
        this.value = value;
    }
    integer(msg: string) {
        if (isNaN(this.value)) this.errorMessage = msg;
        return this;
    }
    required(msg: string) {
        if (typeof this.value !== 'number')
            throw new Error(ValidationUtil.typeExceptionMsg('min', 'string'));
        if (!this.value) this.errorMessage = msg;
        return this;
    }
    max(maxSize: number, msg: string) {
        if (this.value > maxSize) {
            this.errorMessage = msg;
        }
        return this;
    }
    min(minSize: number, msg: string) {
        if (this.value < minSize) {
            this.errorMessage = msg;
        }
        return this;
    }
}

class StringValidation {
    value;
    errorMessage = '';
    constructor(value: string) {
        this.value = value;
    }

    min(length: number, msg: string) {
        if (typeof this.value !== 'string')
            throw new Error(ValidationUtil.typeExceptionMsg('min', 'string'));
        if (this.value.length < length) this.errorMessage = msg;
        return this;
    }
    max(length: number, msg: string) {
        if (typeof this.value !== 'string')
            throw new Error(ValidationUtil.typeExceptionMsg('min', 'string'));
        if (this.value.length > length) this.errorMessage = msg;
        return this;
    }
    required(msg: string) {
        if (typeof this.value !== 'string')
            throw new Error(ValidationUtil.typeExceptionMsg('min', 'string'));
        if (this.value === '') this.errorMessage = msg;
        return this;
    }
}
