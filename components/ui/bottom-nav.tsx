'use client';

import { bottomNavigation } from '@/data/navigation';
import { Tab, TabList, TabGroup } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';

const BottomNavigation = () => {
  return (
    <TabGroup>
      <TabList className="flex justify-around py-2 md:hidden">
        {bottomNavigation.map((item) => (
          <Tab
            key={item.title}
            as={Link}
            href={item.href}
            className="focus:outline-none"
          >
            {(props) => (
              <div
                className={clsx(
                  'flex flex-col items-center space-y-1 transition',
                  props.selected ? 'text-blue-500' : 'text-gray-500'
                )}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs">{item.title}</span>
              </div>
            )}
          </Tab>
        ))}
      </TabList>
    </TabGroup>
  );
};

export default BottomNavigation;
