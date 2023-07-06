let t;function e(){return Math.random().toString(36).slice(2)}!function(t){t.ANY="ANY",t.ALL="ALL",t.NONE="NONE"}(t||(t={}));class i{id="";field="";operator="";value="";fields=new Map;conditionsMap=new Map;children=[];context={};constructor(t,e,i={}){this.engine=t,this.rule=e,this.init(i)}init(t){this.id=e(),this.field=t.field||"",this.operator=t.operator||"",this.value=t.value||"",this.context=t.context||{}}addCondition(t={}){const e=new i(this.engine,this.rule,t);return this.conditionsMap.set(e.id,e),this.children.push(e),this.fields.set(e.field,(this.fields.get(e.field)||0)+1),e}removeCondition(t){this.conditionsMap.delete(t),this.children=this.children.filter((e=>e.id!==t)),this.fields.set(t,(this.fields.get(t)||0)-1),0===this.fields.get(t)&&this.fields.delete(t)}getConditions(){return this.children}getCondition(t){return this.conditionsMap.get(t)}getConditionsByField(t){return this.children.filter((e=>e.field===t))}getConditionsByOperator(t){return this.children.filter((e=>e.operator===t))}getMetaWithConditions(){return{...this.getMeta(),conditions:this.children.map((t=>t.getMeta()))}}fieldExists(t){return this.fields.has(t)}getFieldsObject(){return Object.fromEntries(this.fields)}getMeta(){return{id:this.id,field:this.field,operator:this.operator,value:this.value,context:this.context}}fromJSON(t={}){this.addCondition(t)}}class n{id="";field="";operator="";payload="";context={};dependencies=[];reverseDependencies=[];actionMaps=new Map;children=[];constructor(t,e,i={}){this.engine=t,this.rule=e,this.init(i)}init(t){this.id=e(),this.field=t.field||"",this.operator=t.operator||"",this.payload=t.payload||"",this.context=t.context||{},this.dependencies=t.dependencies||[],this.reverseDependencies=t.reverseDependencies||[]}addActions(t){return t.map((t=>this.addAction(t)))}addAction(t){const e=new n(this.engine,this.rule,t);return this.actionMaps.set(e.id,e),this.children.push(e),e}removeAction(t){this.actionMaps.delete(t),this.children=this.children.filter((e=>e.id!==t))}updateAction(t,e){const i=this.actionMaps.get(t);i&&Object.assign(i,e)}fromJSON(t){this.addActions(Array.isArray(t)?t:[t])}getMeta(){return{id:this.id,field:this.field,operator:this.operator,payload:this.payload,context:this.context,dependencies:this.dependencies,reverseDependencies:this.reverseDependencies}}getMetaWithActions(){return{action:this.getMeta(),actions:this.children.map((t=>t.getMeta()))}}}const s=new Map;class r{condition=null;action=null;id="";children=[];rulesMap=new Map;conditionOperator=t.NONE;constructor(t,e={}){this.engine=t,this.options=e,this.prepare(),this.init()}prepare(){this.condition=new i(this.engine,this),this.action=new n(this.engine,this)}init(){this.conditionOperator=this.options.operator||t.NONE,this.id=e()}addNewRule(e={operator:t.ANY}){const i=new r(this.engine,e);return this.children.push(i),this.rulesMap.set(i.id,i),s.set(i.id,i),i}removeRule(t){const e="string"==typeof t?t:t.id;this.children=this.children.filter((t=>t.id!==e)),this.rulesMap.delete(e),s.delete(e)}getRule(t){return s.get(t)}getAllRules(){return s}getAllRulesArray(){return Array.from(s.values())}getAllRulesWithMeta(){return this.getAllRulesArray().map((t=>({rule:t.getMeta(),rules:t.children.map((t=>t.getMeta()))})))}getRulesWithMeta(){return this.children.map((t=>t.getMeta()))}getMeta(){return{id:this.id,operator:this.conditionOperator,condition:this.condition?.getMetaWithConditions().conditions,conditionFields:this.condition?.getFieldsObject(),action:this.action?.getMetaWithActions().actions,children:Array.isArray(this.children)&&this.children.length>0?this.getRulesWithMeta.bind(this)():[]}}fromJSON(){this.addNewRule({operator:t.ANY}),this.condition?.fromJSON({})}}class o{rule=new r(this,{operator:t.NONE})}export{o as Engine,o as default};