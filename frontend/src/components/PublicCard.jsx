// src/components/PublicCard.jsx
export default function PublicCard({ title, subtitle, right, children }) {
  return (
    <div className="bg-base-100 rounded-2xl p-5 shadow border">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h4 className="text-lg font-semibold">{title}</h4>
          {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
        </div>
        {right}
      </div>
      {children && <div className="mt-3 text-sm">{children}</div>}
    </div>
  );
}
