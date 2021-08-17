/* Function to format currency */
export const formatCurrency = (num) => {
    return '$' + num;
}

/* Function to set page metas */
export const setMeta = (data = {}) => {
    data.title = data.title || 'Default title';
    data.description = data.description || 'Default description';

    document.title = data.title;
    document.querySelector('meta[name="description"]').setAttribute('content', data.description);
}