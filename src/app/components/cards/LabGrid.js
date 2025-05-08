import LabCard from '@/components/cards/LabCard';

export default function LabGrid({ labSpaces }) {
  return (
    <section className="w-full py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {labSpaces.map((labSpace) => (
            <LabCard key={labSpace.id} lab={labSpace} />
          ))}
        </div>
      </div>
    </section>
  );
}