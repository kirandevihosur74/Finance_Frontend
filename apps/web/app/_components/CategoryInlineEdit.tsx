'use client'

export default function CategoryInlineEdit({ category }: { id: string; category?: string }) {
  async function updateCategory(next: string) {
    // no-op for now; wire to API later
    void next;
    await Promise.resolve();
  }
  return (
    <select defaultValue={category || ''} className="rounded border bg-transparent px-2 py-1"
      onChange={(e) => updateCategory(e.target.value)}>
      <option value="">Uncategorized</option>
      <option value="Groceries">Groceries</option>
      <option value="Dining">Dining</option>
      <option value="Transport">Transport</option>
      <option value="Bills">Bills</option>
      <option value="Shopping">Shopping</option>
    </select>
  );
}

