import React from 'react';
import { Card } from '@/components/ui/card';
import type { InsightShort } from '@/types/insight';

interface InsightShortProps {
    insight: InsightShort;
}

const InsightShortCard : React.FC<InsightShortProps> = ({ insight }) => {
    return (
        <Card key={insight.id} className="p-4">
        <h4 className="font-bold">{insight.title}</h4>
        <p className="text-sm">{insight.description}</p>
        <p className="mt-1 text-xs text-gray-500">
          {insight.createdAt.toLocaleString()}
        </p>
      </Card>
    )

}

export default InsightShortCard;