---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCOXNTWW%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzLPSBUGdkGTKtJrQRA9p5aMFKEly%2Fi3sU5AQYGo83fgIgYPzbaTtdPjTA8oaT3xLZuPiDTKJ2th8Zc%2BUWmWHsFcgqiAQIi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBzx3bx9jXrSbW3QEyrcAz2CSz2q%2BmTcHbyb7B7k650H6AomsuxNjMvTsiyr2%2BnUDzacdrS5K8BClks7XmQIDPxAdqTfQvapnyDA6cOjSilnsZw5wr3IZa00tBUe3%2FSPdhG%2FVTiPPzsoiBbFqcLodO4o%2FTF1Kmkgg22ik7L0GhaJ2KA2Pk0afFuyOD%2Bur4jp3sn0nBVa9Cr61AYeEP3lO9bm0qFt1vahkiDJEn3JwIUL22gic64wpn%2BHLDyMnSjVIx1Hqz6yzQ3oeAge0spQkzH38ofBLOvDzyjeaaQEbdtQcmD4TSF%2FgVnkofJzM%2FGpxR3grY%2Bv7KvpoXHh68nQANkvDcRZFeiWgF41ni%2FLOEV%2BKKdtFqdyLP5TAAOUL6iOqff%2BwW%2Fwyv7PNTFm2dn1T5mX0s3JwONW7Jbiu3E0WZqV7oX6fqLunwE57T8AVAFdH2IuZRiw8ejG927FU%2FUm5pSWJdbFu2urV7cgXy2Ys2YvqRaasZmJ8pSwZT9W2np0W2Clpq%2FgHCkE3Y98nTqQgxwaFjt22%2BRiZGKJTDY81q40rglQVwaQv8W%2BIJAlu538wydecYVdtCU%2FCuQmQ5s8jsPsaSNBz8rSuYpVj3BYmra9TAbVIxs84SynCL54CGz%2BvNUUVFdypH8nLoswMI77%2FcoGOqUBjnBMgrvCgnylbLk2i%2Fg9OCgx6bYq9qpgAglV5bYSY5vI4pxtWnK7I8pKzzitprKfl5yixJsXEgvB3LHgG3iDoS%2FdM27La7TRoEYH6iXLorT%2B2uDttrsiCvmqpcZJaUejyyR0HGoqtZffc%2F7koQW%2Btih0CrDw0MzssH8PIgajfU%2BKNCSDXa7SYqiqwH%2BE%2BJZWeAthKqad7gd%2BSRBLXt0xBBUrYEq1&X-Amz-Signature=2fc6b93890ad524d9369475f1b2a4d8ec34a0ca6848a559ba9dc7cf153a14674&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCOXNTWW%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzLPSBUGdkGTKtJrQRA9p5aMFKEly%2Fi3sU5AQYGo83fgIgYPzbaTtdPjTA8oaT3xLZuPiDTKJ2th8Zc%2BUWmWHsFcgqiAQIi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBzx3bx9jXrSbW3QEyrcAz2CSz2q%2BmTcHbyb7B7k650H6AomsuxNjMvTsiyr2%2BnUDzacdrS5K8BClks7XmQIDPxAdqTfQvapnyDA6cOjSilnsZw5wr3IZa00tBUe3%2FSPdhG%2FVTiPPzsoiBbFqcLodO4o%2FTF1Kmkgg22ik7L0GhaJ2KA2Pk0afFuyOD%2Bur4jp3sn0nBVa9Cr61AYeEP3lO9bm0qFt1vahkiDJEn3JwIUL22gic64wpn%2BHLDyMnSjVIx1Hqz6yzQ3oeAge0spQkzH38ofBLOvDzyjeaaQEbdtQcmD4TSF%2FgVnkofJzM%2FGpxR3grY%2Bv7KvpoXHh68nQANkvDcRZFeiWgF41ni%2FLOEV%2BKKdtFqdyLP5TAAOUL6iOqff%2BwW%2Fwyv7PNTFm2dn1T5mX0s3JwONW7Jbiu3E0WZqV7oX6fqLunwE57T8AVAFdH2IuZRiw8ejG927FU%2FUm5pSWJdbFu2urV7cgXy2Ys2YvqRaasZmJ8pSwZT9W2np0W2Clpq%2FgHCkE3Y98nTqQgxwaFjt22%2BRiZGKJTDY81q40rglQVwaQv8W%2BIJAlu538wydecYVdtCU%2FCuQmQ5s8jsPsaSNBz8rSuYpVj3BYmra9TAbVIxs84SynCL54CGz%2BvNUUVFdypH8nLoswMI77%2FcoGOqUBjnBMgrvCgnylbLk2i%2Fg9OCgx6bYq9qpgAglV5bYSY5vI4pxtWnK7I8pKzzitprKfl5yixJsXEgvB3LHgG3iDoS%2FdM27La7TRoEYH6iXLorT%2B2uDttrsiCvmqpcZJaUejyyR0HGoqtZffc%2F7koQW%2Btih0CrDw0MzssH8PIgajfU%2BKNCSDXa7SYqiqwH%2BE%2BJZWeAthKqad7gd%2BSRBLXt0xBBUrYEq1&X-Amz-Signature=2fc6b93890ad524d9369475f1b2a4d8ec34a0ca6848a559ba9dc7cf153a14674&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YFM4FTC%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDMt4DZRV0zRu8QmYCWao7nI%2BzO2pNFkJFp4umIzHpYtwIgIjd0EeUa%2Fiq1SPNR1mC2wKfPHA4jRjZVDJTRQ7o%2Bm4UqiAQIi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC2L5geShyLyMIREcSrcAwuWi%2B6UWM2NcXTXcVKoS05jz3UwvvrGU2cBhJanE1OjwAWurtIRpzhuPJXYerrwcGkpiATWtp3jOMzCExXC7veYLOqMBa3KGxnMereXsn9Whh%2BCMAJ46%2B8I6YEhtK9%2FhMEvIFY9hzW9v5DYGoCEAg90H47aX7lcsCuKUOXqqlE89cQHeGzqoY8b8p4sZyiVoZfWy8cgQc0WsIR3OXQUaqA9CpVmnBdCFo5ucEUNFPXvRiMSWV1FBeQmAj5HrBZzNmvjwGprhUQqTpEjfkU6Dd7JFGDV%2BmJq7aogbtNlfW3LkWgAgALRrm4KyJaVrl3RtmbsxcUiExI%2FaOY3MbhsauZFEtTp0JLsnOnypmsvZsP0w1%2BcliNPAN%2B09wNFMt1Jb7mYprDLyFlSj9vTHk1b%2FYEyPME2dRPztK5%2FrJpD2oll7PGnjrPtvTLsBduVMXIAuhzu0wKsIaGUloc91zYRv4N1YKHnQ05eswLf%2FYDztZJ4OXBez2D4U8yh4HZwQiTFeJsI4zVAdyOlfIP11mhCSiwcJMjLbLLgverpI5WUhu1PAcR5x02cIYu%2F%2Bgr4XkLeSi3%2FvV8V5D8z0x9zaocGqwAjFJzMtfwbhurKKEYtCNzwSQwZMdsDUUztlFVcMNn8%2FcoGOqUBG3%2BlfmhyFXGG7AtbvK%2FSgdTrntbqsxS0tTBALCBiAZYZtz1CvOvnnYMLn1XslDTFa%2FAMxsH6mAgCLoDgqSVNfJ2eSqvU4Vb%2Bv5qpHHQv9fW%2Foik7fFZdz0dN4EAW%2B5znGPlpnuV3k81oL4p41Hv7brL12lKqpQmrvb6oDeV8KlugDfV7eKUeTsj6GFmsKQoBO84UkhKrzYT7ExEmmpb3OSoAPTat&X-Amz-Signature=7b91b697c6de942fe611051b967508d2b6edb7626aa72f401fe1213a542204e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664B7YD4OC%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHMcnfDcMZZFc%2BISHhjkkHHVt7%2FzIid%2F%2B4g1WwMrmpAoAiEA2MFztohsD1G46q4pFHEVHiaTgJ8pexmT%2BCzoD8VBqLwqiAQIi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAxNsDKy4UzHEInZtCrcAyZk1SMN1XBswil1cKbo9ogQf2YyvcDxuxP%2Bh69I525zXiZOpkA0U3KJC%2FPmslGhEXA3hV56205tPcb%2FEPTmnooy41nXEYEcSvFDTror8ylWhwmL2fvKyNBqN0gwXb%2BUuOGZGwk7ncTt8i54w%2BiC3OftD6TbuAT%2BcMNjXB9NmK4jcxMr6tiUed6ZP%2Bf%2Bt73R0daA5UogqAzuClr2iLq52Pfppd0HSn%2B2UhQZMDTO1NtagnHhz6tlyXSCRq%2Bd%2BwAKhxQHabk4bgV4EmSHfr%2FxHsilpRKZK9PYi24VGIlKlDBBRTWG0JScpjVTGAvJX2yGHMXE5mWR5B7m%2BvpBHBmBl%2FieyinRtUTpqVO2WZKnLTBpgzq8jE%2BxWR5R0VusacftKwGO%2BNJFvUpEZhyc7tJ4nsC6rpJGO%2Bssd3SHvitsDXcEbjJJItds%2FDnVPs3GQHZ4LofM6g0mMBzGQCJ7lXNu4eItnoOYpuVSGOdqQXujGbRNgVja95fzuQy82DNqzhzk8W8mMtKj6mENSEWvZw1RhmZ10Na2DFt4M7gA9UWUbQRfWrjF3SzO1aV6N%2FMxUGOb8XlPdAJbXBhmNLkKmcJFF%2FozYcxzuwcIYqO6hRseObS1FNcEwBY6owXLa%2F50MJj7%2FcoGOqUBY92YopdZ4ozAVW6Lbv0AuZR86ydFyRFXGmtYRJOSFoQwzbkZ%2FR%2Fzm6fjEVaTO1Hex2jrJMn7rfvABh0kDaH%2B11I7QbaTQTlm8%2Blz4N%2FYsyTzOcXLXIMuwxZKlD9WMtVFMk%2BvtetSc%2FGLWCbN4AI5X8biAJoea7B7jOuAsUvpwtzw5m9D8LT1ot0ErT7%2FnwntF1FsOkibPVlUonGMPYZ2VXvP6r9X&X-Amz-Signature=c60c83fff69541f46691d92751b0c9ae966da5ef94b58b8eb1314d48ba3a3fc2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664B7YD4OC%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHMcnfDcMZZFc%2BISHhjkkHHVt7%2FzIid%2F%2B4g1WwMrmpAoAiEA2MFztohsD1G46q4pFHEVHiaTgJ8pexmT%2BCzoD8VBqLwqiAQIi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAxNsDKy4UzHEInZtCrcAyZk1SMN1XBswil1cKbo9ogQf2YyvcDxuxP%2Bh69I525zXiZOpkA0U3KJC%2FPmslGhEXA3hV56205tPcb%2FEPTmnooy41nXEYEcSvFDTror8ylWhwmL2fvKyNBqN0gwXb%2BUuOGZGwk7ncTt8i54w%2BiC3OftD6TbuAT%2BcMNjXB9NmK4jcxMr6tiUed6ZP%2Bf%2Bt73R0daA5UogqAzuClr2iLq52Pfppd0HSn%2B2UhQZMDTO1NtagnHhz6tlyXSCRq%2Bd%2BwAKhxQHabk4bgV4EmSHfr%2FxHsilpRKZK9PYi24VGIlKlDBBRTWG0JScpjVTGAvJX2yGHMXE5mWR5B7m%2BvpBHBmBl%2FieyinRtUTpqVO2WZKnLTBpgzq8jE%2BxWR5R0VusacftKwGO%2BNJFvUpEZhyc7tJ4nsC6rpJGO%2Bssd3SHvitsDXcEbjJJItds%2FDnVPs3GQHZ4LofM6g0mMBzGQCJ7lXNu4eItnoOYpuVSGOdqQXujGbRNgVja95fzuQy82DNqzhzk8W8mMtKj6mENSEWvZw1RhmZ10Na2DFt4M7gA9UWUbQRfWrjF3SzO1aV6N%2FMxUGOb8XlPdAJbXBhmNLkKmcJFF%2FozYcxzuwcIYqO6hRseObS1FNcEwBY6owXLa%2F50MJj7%2FcoGOqUBY92YopdZ4ozAVW6Lbv0AuZR86ydFyRFXGmtYRJOSFoQwzbkZ%2FR%2Fzm6fjEVaTO1Hex2jrJMn7rfvABh0kDaH%2B11I7QbaTQTlm8%2Blz4N%2FYsyTzOcXLXIMuwxZKlD9WMtVFMk%2BvtetSc%2FGLWCbN4AI5X8biAJoea7B7jOuAsUvpwtzw5m9D8LT1ot0ErT7%2FnwntF1FsOkibPVlUonGMPYZ2VXvP6r9X&X-Amz-Signature=57cd66da850721c662128c1766e8d99395b3abd520052244ecd869fedc1779a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMIDWUWZ%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCk21EVbQOSC4Vp0CWa8gOu9B19Z4O%2Bu4%2BQEtt%2BEP7jZgIgFh%2FZZDFerW7Ed4kskSnEftVnCVLmvixo8EVEASBnKu8qiAQIi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBGOxGkEzMRTCFw00ircA3wvC9mWuhY5ENXLV6glG%2FFFyVJGOgMo%2FzdN4ox4RgqDzOq4eTCczyaqJDWjBqqKMCS69CUelKPk%2FlEOdROmsaZXJmklJKm4nkmeCzD1tXUV8Y4TqhFli9PgaWqKFQPqivVkOgDuf%2B10qLy4rch1Evq2%2FBHlrgIRSPZhq0SZx1lRb%2FOJHhq4Pb1vHnON3eesDAtI0e5G7%2FidyMH1kNZAtZlxCzReCV66VBlIVrVP6seEw8oza5T6TbY4%2FvyqAbO4iObi0Kgx%2BJ%2FDsu1GJ3fRnXBSXjFKbAQynn99OyK7drfy%2B%2FcX1NZP3GhHXwa2QcBeF8PGH4rxgqn1tzkOmQyDDbuvw7x59ztcbF64ChMrmQbLq19rrRMaLSUqtjk3iiKLftux3tKJ%2FMNM8PikJuKEeibUNZxyo4SwuPp18YcsPcTVHmiPPe1LIJ4XHuMPtvNxVIKJ10gi7CJV%2FNjYm5HZaydNNFRiI5qalZzzG6Z3WEqFVUTGiwFy2r5%2FasG3NBj9eoMQNGSaPVjClAYe8UGW9lUAinvBaRjSpnZC9Hjn24o6nW1aGji8jB6ehhLZcR2Oz4psD59GAES2GeI4HcMT1vQo79hae4TgE%2F4TOmKr%2F4RYXRmTVgmNACVhC3QmMPP7%2FcoGOqUBjvWycpy4q8eKJNHWqXAOT8zRu8vKZtkso5hmaWmusspO4ZEKbznqpcUR1qZK9GlptO65UqTEZk1Ll6b9T1rqpcprVZJiumI0xn6OH1K5XmsgYMq10Co6Z8mPlvHppT6IdsG1MFSBoU7O%2FrDK0LnrO8aT%2BoU4e2JbxSwKrSBmA6CCPqwraQDzwt0CKmHNuGhzZOnkc3%2B8%2F%2FpJC3DuN2nsyQdp3QQB&X-Amz-Signature=a2ac6c651f8003ebf1f5803106b289df266db5da1b5c15d37d23da5cdeb832d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2IHSHQC%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDT5sNZldWLsQyHVYVzeDzeFmw8YWmpUYldlovVevJ7ggIgeuvXuyIODa9Hwte3exqWtxEFiFNM06CHaUormkM8mu8qiAQIi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL14e1t9hwuX4Rz%2BKyrcA6HINEDzdbGXlaqQDa8RVc4HKIbebYrvUXwBQXFycBjNlHEZznOLnzBSBjJHBDgzzwDhR4Bg53UX3COv8m5K8mmjOK3ZBjPxv9coBKak8pYPYyDBL3JRcKQBZ%2BwqSNjmPmNmcPf7xDoMzEl%2Bz1T6f6np6IsoHJ6pl%2Bw4Iiz8TdQeXWxBhtLJ0f59VxbmemYOWR2HPKH2C94aJ%2FC0cth4ns1fNvtTOYaSStE5%2FpdqBTu8wnZAqHMuB956OJrb6gbjaSO%2FGvcDs8buSo5jFq4Lzv8iEsIZ9PPzf%2FEn7VLPVAWLy4YmVbtgl3MJRO3ws67LnnGSg4Brd3rIqwV7Ex%2FX2fHagcWmMZlhwnvI5nJyQejwxi9gK%2B9ujMLYTptxZN6lQ9whV4kf8fEqo5jrbvF5wzt5KZoqs8kBvlZHjvieVZYQBPP07ZNF5EUawfOhEvJAoqoGGP5f1wFktcND8ZOGOrJ4uCWAvJznR9Lv07yaRhdpNtPJILGcT0NZFx2t4U0I%2BaBJ%2F%2B%2FPnG4efXO84lkiRIS2fYUI8jddqxdFnzFOkZW6t%2BIdsZzh78MmOPsNfGNVh%2F1NjiFR2u8ZJqzw6Q3cf8LPITjUXkXb45kpOaeTzJU6phFr0AuImxcdVIJmMIP8%2FcoGOqUBik%2FkaIdYc5vg6gokftr89xkfQTfJ8%2FRxRUF5tZzxn%2BP6r2HMsN8NL%2BsLExyAItFE%2BzmpxzCZoCPrfqHebSeWog0yYIg8lbESr584cPOLJMDLU26fM%2B7zBPCDXgLnuuOxg2%2FSfpiUT5gTDTb1qLYdVx%2FF5%2B%2FTr0NAc4FBx%2BmmiUBwF%2F4oOXkCIqHoGr1SxN07OqOA4JSXfdTQ1HZi1eJs0ULDmO3f&X-Amz-Signature=5e675e9b1fc0928d87d1c81ae6265031f4ecc04e4f6e6807a7b722346f7aad10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQH6MH6W%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC8E5kTIlzJCmluKAy83lH8Dylp0tb3n2XDRcEzqOPDGwIgB7ucqBVUfEbRRHnlq%2FOoODhpitjXvS4WUbGg%2BxtCHNAqiAQIi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEJ9r39Txw8se3ec1yrcAylnkShyPHOYICt621Uqo1zMRLHfgy8%2FHBHXGpQWm9ME1W32zPOWRXV6wcNp1tB41PL0w%2FMHoWMIaMLypHjuTXat8uR%2FYx731rfC%2BSjNcQyiATLDCPD20%2FEFVZSnPgqkyJKI4y%2FG5RUPl%2BiK7dIYuu8xa%2Bdf72NbvYrV8Sxs4moh6Qnv4xwTsdtmJp1wWqyHbi9%2BVVfda3xMNjBrxZV8th2%2BcStsXjv86UkDxh7ZCqSWVojSOwGKvEFN22uhoQ%2BRNWsFlld9329v785qTAvJJ3pjkQftFEyTyN%2FFxNsZcAK%2Fd5CC%2FM99gOicLg60t8RUH3yTDfTstDP6F9bJEI37p7txJh5ufbOet7ByOp%2FeMAPkYV%2BJoq99n3WNZ4lP84NA3JEohoJ%2FslcPub9bFyoxaUbIMLFPhYXM%2FJozrdicE5I9dAcWJBCBGOCwlH3Sov4H35PPJXec%2FyC0Yk2Vp8Y1eDEKF7QZ2vfx7XNIHX8laLvzORFnTc93Wah71K9WJR%2B0nUuyzrbEflkoAOhZymwxu2qFRN7bgZSx9oIlzBXez4254kpgDkw2g0jdFGEPaEWlQ%2FBEweRaV8GJT43Cr47X8BnABDfvP8dZUmja1SGb%2BPhJJ5CXmwX8fHiV0D4fMO77%2FcoGOqUBu4FHcQHb2qQsZOy5xEnDXoEJZmqQeuUKFMWnkDxUzO1tDjfjdcOR9A9Ki6UI6pFYKY25fSZxRKgB3CoZMTb%2B8AX2c04QQPuUC780MLhLN5l7qaM2d2jCs3v9HrR%2BdHzWNhrBVST3iW7XHmscRZ2GN6tVLbGEKZVCDoJRJb14Y%2FJl9WG5E8QANuD9WHIBs2g3QhgTDNoCkBL4TRammvD8ZNiUUINX&X-Amz-Signature=4c466e1294d44937432b8219eff3c7786a586d129a6d448fd4b7df7433e46b80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKEDKN5Q%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBL6ExHfL2QrkMRXyIuy21kNnq5WzFb85rcwwCL0TPSvAiBri%2B8qTSTklFEFSezufBPkcSwmgUyF8WNAWL%2FPVdNj%2FSqIBAiL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIrzioc36afh%2F3KWvKtwDuRvo%2Bm2mL1gJDh%2B94G0%2F8nkcViEAbljNtnkUvS6wUT9qL6aNjvnmdqIH5kVm5Sak%2B6EMGBDRqOVzyYFhv0f62UNy5563JGUQN603s6Drja5Qc9Gd6m4b4SrVxNhQ1Qlw9b3rb3o1cs7FmPS9M3PnUtT4FjxlXKXdj5zusIWeouhPof0sgVbXg8%2FAxHF2tBvXT%2B5CKcig2G7ysP99OY%2BZ%2B0HymdfUMFhoJm4nISHnD9XJQbvm%2FAyrDU9oP4HIKFDu7W7io7k%2BOCYrONltw2ALXd141llnXlZ7A74geKC0yvfkzDi2eNgO7kn3xlztSkJ7wtwvaZGHyi2GAo4ipkl37wIF%2BX01ZGRIBlDTJRjVfc1IRxFTqBV9dHlhRXonuHA8EOsp0cSdiQN3ekDmkQb4%2B3u%2FG6qGadgTqPN7bRE%2BdUe80osoZChprzbx3NtCxhPYuV7%2FzIogPNJVlULs4QzjXQWsb3QPT3RMwUDVe5enXAG6biFhaImjofoD6Szx2y5KasDDr1WAPRfcnXOuo9J5pnH0EqnuuJopPcMkuravHBwV%2B%2Fs%2B6D9TNOqhVc1E0%2B9gYXLoPPs3E%2BxPqU5xUltvDVbaExOs4kBRmNe2jRgTbr%2FWdWU6N9%2FGZxpbTQQwlvv9ygY6pgFdLTMR%2B9%2FzT4yRXoJim0aRG69X75zg8ubVA59Tpm58X6NU44cgJPqPkRL8%2FfONq%2BaYbcPCnMm%2B7e8ArZVblMPPHj2SB1XFUcoZP60Eep3KmPri0VJv5vzes12qgwv1v%2BHwp1tqPRsLp7LSznMXOsUhZtbg%2By3pT6qzRh1dELgGyOwfrRdf87Fa9mNpGlKpxPX%2BBzFrTWFeKELD43BhKPbItTRzBnwv&X-Amz-Signature=f664caadd590c2ec21b13fee3d061aca720c99d285d344273aa6f68ae43dc29f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKEDKN5Q%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBL6ExHfL2QrkMRXyIuy21kNnq5WzFb85rcwwCL0TPSvAiBri%2B8qTSTklFEFSezufBPkcSwmgUyF8WNAWL%2FPVdNj%2FSqIBAiL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIrzioc36afh%2F3KWvKtwDuRvo%2Bm2mL1gJDh%2B94G0%2F8nkcViEAbljNtnkUvS6wUT9qL6aNjvnmdqIH5kVm5Sak%2B6EMGBDRqOVzyYFhv0f62UNy5563JGUQN603s6Drja5Qc9Gd6m4b4SrVxNhQ1Qlw9b3rb3o1cs7FmPS9M3PnUtT4FjxlXKXdj5zusIWeouhPof0sgVbXg8%2FAxHF2tBvXT%2B5CKcig2G7ysP99OY%2BZ%2B0HymdfUMFhoJm4nISHnD9XJQbvm%2FAyrDU9oP4HIKFDu7W7io7k%2BOCYrONltw2ALXd141llnXlZ7A74geKC0yvfkzDi2eNgO7kn3xlztSkJ7wtwvaZGHyi2GAo4ipkl37wIF%2BX01ZGRIBlDTJRjVfc1IRxFTqBV9dHlhRXonuHA8EOsp0cSdiQN3ekDmkQb4%2B3u%2FG6qGadgTqPN7bRE%2BdUe80osoZChprzbx3NtCxhPYuV7%2FzIogPNJVlULs4QzjXQWsb3QPT3RMwUDVe5enXAG6biFhaImjofoD6Szx2y5KasDDr1WAPRfcnXOuo9J5pnH0EqnuuJopPcMkuravHBwV%2B%2Fs%2B6D9TNOqhVc1E0%2B9gYXLoPPs3E%2BxPqU5xUltvDVbaExOs4kBRmNe2jRgTbr%2FWdWU6N9%2FGZxpbTQQwlvv9ygY6pgFdLTMR%2B9%2FzT4yRXoJim0aRG69X75zg8ubVA59Tpm58X6NU44cgJPqPkRL8%2FfONq%2BaYbcPCnMm%2B7e8ArZVblMPPHj2SB1XFUcoZP60Eep3KmPri0VJv5vzes12qgwv1v%2BHwp1tqPRsLp7LSznMXOsUhZtbg%2By3pT6qzRh1dELgGyOwfrRdf87Fa9mNpGlKpxPX%2BBzFrTWFeKELD43BhKPbItTRzBnwv&X-Amz-Signature=e8ec1af67e3715c1215c553c0887816dd1e2a40ca386c43037682a5b06929d6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZIAD26B%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG%2FSr6lq9r2ZAuSRbKIe3QHYrkKjHsTuNho5w8kPs5RAAiBtqipuYcfUy0qAg1iVEDJKawdr3I%2Bt%2FsNN7oSNEcydiiqIBAiL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMoKJsoJCXNH4FWAXEKtwD8Oo7odKaFm9aLk4G1gkW1gi5AMXH8TxheHTtb2%2BA%2FGUozUaU9pUH%2Bo4t1mjN0zfdukvPeh%2FRAq64PW%2FeHMg5b2SDYkuAjDinnhEM3UeVQ%2FcT2k26dOEO8P%2FhtzrOcZk0CgMPhcVwIltdxZQOIR6pBJZJNES8QWrBDJQULXFKVbGLnat1WDopCpOdkeDyspADNyx3ma9OkR1S3cQAJv3HwIgpOvRe26EH8nCcWWjFf5kcrsybGgE9nGbfavER3meZw69ExkUdbkCkPlLvIIAAQuGWhLpuny08J0wCGolMcrnCdxAV4dTz7UNa2bAmD%2BG%2BzZHZ%2BeMkGk5H1NRkoq4PpUQggrybuqGeGoL2eg80cpwisInHf2KOWBYke2sHilsISWFwNtRsFivjw9LSkjDIgKYgfmivtWrahRPznUv6sIiHTfwp8ch1K82eitSh23sxbn%2FWodhe0Zdcp770ITamb%2B8dsjSbN1E9hojv9SvKOb%2BWf60bKSPIIk8zeUeZrwORrGqGsS8qt1MkoiKIkPPVQITyQXZwQe67SI8iIoyKk3U%2BHDryacsvIzucCXA6VkhCp1mh8m9Y3kTWTqcZzGVggOhjfVmWrMJOS1TE%2B9cs04zHD62MvZVIxjVlQtswv%2Fz9ygY6pgG7%2Ftxu%2B4ySMlXB0LqzYTlvKi63naLwKg9T59aEy3aLKMPsEDjfX6T9r3GLvHU5yffrvZc602r%2FtRGIOA80vZUH1Byx3GpcHR%2F1PF8FWlsTi2GeoLPMuNBw1JP6myJndamIHFEHrKd2BafykwoBLZpRtfXmT9ykgDQW10UIIliu0jdWzYYSLl6xxS0rCW2YOfkDaq5IAW5GgcORUFtqZZwdNzhMTOLL&X-Amz-Signature=1961c6548c2772860586c23a147ca0ad1fd4c25519059927e5bf3514e375659e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NQVDI4H%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE9ZgcPbVPpIUHOpR%2BkxMzbe0jqWpnvgMuqhhTJq6rfBAiBSnkYUJNheCgJOJQM9TL4UunebNf1SDJdqFD1KX2%2BYLyqIBAiL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMg3z9LO%2FG6UC%2FplvjKtwDeLyfrTRY%2Fsb6%2FBuu%2F2zgEAOb%2Fo5QQqP%2FYXcnwksM5Uo5Z04icZEPhoePb9jRKhF6U4U4sfc%2Bk1dJ8PIc7bUKm5K%2B%2Bx2lu0XGxQ2OAbBecQ1hkcvGO9S9u5RWcIydWXKl5ZXPuwZ3vQ5B%2BlVwDwBZFFiYHAgVHxKv6km0euxPUj5OGlgMFgZwFewKIu4L7ebQFy5SWZZZIxx6Lpe%2FlcRF7RzFbxgjTjlttiiWuE1X5pxr9b25O6K%2FrSWXrnkTrPPtQYOEalZFOqaqzEyXl9lKER0Rwzhp71fIyYpxz9unNj%2BWDkQ8TxK32LRwq68jv08NNcNswiVrqw2XtoaLXPvMIbG6%2B8neD%2BIYTho8VpzA%2FBMJy5bVeeCPi8CWcaYiaYuDwShdiLwvS7QRgqcHqIlAQFj1Y4LIHp%2FFxkXwfUXi9fzAD1%2FmdGCKc1huZ%2BTGgQX92jK%2Fh0WRaz7h4KApwv3HmqCRWYd%2B0sJ2ZrwCdT7by7lJAjScW%2Fmn3vpExyM%2F5SEymtyoQfbZdCiSu3UlAdycKhfK8HjMltkGJrDNVxebt5zaA4FbzHCYE%2B%2F7TMs5YiOpP0gb1sLG1jyEIXG2oZMUDx7MtAqAWtPiLwApE64TMIfCt4v5y13r2TyKo5wwoPz9ygY6pgEbv9G%2BfKtp91uIyj7sSNCm3qwMOJpjnQG%2BeJVEheZYy5U7%2BbQc7FrMDfKfOFIwfw6inYTcRv%2FVUbjf%2FHfwQA3beJtKK0CjuZ9sC9xPf2cpQ4W9su6BWYKf5KmOnC81wPO5RCbWOT9MkcECA8D71sQunq4OTxJAhRicrAfDcr9K%2FUNsDFTU4B%2FC%2BhREmGFOtmDKT04N5EGfUmpUtAFCrjTp9JyeDztD&X-Amz-Signature=bb9873c0bbb8adf6a3851a06f7c3e23c6d66a6d1ccdf13513515c0b26b34dec9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NQVDI4H%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE9ZgcPbVPpIUHOpR%2BkxMzbe0jqWpnvgMuqhhTJq6rfBAiBSnkYUJNheCgJOJQM9TL4UunebNf1SDJdqFD1KX2%2BYLyqIBAiL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMg3z9LO%2FG6UC%2FplvjKtwDeLyfrTRY%2Fsb6%2FBuu%2F2zgEAOb%2Fo5QQqP%2FYXcnwksM5Uo5Z04icZEPhoePb9jRKhF6U4U4sfc%2Bk1dJ8PIc7bUKm5K%2B%2Bx2lu0XGxQ2OAbBecQ1hkcvGO9S9u5RWcIydWXKl5ZXPuwZ3vQ5B%2BlVwDwBZFFiYHAgVHxKv6km0euxPUj5OGlgMFgZwFewKIu4L7ebQFy5SWZZZIxx6Lpe%2FlcRF7RzFbxgjTjlttiiWuE1X5pxr9b25O6K%2FrSWXrnkTrPPtQYOEalZFOqaqzEyXl9lKER0Rwzhp71fIyYpxz9unNj%2BWDkQ8TxK32LRwq68jv08NNcNswiVrqw2XtoaLXPvMIbG6%2B8neD%2BIYTho8VpzA%2FBMJy5bVeeCPi8CWcaYiaYuDwShdiLwvS7QRgqcHqIlAQFj1Y4LIHp%2FFxkXwfUXi9fzAD1%2FmdGCKc1huZ%2BTGgQX92jK%2Fh0WRaz7h4KApwv3HmqCRWYd%2B0sJ2ZrwCdT7by7lJAjScW%2Fmn3vpExyM%2F5SEymtyoQfbZdCiSu3UlAdycKhfK8HjMltkGJrDNVxebt5zaA4FbzHCYE%2B%2F7TMs5YiOpP0gb1sLG1jyEIXG2oZMUDx7MtAqAWtPiLwApE64TMIfCt4v5y13r2TyKo5wwoPz9ygY6pgEbv9G%2BfKtp91uIyj7sSNCm3qwMOJpjnQG%2BeJVEheZYy5U7%2BbQc7FrMDfKfOFIwfw6inYTcRv%2FVUbjf%2FHfwQA3beJtKK0CjuZ9sC9xPf2cpQ4W9su6BWYKf5KmOnC81wPO5RCbWOT9MkcECA8D71sQunq4OTxJAhRicrAfDcr9K%2FUNsDFTU4B%2FC%2BhREmGFOtmDKT04N5EGfUmpUtAFCrjTp9JyeDztD&X-Amz-Signature=bb9873c0bbb8adf6a3851a06f7c3e23c6d66a6d1ccdf13513515c0b26b34dec9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QT7JWXKZ%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T100121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHXlvtXSUJZD%2Fp7PRb7dK38MFeZFkgSpOkgobCppG3g2AiAkFC5S3m3GvcsoKm4QDRllSw4J2yC%2F2HfrJ1Vb%2FMCl9SqIBAiL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbTuzjEUV3t8c9YG7KtwDsBVbWQoGGB4d8JfmaVIpKSqnjoE9j68Jv888dSMczkONAUengbxu4l1SNWpeR8%2BuWJdAIK32phstW6QKKD83G6Bnd8x228w7OMdDdK9huydLaAyAR5IOC2vpkUwecfPybQvhA4hybldoTgk7lI%2Fm9KN5UXC2F2KAUgLT0YA%2BP%2BH8WNN5k1TvwtspNU1zDOC0hWF2DuXY5YInlHvWUqgjK%2F3Fi55aNCytEZpRhm722oVfP0PS8GS0eS1q6NRikqyyL37b4z9BWF24IMKpGOdoOelb4Y7h7SNR10qQ2PGP4tX%2FzCZpQwODlHz3KnTwxRIKJXG3zDTqUxUP4gbNOV%2FTB4hJSIPOHye2pehehyoT%2BY1zKSk%2BlT58EkeXDVjtU3cbkoTPzsoH3XbcAajEHk8mJsg3Ixz31h5CwZk7Izhqk0VUbVh7rkBYDUKDozj%2BgJFeUOgZBgF6%2BtQqoIlffHKcT0i13XhRL3M8hruBuIeaT5%2FAl3HJr%2FBfCC2naDaoX3cqRz9%2Frw1bJYIWzu5XiRzYHng9bnTEHAe28qdYSSYDnS02ZLR%2FMtnaDfwJVbdkfDmHPWtIa%2Byu9r6850FjW12l30fqqe4%2B9TFvVgtp5pB2F%2FwsC2lSQmNwAgLF6r0wj%2Fv9ygY6pgGL6E1ykCg1sgBV0TDk%2FYKuJPgu1%2FCybgDbhh%2BIhz%2BPVyOF9somT%2FVmkb4T%2BWyOIuH%2B%2BrzmlqfVZIkX%2FKuGlculx%2BvwEud9bDr0TyszbA%2BNjFzz5pXrLDFgW8Ig8%2B4SbCjX5Bk6ebnaa%2FzRlO36uAmvBeSoaFBNdaymokalOyFVjxUk%2FbftU1kSWRtx40ZWOKg6BfHgmxOsXurSGiQ7OEnglM9ZTqET&X-Amz-Signature=6fdb336471572d98605587e09447a51e008d3baca97b805919fdb8531e16217c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

