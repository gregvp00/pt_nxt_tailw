"use server";

export async function getCombinedData() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const [usersRes, postsRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
        cache: "no-store",
      }),
      fetch("https://jsonplaceholder.typicode.com/posts", {
        signal: controller.signal,
        cache: "no-store",
      }),
    ]);

    clearTimeout(timeoutId);

    if (!usersRes.ok || !postsRes.ok) throw new Error("API_ERROR");

    const rawUsers = await usersRes.json();
    let rawPosts = await postsRes.json();

    rawPosts.sort((a: any, b: any) => b.id - a.id);

    const postsMap = rawPosts.reduce((acc: any, post: any) => {
      if (!acc[post.userId]) acc[post.userId] = [];
      acc[post.userId].push({
        id: post.id,
        title: post.title || "Sin título",
        body: post.body || "",
      });
      return acc;
    }, {});

    return {
      success: true,
      data: rawUsers.map((user: any) => {
        const [basePhone, ext] = (user.phone || "").split(" x");

        return {
          id: user.id,
          name: user.name || "N/A",
          email: user.email || "N/A",
          phone: basePhone ? basePhone.trim() : "N/A",
          extension: ext ? ext.trim() : "",
          username: user.username || "N/A",
          website: user.website || "N/A",
          city: user.address?.city || "N/A",
          companyName: user.company?.name || "N/A",
          userPosts: postsMap[user.id] || [],
          street: user.address?.street || [],
          suite: user.address?.suite || [],
          zip: user.address?.zipcode || [],
          geo: {
            lat: user.address?.geo?.lat || [],
            lng: user.address?.geo?.lng || [],
          },
        };
      }),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.name === "AbortError" ? "TIMEOUT" : "FETCH_ERROR",
    };
  }
}
