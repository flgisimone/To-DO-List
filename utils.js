//METODO GET
const GET = async (urlAdd) => {
    const res = await fetch(urlAdd);
    return await res.json();
};

//METODO POST
const POST = async (urlAdd, body) => {
    return await fetch(urlAdd, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
};

//METODO DELETE
const DELETE = async (urlAdd, id) => {
    return await fetch(`${urlAdd}/${id}`, {
        method: "DELETE"
    })
}
//METODO PATCH
const PATCH = async (urlAdd, id, body) => {
    return await fetch(`${urlAdd}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

export { PATCH, GET, DELETE, POST };