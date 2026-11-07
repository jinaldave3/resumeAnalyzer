export const skills = {
  SQL:['sql','postgresql','mysql'], Python:['python'], Java:['java'], JavaScript:['javascript','js'], TypeScript:['typescript'], React:['react','react.js'], 'Next.js':['next.js','nextjs'], Excel:['excel'], Tableau:['tableau'], 'Power BI':['power bi'], MongoDB:['mongodb'], AWS:['aws','amazon web services'], Azure:['azure'], Docker:['docker'], Git:['git','github'], APIs:['api','apis','rest'], 'Data analysis':['data analysis','data analytics'], 'A/B testing':['a/b testing','a/b tests','experimentation'], 'Product metrics':['product metrics','kpis','conversion','retention'], 'User research':['user research','customer interviews'], Requirements:['requirements','business requirements'], 'Stakeholder management':['stakeholder','stakeholders'], 'User stories':['user stories','acceptance criteria'], Agile:['agile','scrum'], Testing:['software testing','functional testing','unit testing','quality assurance','qa','uat'], 'Machine learning':['machine learning'], 'System design':['system design','systems design'], Figma:['figma'], Leadership:['leadership','mentored','mentoring'], Communication:['communication','presentations'], Statistics:['statistics','statistical']
};
function has(text,term){return new RegExp('(^|[^a-z0-9])'+term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?=$|[^a-z0-9])','i').test(text);}
export function analyze(resume,job){
 const lines=t=>t.split(/\n|(?<=[.!?])\s+/).map(s=>s.trim()).filter(Boolean);
 const r=lines(resume),j=lines(job);
 return Object.entries(skills).flatMap(([skill,terms])=>{
   const requirement=j.find(s=>terms.some(t=>has(s,t))); if(!requirement)return [];
   const evidence=r.find(s=>terms.some(t=>has(s,t)))||'';
   const uncertain=evidence&&/\b(no|not|without|learning|beginner|familiar|exposure)\b/i.test(evidence);
   return [{skill,requirement,evidence,status:evidence?(uncertain?'review':'found'):'gap'}];
 });
}
export function validateInputs(body){
 if(typeof body.resume!=='string'||typeof body.job!=='string'||body.resume.trim().length<40||body.job.trim().length<40)throw new Error('Paste at least 40 characters of résumé text and job description.');
 if(body.resume.length>40000||body.job.length>30000)throw new Error('Use up to 40,000 résumé characters and 30,000 job-description characters.');
}
export const example={resume:'Example candidate — fictional\nBuilt a React registration application using JavaScript and MongoDB.\nGathered stakeholder requirements and defined user stories and acceptance criteria.\nConducted user research and functional testing.\nMentored students on Java and Python projects.',job:'Example Product Analyst position — fictional\nWe need SQL and Excel for data analysis.\nPartner with stakeholders to gather requirements and define product metrics.\nExperience with A/B testing, user research and communication.\nPython and React experience are useful.'};

export function matchScore(rows){return rows.length?Math.round(100*rows.filter(r=>r.status==='found').length/rows.length):null;}
