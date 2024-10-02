import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Checkbox } from "antd";

type ChapterStatus = {
  chapter: string;
  theory: boolean;
  level1: boolean;
  level2: boolean;
  level3: boolean;
  level4: boolean;
  advanced: boolean;
  gbbEng: boolean;
  ves: boolean;
  med: boolean;
  eng8: boolean;
  pracB: boolean;
  mcqBoost: boolean;
};

type SubjectData = { paper: string; chapters: ChapterStatus[] };
type Subject = { subject: string; data: SubjectData[] };

export const Page: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();

  const initialSubjects: Subject[] = [
    {
      subject: "physics",
      data: [
        {
          paper: "1st Paper",
          chapters: [
            {
              chapter: "ভৌতজগত ও পরিমাপ",
              theory: false,
              level1: false,
              level2: false,
              level3: false,
              level4: false,
              advanced: false,
              gbbEng: false,
              ves: false,
              med: false,
              eng8: false,
              pracB: false,
              mcqBoost: false,
            },
            {
              chapter: "ভেক্টর",
              theory: false,
              level1: false,
              level2: false,
              level3: false,
              level4: false,
              advanced: false,
              gbbEng: false,
              ves: false,
              med: false,
              eng8: false,
              pracB: false,
              mcqBoost: false,
            },
          ],
        },
        {
          paper: "2nd Paper",
          chapters: [
            {
              chapter: "তড়িৎ",
              theory: false,
              level1: false,
              level2: false,
              level3: false,
              level4: false,
              advanced: false,
              gbbEng: false,
              ves: false,
              med: false,
              eng8: false,
              pracB: false,
              mcqBoost: false,
            },
          ],
        },
      ],
    },
  ];

  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);

  const toggleField = (paperIdx: number, chapterIdx: number, field: keyof ChapterStatus) => {
    setSubjects((prev) =>
      prev.map((sub) => ({
        ...sub,
        data: sub.data.map((data, pIdx) =>
          pIdx === paperIdx
            ? {
                ...data,
                chapters: data.chapters.map((chapter, cIdx) =>
                  cIdx === chapterIdx
                    ? { ...chapter, [field]: !chapter[field] }
                    : chapter
                ),
              }
            : data
        ),
      }))
    );
  };

  const columns = (paperIdx: number) => [
    { title: "Chapter", dataIndex: "chapter", key: "chapter" },
    ...(["theory", "level1", "level2", "level3", "level4", "advanced", "gbbEng", "ves", "med", "eng8", "pracB", "mcqBoost"] as (keyof ChapterStatus)[]).map((field) => ({
      title: field.charAt(0).toUpperCase() + field.slice(1),
      dataIndex: field,
      key: field,
      render: (_: unknown, __: unknown, chapterIdx: number) => (
        <Checkbox
          checked={subjects[0].data[paperIdx].chapters[chapterIdx][field] as boolean}
          onChange={() => toggleField(paperIdx, chapterIdx, field)}
        />
      ),
    })),
  ];

  return (
    <>
      <h1 className="text-center text-3xl font-bold">
        {subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : "No subject found"}
      </h1>
      {subjects
        .filter((sub) => sub.subject === subject)
        .map((sub) =>
          sub.data.map((data, paperIdx) => (
            <div key={paperIdx} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{data.paper}</h2>
              <Table
                dataSource={data.chapters.map((chapter, chapterIdx) => ({
                  key: chapterIdx,
                  ...chapter,
                }))}
                columns={columns(paperIdx)}
                pagination={{
                  pageSize: 10,
                  position: ["bottomCenter"],
                }}
                scroll={{ x: "100%" }}
              />
            </div>
          ))
        )}
    </>
  );
};
