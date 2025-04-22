import  { useState } from 'react';

class Node {
  value: string;
  next: Node | null;

  constructor(value: string) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  head: Node | null = null;
  length = 0;

  insertAtFirst(value: string) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.length++;
  }

  insertAtLast(value: string) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let temp = this.head;
      while (temp.next) temp = temp.next;
      temp.next = node;
    }
    this.length++;
  }

  insertAtIndex(index: number, value: string) {
    if (index <= 0) return this.insertAtFirst(value);
    if (index >= this.length) return this.insertAtLast(value);

    const node = new Node(value);
    let prev = this.head;

    for (let i = 0; i < index - 1; i++) {
      if (!prev || !prev.next) break;
      prev = prev.next;
    }

    node.next = prev!.next;
    prev!.next = node;
    this.length++;
  }

  toArray(): string[] {
    const result: string[] = [];
    let temp = this.head;
    while (temp) {
      result.push(temp.value);
      temp = temp.next;
    }
    return result;
  }
}

const linkedList = new SinglyLinkedList();

export default function LinkedListBuilder() {
    const [value, setValue] = useState('');
    const [insertType, setInsertType] = useState('first');
    const [customIndex, setCustomIndex] = useState<number>(0);
    const [list, setList] = useState<string[]>([]);
  
    const handleInsert = () => {
      if (!value) return;
  
      switch (insertType) {
        case 'first':
          linkedList.insertAtFirst(value);
          break;
        case 'last':
          linkedList.insertAtLast(value);
          break;
        case 'middle':
          // eslint-disable-next-line no-case-declarations
          const middle = Math.floor(linkedList.length / 2);
          linkedList.insertAtIndex(middle, value);
          break;
        case 'custom':
          linkedList.insertAtIndex(customIndex, value);
          break;
      }
  
      setList(linkedList.toArray());
      setValue('');
    };
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Linked List Builder </h2>
  
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2 mr-2"
        />
  
        <select
          value={insertType}
          onChange={(e) => setInsertType(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="first">Insert at Start</option>
          <option value="last">Insert at End</option>
          <option value="middle">Insert at Middle</option>
          <option value="custom">Insert at Custom Index</option>
        </select>
  
        {insertType === 'custom' && (
          <input
            type="number"
            value={customIndex}
            onChange={(e) => setCustomIndex(Number(e.target.value))}
            placeholder="Index"
            className="border p-2 mr-2 w-24"
          />
        )}
  
        <button onClick={handleInsert} className="bg-blue-500 text-white px-4 py-2 rounded">
          Insert
        </button>
  
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Current Linked List:</h3>
          <div className="flex flex-wrap items-center">
            {list.map((val, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-blue-600 text-white px-4 py-2 rounded mr-2">{val}</div>
                {index < list.length - 1 && <span className="mx-1">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  