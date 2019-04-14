import { UploadedFile } from '../../uploads/uploaded-file';

export function makeUploadPayload(file: UploadedFile, params: {[key: string]: any}): FormData {
    const data = new FormData();

    if (params) {
        Object.keys(params).forEach(key => {
            let value = params[key];
            if (value === null) value = '';
            setData(data, key, value);
        });
    }

    setData(data, 'file', file.native);

    if (file.path) {
        setData(data, 'path', file.path);
    }

    return data;
}

function setData(formData: FormData, key: string, value: any) {
    if (formData.set) {
        formData.set(key, value);
    } else {
        formData.append(key, value);
    }
}
