const queueMap = new Map();

const hash = (...args: any[]): string => {
    return args.reduce((a, b) => {
        if (typeof b === 'object' && b !== null) {
            //  is object or array
            b = JSON.stringify(b);
        } else {
            b = JSON.stringify(`${b}`);
        }

        return a + b;
    }, '');
};


export function rq(command: string, options: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
        const key = hash(command, options);
        queueMap.set(key, {
            command,
            options,
            resolve,
            reject
        });
    });
}
