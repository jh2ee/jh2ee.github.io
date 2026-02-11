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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXOM4KYW%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103606Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBFxhtIH12l6S61Rk3l1RyvfR2fAZzrVSA5Lm%2B29gcBoAiEA%2FOV1pLg3KKq9XqeqwVj875UyONxRtg6bFxFrWnveABkqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLsw7FH8rZGItVEijSrcA9mHEP2foGek%2FP8hkTra%2Bemi4%2FII%2B7%2FZoHZ7EszHYoW7nunIJjRnHT%2Fx6M4d%2BU9J1j2%2BFCICwpcEmP6s7qf0pzplwCDVK3L7WR3RW%2F5M11Ew77VoI2LsOmuR21ZRCKT1PLT%2BWRp741L2XCbQ0A7tIoBPrYvVe5%2Fyezn2OFfJUR9j9gxl2uhNLg3HnoaKK3%2BC5Ei96YfpDItuktKbylwpWk8UORC8DKpmcTUjbpn4V9tpjUnBSMXsfBkkI8DjqqqqEWPuv2euBDxN%2FPtI%2F%2FYxXPF91CeenPQbGUiOsUBRbup%2FjgJqSZiLSWFXlB0hEGaMYwT6WcX%2FBskaC%2FVJmys7eh17%2FuDNSSbRnB5d3q5Y7PwZGR%2FjyJLbYsJPzTRuIECawCCpk%2FbsmTaXfwIrbc0bLvA7dV76A8aW2Q3SsKmCZxCFtbFNP8Lh05XPAW40MW%2BD2JffPIwwY8S3SL9myJtu1T91GZezOHdkaOnQhUz30qKMp%2BJUKxQFzfl%2F4az9omulhndAzb7vfYHrF%2FPHF%2Bpo5lwvUwZ%2B8UlfC4GMAWI6XqK1%2F1nw0tkYa6vX3%2Fi4kK71HUi18Uy9UXfQzh7JpUDRUeVwZwxgfBwsojVe1bnci81kMs8tI3o0tZn%2BNcn4MPGlscwGOqUBj6r0RetzHjE1BEXBC151%2F6pW6kCBtJ0jNQaWuChyPF0ZN8ypMIATrMlZdT6yxgml0ymoV95J2ohzkpKvxvtuZTwgJVQ574ZoBy4sxj7PpCiW2b6z3CsPpQvSrMs8qqM%2FDHn8jhCy8K29vBR8Dx5K07TXP5g1YHmNeePRWWciy5r7%2FTIQ22%2FpvGA9lRW0TyHLxZjVy1i2PRB7s57j2hjQe0WQa%2Fsr&X-Amz-Signature=0672f4a154aca30305696533e0ef6d59a3840485dd052918dd496e0722dfa53b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXOM4KYW%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103606Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBFxhtIH12l6S61Rk3l1RyvfR2fAZzrVSA5Lm%2B29gcBoAiEA%2FOV1pLg3KKq9XqeqwVj875UyONxRtg6bFxFrWnveABkqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLsw7FH8rZGItVEijSrcA9mHEP2foGek%2FP8hkTra%2Bemi4%2FII%2B7%2FZoHZ7EszHYoW7nunIJjRnHT%2Fx6M4d%2BU9J1j2%2BFCICwpcEmP6s7qf0pzplwCDVK3L7WR3RW%2F5M11Ew77VoI2LsOmuR21ZRCKT1PLT%2BWRp741L2XCbQ0A7tIoBPrYvVe5%2Fyezn2OFfJUR9j9gxl2uhNLg3HnoaKK3%2BC5Ei96YfpDItuktKbylwpWk8UORC8DKpmcTUjbpn4V9tpjUnBSMXsfBkkI8DjqqqqEWPuv2euBDxN%2FPtI%2F%2FYxXPF91CeenPQbGUiOsUBRbup%2FjgJqSZiLSWFXlB0hEGaMYwT6WcX%2FBskaC%2FVJmys7eh17%2FuDNSSbRnB5d3q5Y7PwZGR%2FjyJLbYsJPzTRuIECawCCpk%2FbsmTaXfwIrbc0bLvA7dV76A8aW2Q3SsKmCZxCFtbFNP8Lh05XPAW40MW%2BD2JffPIwwY8S3SL9myJtu1T91GZezOHdkaOnQhUz30qKMp%2BJUKxQFzfl%2F4az9omulhndAzb7vfYHrF%2FPHF%2Bpo5lwvUwZ%2B8UlfC4GMAWI6XqK1%2F1nw0tkYa6vX3%2Fi4kK71HUi18Uy9UXfQzh7JpUDRUeVwZwxgfBwsojVe1bnci81kMs8tI3o0tZn%2BNcn4MPGlscwGOqUBj6r0RetzHjE1BEXBC151%2F6pW6kCBtJ0jNQaWuChyPF0ZN8ypMIATrMlZdT6yxgml0ymoV95J2ohzkpKvxvtuZTwgJVQ574ZoBy4sxj7PpCiW2b6z3CsPpQvSrMs8qqM%2FDHn8jhCy8K29vBR8Dx5K07TXP5g1YHmNeePRWWciy5r7%2FTIQ22%2FpvGA9lRW0TyHLxZjVy1i2PRB7s57j2hjQe0WQa%2Fsr&X-Amz-Signature=0672f4a154aca30305696533e0ef6d59a3840485dd052918dd496e0722dfa53b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XFPZZBV%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103608Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDfWOh0yrT1VhbN4si8WnMZ4CXCG%2FZbqA1te1w0fwrrCwIgAvvgZx%2F8vlp9NebdrCp6lk4HVNydt8wsxYRpuD8QUugqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHWkCfmSrciyQHusyCrcA4AzcnShwvH9RWR4Hwnbh2hya62MXjATDmKdw2NUU9rfe91yEJmdFy3Bf96kUv0oF9Wv%2Bd0OasRr7SN34hUin7SKDIgB%2BHZ6rFNeZQ7fZ1CKpvZVmcfmqaWDfndUiZR2oJMu%2Fv34lsYvqQy17W8d0UozASvrckkIZRbdaTE4AqYuabO1YNipXaiZhOOUb661qkHzLGybahgyz0qAzay%2BEMe4AnuT94lip%2F8Gj2wb%2BYBSmg%2BujJiIPwaGKy5sKiLCy1SkmLafmmRNhkv1OKLznnFOAcW7jFYX8NZZYEo7NsjMK3DeaW45q%2FA9mM2pLb4MYlDMuSxXut3PxOcqy03bxFlAvx5pZvDTAig%2F0NanfX7Oqdugefg9KWVMIytJMgysxiErvyRvwJhEFkXFY4rObKVWd3YzkLc3Xvhq4%2BCfaYZ6k2SQTI8Tp5e5yhUUz%2Bym0g7X1df4asFN9%2BS%2FHhchDXE2eQ3nzlYlOeaAcR8gCZZXL4LlX54vYiH%2FonpwGhQryHWXMzcEOoOzrBZkf9BniYA4sfrgYTr%2FOLMUoVdlWXRYhg76%2BX8%2BByw8rco9M0WhLDhlLtWlC4%2BFvOf11xnOIcCi4gDj2EwL%2BQF5b3OvU4Vmnua8PV%2BG6AAZkUUOMP6mscwGOqUB8H0zwg9tXKphrRjeFb2rk50L%2BOHls7TA29oYSJuLcTEJTYmu%2Bz8CgqO%2BGiEwGXGtj8o7Vd7diw%2FijFoZ%2BH0mvQ%2BCDE%2F%2BmoTMU9WfZC2tG5mrjGW73ooU7uO8nSaHwAKHBvgc5ZngKW%2FE0u1V14nEAwMMiMjA2B0F6zEiNY8OppLElIrCPmaCuGpkVAVrnnSxjVvqMiRY0JoycHD2WEXmbaS%2FeQAI&X-Amz-Signature=3ea81aca214f2bf57c0f42a84da7f1b32ec425d440f29232aa0d75aaa39f3303&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622UYALPZ%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDiIWowjqB5Fwu4GkK7MiHURFOU1CHu15bGcW4wKZBC6AIhAPzDqhiEsMZ3Whl23s9psooqtAgOkBj9U6m8N2KpNDt3KogECLv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzBHlg3aoz%2FcWZHmvkq3AOTl4r75fCwH7gMJ68W3AOZqzXEVqeeEurosnb1lGHsv%2BF3tYgEs29h8hcUT8iX8JxU%2B%2FdDGMc6kHiwYRvSDIFkaO%2BFlZ%2Bj9gZ%2B1eON6vdvFQ3SkH4ndYIdT%2Bm7cgHWGVy3XLf%2FPI5v%2Fe3MRGwnGL0DBJp66h4TMsmA2CDNVW3K6x5vUOdBWvsUia0AetGjNR7axIHg2Gtb2kz7u0tlsvl%2BJ9%2Fauw%2FM1hEk2hVEY%2Fn0c%2BZbwSsUaVBdRkEXylJ%2FAkPKXrJG8V8bDjzx3G5bVu5ZHtlTIo6ylAjIShE0OUbtn2NzbUgHf1W0W6LinPPHUJmQv2I%2Feg7659G54k19yYEl5Cocy2IHFlo0smvuaAbM5SE5%2FHmHfeop1JvtVaXhle3lT1VdTpmajkoy0TdMXfPgZdUC1HDJNH9n1l16PKyX9OU2x4Pe5xUk%2BfykG%2FQ4tDXbL7I5m6oHc%2FZkV%2FM1kLRJNbwgl1sUYfHF7ddmTqu%2Bn8ekkp3YqpWt%2BouHni84pAL0pB93ezWC08KC%2FuHIP3iCiBccOJhU1QOjR4JGsWX5lMj1ZBMrXB1wDKJKyQ2e63DFISHrefaYDfjBOAuwcbGfTURtgjSTgu2dIzl5oiPZ7OuLLa3Ykx0h4vIWhTDqpLHMBjqkAcq23yu65dN8svWaNhk%2BvkOjmGqDaHw6rHYr8wIPMxUf1R%2B%2B0nwXjkGSdOCExsnz3gQlg21s1GiKtoK5jLtlnZ9IO8dE%2BatBtZ%2BvlqEmOsYiEv7SoYE4DJlhwFK6LFXxm3kupksXCt7ONI%2Faepl%2FSKdwLmdd323oFqWk1fDmN95DdaS4R54ysQuezqQARuGTZVDMR%2BSpkphAGPjQB4cfANkK0E3o&X-Amz-Signature=de6b64fc223f258d546948c163ee8771d2ed7402323a93a692cbea19ba209318&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622UYALPZ%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDiIWowjqB5Fwu4GkK7MiHURFOU1CHu15bGcW4wKZBC6AIhAPzDqhiEsMZ3Whl23s9psooqtAgOkBj9U6m8N2KpNDt3KogECLv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzBHlg3aoz%2FcWZHmvkq3AOTl4r75fCwH7gMJ68W3AOZqzXEVqeeEurosnb1lGHsv%2BF3tYgEs29h8hcUT8iX8JxU%2B%2FdDGMc6kHiwYRvSDIFkaO%2BFlZ%2Bj9gZ%2B1eON6vdvFQ3SkH4ndYIdT%2Bm7cgHWGVy3XLf%2FPI5v%2Fe3MRGwnGL0DBJp66h4TMsmA2CDNVW3K6x5vUOdBWvsUia0AetGjNR7axIHg2Gtb2kz7u0tlsvl%2BJ9%2Fauw%2FM1hEk2hVEY%2Fn0c%2BZbwSsUaVBdRkEXylJ%2FAkPKXrJG8V8bDjzx3G5bVu5ZHtlTIo6ylAjIShE0OUbtn2NzbUgHf1W0W6LinPPHUJmQv2I%2Feg7659G54k19yYEl5Cocy2IHFlo0smvuaAbM5SE5%2FHmHfeop1JvtVaXhle3lT1VdTpmajkoy0TdMXfPgZdUC1HDJNH9n1l16PKyX9OU2x4Pe5xUk%2BfykG%2FQ4tDXbL7I5m6oHc%2FZkV%2FM1kLRJNbwgl1sUYfHF7ddmTqu%2Bn8ekkp3YqpWt%2BouHni84pAL0pB93ezWC08KC%2FuHIP3iCiBccOJhU1QOjR4JGsWX5lMj1ZBMrXB1wDKJKyQ2e63DFISHrefaYDfjBOAuwcbGfTURtgjSTgu2dIzl5oiPZ7OuLLa3Ykx0h4vIWhTDqpLHMBjqkAcq23yu65dN8svWaNhk%2BvkOjmGqDaHw6rHYr8wIPMxUf1R%2B%2B0nwXjkGSdOCExsnz3gQlg21s1GiKtoK5jLtlnZ9IO8dE%2BatBtZ%2BvlqEmOsYiEv7SoYE4DJlhwFK6LFXxm3kupksXCt7ONI%2Faepl%2FSKdwLmdd323oFqWk1fDmN95DdaS4R54ysQuezqQARuGTZVDMR%2BSpkphAGPjQB4cfANkK0E3o&X-Amz-Signature=3be1fd5885de429a2af73add574abe95077ed6db10208eaea4fc3aa008e76037&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDBSOEY3%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDbLAYi%2BTiyT8osxMieXfFW20eB1ZQDa5Xfv8Mv3DP0wwIhAIRQTxSbxaj42%2FscN1fxUEMnDmB2nbZ6uSwFLyCMjmnuKogECLv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzZWf7hm8zMhlglMC0q3AOiBv%2BKdBHF6QhMGBscDhaYzEZGqlwVxIMNBQAEsCP7H0pkfl%2Fmspps5MMwMCKjbKcTa8v1xk7dzk%2FKlvFGNbhclp%2BmBt3B5Rj%2BKNdyi9NGvLalGtOPT%2B7d1nFHMdlJ8bzGQ3uYFKsyM3mX31ZIQxFEDjlUkKcMKCmKVFXZK7KwRB4iLwcZ8E%2Fq%2Fz3PJTfrGZUY%2BRhQ3gTaO8N911iFqGe25pRXHIHLUWQZvN4GfDYybwMx07uHV6rmLsMho5s4rHxd0EI1%2FSERPKxqXOOFCzY%2FeUoTrJNZ23CXOwIs4mzkEC421mqkAv1DDhjZJR8XZJ3%2BkK50ltOa2Gil5R1pj5xrn%2FCU%2BY61WVina8kIY8mz9h3qjDctlOZbpLQnVhyPBlyXeAPdXT0svahrreJhzhDy%2Bnhk5Nq51MV6yrxP92n6KldS17CpkmXRDmzZv0yIoHhx%2BpMiW1rN%2Bs0Zow9ctq2%2BEiqkkvRG10yf%2Fw4nlUnCXbohjvsCwvi7beS7%2BO39MPWVTqUGUMAbhWKyF831D%2BNveVqKzr61kvKmOJQeuNpTdzTOtLgmDV82SU%2Bezq%2BG%2FrDwBczN4NKB01VBCRuXJsaHZw1wYjivvpUmTZJA6N1mgt1hHkblZ08gMKjdeTD%2FpbHMBjqkAZoKgiBpoFjOLC6VDzAfXoDT%2BthfThmTRN6CvvC3hFVU9XqPMUz4W8pFiOBEtZcnqc%2FoqT2P7ZvGwW2z0OW17egD2CPXW0g5soZz%2FkSia2o9KqNzqWOOq0iD3DhLu60jhBDgoo42pSA3u4WnUA7PQ4j2zaDuwVgiBHgBacq0vllC6MxfUEmYMAvasN45CEK6JN5jKJxXrZCnimjvWZKcBvbXmL5J&X-Amz-Signature=d13bbb08a229f3778021da3da2d5f5e9cfc7ae20cfb8e7a0a14539f604c23f3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNR7CQJX%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCXGHwFiPuqQ7dB2NXZBw3eKdtrW%2BcQo6YloTlb3FtiCAIgcepceVOQAImYbjfgHkKe4dumwXaiP6O9xBm6DbmoFQEqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOfqelmktRn1UrYBwCrcAyF1VeIO7dsKOEdmWndRCR7BFZZRAaPhXDk2wJM4EC7Hyk2TKKBesYJ0Bjbdkjlhvq9Vv2FL%2B%2B7Vf%2BB6oTNEuYRmhjoxrnWX00U3POVFUIYsRSUX210aCfDnyb%2FWZJzxVa5BkP1kNLRrRflCw94%2BEuTdEa6tdB7qgTGvFE9LL6rnHNcGtAUPdHBElm%2BfJ4VqRXDMUya6d%2FfmpkmSRjgpBgo39a09EFFRZG%2B9YQ1Mo4N7EsK2ITHw3VG7yicYZS34sODzGaL8AayVlV78QdVoc5c%2BX09k0T8w0aCeUUkIfal8UYS0qIKME5y%2FofdazSBz8tlqnmOzBl4TJlCMsIpcR2xpSrXswXtjhI5RVugLafNEDM9d6JdIn%2FZvY6bTYHvCQMuwzNWPaylKjDWWPHnrpDg4RByzE5i0LsDpdPURR6DY%2BVi72j%2FlQhRJuMXTfSzgzhehRIMOckTpP4lSg5sK%2BILX%2BG4ITBnz5INolu3I%2Bi2PpU5a4uSWP4dpFyIilvSBEJcd2ovN9%2FQYqbieJivsA0JzZhYoEbJs%2FGqRnFO4M7XdoG%2B9KZdkyoWBDV7o6zdImsvULSTHi0epRTTnsHBaxogobxbKd%2BKNP6BxjeBGSh9aOK9%2Br00zD%2B9%2FsoJgMOukscwGOqUBfNzkxIvtZ7HbdKfZfW2I2CYTjcwsu%2FVCFghIwhOM9aeKkYB0BTmUeD1HSPMC7t%2FU4BOxG0kOfuXvExhi7fOhGmMVo7XKpcBnGh7yN%2FLqufhf2GzvZdYRPMGtnUlwNQkA92akiNN93gKq%2FnTXACl7PPjGSZMzjDmiA6h6UAHTlidkJW9h8LdC%2FjoEoW5Ud3HmjVsgLxjHfh3%2FnpcZdeRFBjZOPIx8&X-Amz-Signature=83e2eec8caabef9c17aef72edbcd202e055d55d8d72c9e71385f4a311579e255&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRKHNLIN%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDQbD7xbSK7Ok2rWjtNrZcz05sBDmzFTqq0dE2DSWJA1gIgIxcStYO65G7ChkQbUgcrNQonLNPmdupGyBM8dBVF5pkqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFgdteXquIsPONzc%2FircA7t6uI8UrOOpoNSyTQah2XimN%2BVub8AjNp9W2XLFnpsHzT9UFErApUgU2aH7vr3wW2wf7kzy2ctq%2Bqz2dH%2BfMo0z2iiCpI9IQnHsA2%2FK5Jy9WcQNbvtzbrmEPMomnGWfrMWr9XMNR8AJnz%2FPIVWtn5ZC9dio9zGigC0BMDepM%2BVIqnp0cJot4l9opnLA0rpbjmHKItZjxohB751fjlxEU1SbjlwfkESmd4RWKeqTF62ctRZqfaa0VGxa2tectXdc7dmcM%2B0s5t5fGQBg1gYCQDYOWX875cs8ye2spEcXh6iCfXrId%2FVvLK23%2FAfHQ6SvzpJ6x%2BfEO5RCGNAKH%2BalbyT0jhodLH8T%2F69frft%2B%2FvSek2bzFG26okPjHuvA4svJHdUD5PMb7xhazXRaakiWMxMYoknCM7H4Y4mhjaUSD2NI7DY%2FDft85WzN%2FCIasSWgHyIsAhoD%2BqXOQBGdTTnUuxOlp%2FDGG1RBSdZie0nmqAJ6VdZw5tAJTJwsf%2FJ06jAIDYVsRCp%2FmeeUdcvDMTM23U0ZFRMtlraa2snSg3lMcDJDxESlP3WuoaZeNA7iFUo1%2Fv8F%2B%2FvVDkXqlWJiJdhG89M4rchxnH%2B58%2BYneh05j2Cbq49xpFoyg4i6f51bMJmmscwGOqUBHeZfhfC8QBPBoqzYtXGKU9d10T3oLe9kY%2F%2FpAvShefgv4NSzkEt1h0osV8TFuCSIvEy%2BdXBggYm0csUglhXpOTCa1XQLVpkIUXbRZnoZoaIPZEzcwDT62y7Z%2FVU3kybG8W7RbBE0bNAYI0Q6B6B7jt%2BHoMrbHnc6DnENZHyx04p%2FZklx%2BiW8IcCbu0Wv88W8zhevElLLf0Zb4sa3dIBJE4CUDO6e&X-Amz-Signature=10d59532933805803532044d8900a37d68a9818b56bd0b44baa0be866cdbe284&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FHMSFK5%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDDH%2Bwvx0LNx%2B1sMYhn1X9wLnDfvn4y93%2FM2wTRp0c96AIgX%2FqY%2F7s9Ff%2Fk%2Fv5j6B%2FXnsKj0qbghch7uMQAbHUXReQqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIoqOLw4gSOXJR4z7ircA6twVChDWDntQmholsRB0tBRVoN09MPs5SyYCOdpf6KZcypUJX41tbmbY5J%2BBoeY35AoXlkC8y0XZzfTAilYbJakyhwZsSa6Nl23MovMONKDOB3a5%2BXjf2IMhydInmNV4mZV%2Blm6gtLdMzpRKVwVu8TyFMqOLa1EKve0x3J3EAD0gTog44FFpYbnGnIin1oHmo%2BkG1SnQwxSCbJgEelOl4OotQFDRx50f%2FO3QAgK9L3djxzDw5AZADE2TIJnKmBdQp%2BwOOn6NwjXyBO1UvODDO%2BGSoAIih7pUOPX3wXGhKv5Ftb38AQ6XoTjpjvnGomr9TiVQRe0bwh5cH0y0GthQCaTwj%2FXF6brI5VF%2FrvQpOT%2Bxba1DvMAZDQzPPkr7OGe54eTvlYFiAjVE2ph6C0wLOoy%2F2ahuddCGmE7JzuBhtFPUUm2sdFbFIAZ0dM31FJTfy4Vs0%2F4Dy574mlYzzuzLmg1gzjuRH6TzbNQE5bk13IVslKgB8zFLTwYPARjpRenfFlxz7WsyyahEmagCGy2Kz7lBq4C1OkgLPESlKXVCfM2VH1Q8HGzz4QA4HNESxnqkV8kheIYtWVqCqQJNaQVqOSm1kTNY34qV%2FTxSudtt4M5CmwPvC1o6e%2FBi0nIMLSlscwGOqUBszFctFVcU%2F%2BYAMOCJHVy0VN4cHetQH2kb4R%2Bp0sx3vrs5H%2F0xEqJS45wjN4s%2BqihxfIHYBRyqLkWH8eLy56gpgYfk5pYKE49Ees%2BfU3WX6vTE4dipgs7Q1k6jIa9LWS3YwZ9tozXeTGsRYP6wPpzHQCqa0WmFBNDLvEGKLUcGAP3BLxp%2FhgxajgVNZOlNZAqADTJkXmm3IiyvwHhJhyyz9Zb%2FAWQ&X-Amz-Signature=21adba82cd2067c8630e7f9037872d3fe860e0f5b4cdb6b18959f30f9ae7b725&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FHMSFK5%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDDH%2Bwvx0LNx%2B1sMYhn1X9wLnDfvn4y93%2FM2wTRp0c96AIgX%2FqY%2F7s9Ff%2Fk%2Fv5j6B%2FXnsKj0qbghch7uMQAbHUXReQqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIoqOLw4gSOXJR4z7ircA6twVChDWDntQmholsRB0tBRVoN09MPs5SyYCOdpf6KZcypUJX41tbmbY5J%2BBoeY35AoXlkC8y0XZzfTAilYbJakyhwZsSa6Nl23MovMONKDOB3a5%2BXjf2IMhydInmNV4mZV%2Blm6gtLdMzpRKVwVu8TyFMqOLa1EKve0x3J3EAD0gTog44FFpYbnGnIin1oHmo%2BkG1SnQwxSCbJgEelOl4OotQFDRx50f%2FO3QAgK9L3djxzDw5AZADE2TIJnKmBdQp%2BwOOn6NwjXyBO1UvODDO%2BGSoAIih7pUOPX3wXGhKv5Ftb38AQ6XoTjpjvnGomr9TiVQRe0bwh5cH0y0GthQCaTwj%2FXF6brI5VF%2FrvQpOT%2Bxba1DvMAZDQzPPkr7OGe54eTvlYFiAjVE2ph6C0wLOoy%2F2ahuddCGmE7JzuBhtFPUUm2sdFbFIAZ0dM31FJTfy4Vs0%2F4Dy574mlYzzuzLmg1gzjuRH6TzbNQE5bk13IVslKgB8zFLTwYPARjpRenfFlxz7WsyyahEmagCGy2Kz7lBq4C1OkgLPESlKXVCfM2VH1Q8HGzz4QA4HNESxnqkV8kheIYtWVqCqQJNaQVqOSm1kTNY34qV%2FTxSudtt4M5CmwPvC1o6e%2FBi0nIMLSlscwGOqUBszFctFVcU%2F%2BYAMOCJHVy0VN4cHetQH2kb4R%2Bp0sx3vrs5H%2F0xEqJS45wjN4s%2BqihxfIHYBRyqLkWH8eLy56gpgYfk5pYKE49Ees%2BfU3WX6vTE4dipgs7Q1k6jIa9LWS3YwZ9tozXeTGsRYP6wPpzHQCqa0WmFBNDLvEGKLUcGAP3BLxp%2FhgxajgVNZOlNZAqADTJkXmm3IiyvwHhJhyyz9Zb%2FAWQ&X-Amz-Signature=c1c3dd377587e3a03f646bfd8de665e64000e77fe9da9ceb4f6909e84b9fc67b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZST5OE2Y%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103601Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD65Sm1s0v00MwYFH3309kroScFgyLre6auG1AtxtTSsQIgSKw5ZibfROMlwVFFJGbFpb5iPH2AOGfbN0pg%2BDe3krIqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC1FMKAVuSrbYPz2PyrcA9jGzLC5jtFBxLhhzSMdSMa8tXUyOJV0xhxiXxJwyASGpAbxWvfCtOkMRabmkoIxBTd8MPQJCbGlQDTZ7%2BwcGgMTiznG7Ru3RvObnKpKeYISvP2p4zjuf8b1Q9Imf1R9jeduPofjtebzX%2BD0jJ1O8xV9gXVswqEjp6cB0DMaDUTyBTO0jhJ6pjd1BpWRrq28GTplSRHLALl5cSL6j9qolXb5HM1OUELqVAXW7uLal1xZ35p27epGLdhzeTJnb6vJFT6zUD6zRtTH2FO3ndR9Baj8ImKxlIABTr%2FmfMXknyuiCYQtfS92AHdvTM4Wi3CuYntHXH9YwW6SmordOVU1Cy8WsGagKP8DXAuiwZM2CBcM6of1RhH385TYGAbbAFpXin5fr263YfADLaFHCHH8H30EWtYUkBz%2FaUPeDqNvHbiY6LuFyg0ECyQ5zBMk3hwwjrQPiZg771CaZsO3tIjuQ4pqAKE1Z9mhgSn86H5O4KkbyryGBmA2MsOSYNva4LmzKdeBw8d1DJPzHFdvcqOTgWXrLIimybAcy%2BqNV1VvYq6AnhnkjuCtS2o%2FNREeCd85P1lVsnMfld%2BNo0wW8a5Xhbqr%2BJg2rkbkNik15skLkRPvvjhFsQ3woD2tzQE0MP2lscwGOqUBU9dr7mrRBqovVUIiC5ollZUss1EWeCq2vILVHDLcMj11mtxL3%2F4qBsvx5QeyGwSLSiNVQnWFAR4ito%2FNajp%2Fllyh49%2BwqLBZmym7f7bDYOvszM1fZsLp3z4GdOyaLlIFlVOU1Al%2FBIP4N80pOA6yfMoQyXZJ78nLG%2Bmm8ePwqwOeT4bGTg8OrCoer0UGgSZLRvOvVSCwoIbXuAg2eQNgyRbdhB1B&X-Amz-Signature=342de281e4bfb09b3c5319af9c72b0dd6a3b66948140f3be4e3cb6bf3a62e79e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WINJFXJ%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFS3NLMDGQUsoewiKBrXAaapjVblAz%2FeX9e9Z7OwucQjAiEA0p5db3ww5q3h3o795OTJpS24%2F6Zv2uNMw7%2BpJOJ7bHwqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMueA4gzEwKlDGU1pyrcA606%2Bn2UaKTswQn%2BG87mrBODPVVRT1C6xIPD7y%2F0EF2I2wLRZ5dkEkGyIVdBl5Y8mcbeuYVfzg%2BRwhDE8xIuerj2TL7M8GTOCkARt9OghtE2c0wsGrsX9D%2B0W4UvMxUNQn54%2BeNQvqtnHcdpLnlIgUAprHEo%2BHKX8HWPgYPAI7KNqq6PiO61K%2BslRjci1kxlBs82%2B1KYx%2FhHkn9o4Cvw2kLvRX07w1MXePHsV828affFoawCkssGhRGsJ6EeNo%2BtEXHlm8AdViZqhAacBYjE5KJDyCRWSm0Jg5zoFX3u0R3rGAHpU5sVoe7imOzCXyVgN7C1Ufq%2Fc6h7q8kGTuuoC3Wb4ayfb7aJGdNFSHcYhc93vLW2XYwt5uhZ51C3lU3jL%2BjiN4IZxxuLeog7jnvhTuQMCI5fUEW0LYJmc1XNw3vKRdKfzQ4NBirfqwx%2BO0L0eMqZa7gkMsEdCg8kY9%2FMzlx5q%2FjphUuRXWiMsQYZ%2F%2BuHZWVCnKYCIE0Bov3E4DxhF55DLN9soq1V7aTWxRU%2FUld6YffjGS3l%2B%2BkkiHhevxN0Iqi0UuWqnE2ztfU2%2BLnbqOL3mu43UlBgbYAGshjEfiaM3hFh0h%2BjtDrUZl9QvMTTnJHlguZ%2Ftu7pGNk2MPSkscwGOqUBwmMHvdJ1Ob9r5FlrEiEsKDhCwlqf76yxe2FRIDuxU0g4%2BGaI0ynNtILvahMGrannsCyA5uUgQXslGOyuiuicWDip6U%2FEFlt5JCUHUYNQ3Pfv5FJL7Zxhaz%2FWCNGjAUc9sYDKkJBZ%2F5kK98voqDqdPpXABlMdo0RxWCaMP%2BU26%2BB5HVyWfAsv6qsjGn6dM4w%2F0MthQQYhbkiI9YOhrX70KUBhhNBq&X-Amz-Signature=28d8156f0e9487ab624f4e0c6035a416f4002164f974e4de3db9792c8bb5a786&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WINJFXJ%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFS3NLMDGQUsoewiKBrXAaapjVblAz%2FeX9e9Z7OwucQjAiEA0p5db3ww5q3h3o795OTJpS24%2F6Zv2uNMw7%2BpJOJ7bHwqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMueA4gzEwKlDGU1pyrcA606%2Bn2UaKTswQn%2BG87mrBODPVVRT1C6xIPD7y%2F0EF2I2wLRZ5dkEkGyIVdBl5Y8mcbeuYVfzg%2BRwhDE8xIuerj2TL7M8GTOCkARt9OghtE2c0wsGrsX9D%2B0W4UvMxUNQn54%2BeNQvqtnHcdpLnlIgUAprHEo%2BHKX8HWPgYPAI7KNqq6PiO61K%2BslRjci1kxlBs82%2B1KYx%2FhHkn9o4Cvw2kLvRX07w1MXePHsV828affFoawCkssGhRGsJ6EeNo%2BtEXHlm8AdViZqhAacBYjE5KJDyCRWSm0Jg5zoFX3u0R3rGAHpU5sVoe7imOzCXyVgN7C1Ufq%2Fc6h7q8kGTuuoC3Wb4ayfb7aJGdNFSHcYhc93vLW2XYwt5uhZ51C3lU3jL%2BjiN4IZxxuLeog7jnvhTuQMCI5fUEW0LYJmc1XNw3vKRdKfzQ4NBirfqwx%2BO0L0eMqZa7gkMsEdCg8kY9%2FMzlx5q%2FjphUuRXWiMsQYZ%2F%2BuHZWVCnKYCIE0Bov3E4DxhF55DLN9soq1V7aTWxRU%2FUld6YffjGS3l%2B%2BkkiHhevxN0Iqi0UuWqnE2ztfU2%2BLnbqOL3mu43UlBgbYAGshjEfiaM3hFh0h%2BjtDrUZl9QvMTTnJHlguZ%2Ftu7pGNk2MPSkscwGOqUBwmMHvdJ1Ob9r5FlrEiEsKDhCwlqf76yxe2FRIDuxU0g4%2BGaI0ynNtILvahMGrannsCyA5uUgQXslGOyuiuicWDip6U%2FEFlt5JCUHUYNQ3Pfv5FJL7Zxhaz%2FWCNGjAUc9sYDKkJBZ%2F5kK98voqDqdPpXABlMdo0RxWCaMP%2BU26%2BB5HVyWfAsv6qsjGn6dM4w%2F0MthQQYhbkiI9YOhrX70KUBhhNBq&X-Amz-Signature=28d8156f0e9487ab624f4e0c6035a416f4002164f974e4de3db9792c8bb5a786&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XVXX7DE%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T103613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFhUScSv0k0lb8L5W1%2BgmPq4Ba2BTSxSuIoxUI7Fp6pzAiEAj0Yt3kyJk0innEwZoIHT2kmTZJO2AzRQfAKuQ6tCP6QqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGWq68BZMUX%2FYielZCrcA92edZuzdBro5yOEpvlq16jI8CG%2FFJFpBrxgfRN8PUxqFO0fPEEAiB%2BEfsm7awer5qSiFcoKYcdekqGpzYRoNUDDXBbjwbrHUrjN%2FHaUZ6MYDaOqzUoP0M8wXjdm%2FJL8J51zz1vIRBaJcL3hzS7vniKk4ks7dCcgldQ%2Bk85l4tW4%2FPPj5rxL0sNjpUqY0LEDuIZ9fkQuDq%2F7EWc7Bzbz6TDeQeT7yAslWn2U8u2MpcJ6da%2BycG%2BiQ7KcEW1UOUQQpfkbQsIPUhsqop6tI8dSQ15G7Ki54u0IbNRVT%2F9kKc4QEbD6FZMdHf94yMOtb5dIskvfruqI8QeFkWLWVorAiO4JRpBT%2BMkvsDubXLe3qPWPhwD3USchMdyYUrcSMqy4tI30ypX%2FfB5Dt%2FjwW9zzHyzo%2FtX%2B8kgu65bfk0MyjxpH2yBB%2F5Gx35aHNf2YRxfyQPqYHhB82FU8wTAuqFdmevyy4409Pe7Woh%2FBuQgz%2BpI69IhnfO%2FEph2NJEwYz%2Bjeq1WaS1Ax1uf9XUYt6AmbE8c35w%2FccUCQcifgPybbR5OPHXNcbL%2BXtbJ20vLlcT5JWsO4YTCd5fPKkuOiVuHQ7fGZhub6ocuPatKIGHixV0pxsf3NEJt9KTrCoxulMP2lscwGOqUBAN3rpgzJRoD16GltaEOF41fqSpnU1UyT%2FkQ9mZ50310Q2QsY8OGMJlo%2BDtS78n67Hfu%2FcwO4oKYxQ%2Fap%2BpphF9PM%2BfMbLGm1Di5%2BzjnhXTcqau1SEoVM2L7bCj9iQXI0XGbfTk0UMi%2BHqzG%2BGJsyJyu0CYwBbq28p%2Fmdk6%2FG3HQ51UO5tsNHKRFxAjp5N13Cin9xMpvZis%2FMCvhsAFwOozOBL%2BTI&X-Amz-Signature=088ffff1eae6641fdfb5858a87bf8c7be88aaacf5672f0fa2428b4f44eb4ac0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

