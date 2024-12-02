export const REQUEST_URL = 'http://localhost:8081';
// export const REQUEST_URL = 'https://t4c2dqntee.execute-api.ap-northeast-2.amazonaws.com' // 배포서버
export const REACT_APP_KAKAOMAP_KEY="4b9524911f61c5907596a982a2b23e22";
// export const refreshAccessToken = async (reqeustUrl, option) => {
//     const token = sessionStorage.getItem("refreshToken");
//     const response = await fetch(`${REQUEST_URL + "/api/v1/auth/refresh"}`, {
//         method: "GET",
//         headers: { Authorization: `${token}` },
//     });
//     const newAccessToken = await response.text();
//     sessionStorage.setItem("token", newAccessToken);

//     option.headers.Authorization = newAccessToken;

//     return fetch(reqeustUrl, option);
// };

export const errorMessageHandler = async (response, reqeustUrl, option) => {
    const message = await response.text();
    switch (message) {
        case "ExpiredJwtToken":
            return refreshAccessToken(reqeustUrl, option);
    }

    return response;
};

export const customFetch = async ({ path, body, method, headers = {} }) => {
    // const token = sessionStorage.getItem("token");
    const reqeustUrl = REQUEST_URL + path;
    const option = {
        body,
        method,
        headers: {
            ...headers,
            "Content-Type": "application/json",
            // Authorization: `${token}`,
        },
    };

    const response = await fetch(reqeustUrl, option);

    if (response.status != 200) {
        return errorMessageHandler(response, reqeustUrl, option);
    }

    return response;
};

export const formDataFetch = async (path, method, body = {}, headers = {}) => {
    // const token = sessionStorage.getItem("token");
    const reqeustUrl = REQUEST_URL + path;
    const option = {
        body,
        method,
        headers: {
            ...headers,
            // Authorization: `${token}`,
        },
    };

    const response = await fetch(reqeustUrl, option);

    if (response.status != 200) {
        return errorMessageHandler(response, reqeustUrl, option);
    }

    return response;
};

export const API_GET = async (url) => {
    // const token = sessionStorage.getItem("token");
    const reqeustUrl = REQUEST_URL + url;
    const option = {
        method: "GET",
        // headers: { Authorization: `${token}` },
    };

    const response = await fetch(reqeustUrl, option);

    if (response.status != 200) {
        return errorMessageHandler(response, reqeustUrl, option);
    }

    return response;
};

export const API_POST = async (url, body, isCheck = false) => {
    // const token = sessionStorage.getItem("token");
    const reqeustUrl = REQUEST_URL + url;
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `${token}`,
        },
        body: JSON.stringify(body),
    };

    const response = await fetch(reqeustUrl, option);

    if (!isCheck && response.status != 200) {
        return errorMessageHandler(response, reqeustUrl, option);
    }

    return response;
};

export const API_POST_FORM_DATA = async (url, body) => {
    // const token = sessionStorage.getItem("token");
    const reqeustUrl = REQUEST_URL + url;
    const option = {
        method: "POST",
        // headers: {
        //     Authorization: `${token}`,
        // },
        body: body,
    };

    const response = await fetch(reqeustUrl, option);

    if (response.status != 200) {
        return errorMessageHandler(response, reqeustUrl, option);
    }

    return response;
};

export const API_PUT = async (url, body) => {
    // const token = sessionStorage.getItem("token");
    const reqeustUrl = REQUEST_URL + url;
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `${token}`,
        },
        body: JSON.stringify(body),
    };

    const response = await fetch(reqeustUrl, option);

    if (response.status != 200) {
        return errorMessageHandler(response, reqeustUrl, option);
    }

    return response;
};

export const API_DELETE = async (url, body) => {
    // const token = sessionStorage.getItem("token");
    const reqeustUrl = REQUEST_URL + url;
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `${token}`,
        },
        body: JSON.stringify(body),
    };

    const response = await fetch(reqeustUrl, option);

    if (response.status != 200) {
        return errorMessageHandler(response, reqeustUrl, option);
    }

    return response;
};
