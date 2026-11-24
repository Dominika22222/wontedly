    if (!response.ok) {
      let details = '';
      try {
        const errorData = await response.json();
        details = errorData.error || '';
      } catch {
        // The response may not contain JSON.
      }

      throw new Error(details
        ? `Request failed (${response.status}): ${details}`
        : `Request failed (${response.status})`);
    }
