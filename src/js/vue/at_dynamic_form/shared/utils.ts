export interface GenericSection extends ValueWithId {
  sections?: any[];
  fields: any[];
}
export interface GenericSubSection extends ValueWithId {
  fields: any[];
}

export interface ValueWithId {
  id: string;
}

export const extractElementIdsFromSections = <
  Section extends GenericSection,
  SubSection extends GenericSubSection,
  Field extends ValueWithId
>(
  sections: Section[]
) => {
  const idsMap = new Map<string, SubSection | Field>();
  const subsections: SubSection[] = [];
  const fields: Field[] = [];

  sections.forEach((section) => {
    if (section.sections) subsections.push(...section.sections);
    if (section.fields) fields.push(...section.fields);
  });

  subsections.forEach((subsection) => {
    idsMap.set(subsection.id, subsection);
    if (subsection.fields) fields.push(...subsection.fields);
  });

  fields.forEach((field) => {
    // take the fields and save their ID with their element
    idsMap.set(field.id, field);
  });

  return {
    idsMap,
    flattenSubsections: subsections,
    flattenFields: fields,
  };
};
