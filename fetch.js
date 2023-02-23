let url = new URL('https://jsonplaceholder.typicode.com/photos');
url.searchParams.append('albumId', 1);

console.log("url1: ",url);
