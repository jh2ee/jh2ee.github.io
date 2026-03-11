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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ETPYXCF%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC6PWxifXZANuv8bZYy72BnYrTI4AoU8wIb7d760JwN%2FgIgfoGA2TYkCMUtAuVvfgaJjO8ViDAUr%2BCBVmesf7FK2%2Fcq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDJHu%2BpGVuhM7LQNLhCrcA3G6HJIjNXSIv0u6y1h%2FgLtKPpf5WHgz7rLhc8%2FasdQtPYUf6rZVedItL%2BURhAOk%2BO7H6trXLp6YzyT8PLZtIV5pJjY2Cgulkif%2FFaCY80bnHb83QVi4Lpxw0gSHCaxPlXPj8tQsYhdlnRem9Bl1w3z%2B14IR%2FzPFxbS0SgImbY6HKKGck2s9nW04iBqrD8vMFGPEbieoJ6qd6njo5NZlN5NMxG4LtnZKOVcvVoFgYjZdcA8vkKw%2Ba00EXexU%2BCt77CTuTFDg1VRZc58zCY9ZUW3ov8w4dYa4hz%2FrMaCOcnlCC8lyvIBgAK0ff2svYIdDCLCrXTbqnm84h3TlaAU%2FeQIxMBzn6zd7RNkGp%2BhBX6IjZBZvmv%2Bd2xGUkeRt6XD4SgjZnp7rxEPQRdqr1wLPu40%2FhcAd0wET9ldCPl8OaHAfDDxVW4Yad%2BMKXNBk2pSTY%2BhM0b%2BE54DpgDdtMw7%2FgCoAgUDIKzywF0v%2FKAxw1ID31EalSeXG68HOm9Abh6MGLDBb32BzK1ru%2FH33eOzYcct8Y%2B%2B1GDdx6cX3YhduMgSzlAXiKZwWvIqWfzbHJCO0ZQ2BxXr3lTLAlJABkd4k%2FW92E%2BQZf1SLzNLJEldixmcwtmYvgz4Zc9DpaN3wMPK3x80GOqUBLd%2FvQuAYeuq8MC%2BnOngzIkklQTuQ1vcH%2Bp5xwAg%2BLiXKobYFoErGtsi%2F0cRZZTlktuQEsbrphaoSixDFNPUHYPJGRfsNRHXT2GrK4bp1dOFjvYrguGJv83RZ%2FaC38HHNdRLxFvTd0yH%2Brv5gLn%2BX8Mz%2Fl7ehKLrdMomZj0%2Btl2c1bIQxOFDp0fEH8S%2F36fHxd7xOWKvGegbDDaliRO%2FVfpxxGJYh&X-Amz-Signature=25d7072041f34027364e4352b3f715783752c3a54c85844594f7ec80557a7ebc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ETPYXCF%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC6PWxifXZANuv8bZYy72BnYrTI4AoU8wIb7d760JwN%2FgIgfoGA2TYkCMUtAuVvfgaJjO8ViDAUr%2BCBVmesf7FK2%2Fcq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDJHu%2BpGVuhM7LQNLhCrcA3G6HJIjNXSIv0u6y1h%2FgLtKPpf5WHgz7rLhc8%2FasdQtPYUf6rZVedItL%2BURhAOk%2BO7H6trXLp6YzyT8PLZtIV5pJjY2Cgulkif%2FFaCY80bnHb83QVi4Lpxw0gSHCaxPlXPj8tQsYhdlnRem9Bl1w3z%2B14IR%2FzPFxbS0SgImbY6HKKGck2s9nW04iBqrD8vMFGPEbieoJ6qd6njo5NZlN5NMxG4LtnZKOVcvVoFgYjZdcA8vkKw%2Ba00EXexU%2BCt77CTuTFDg1VRZc58zCY9ZUW3ov8w4dYa4hz%2FrMaCOcnlCC8lyvIBgAK0ff2svYIdDCLCrXTbqnm84h3TlaAU%2FeQIxMBzn6zd7RNkGp%2BhBX6IjZBZvmv%2Bd2xGUkeRt6XD4SgjZnp7rxEPQRdqr1wLPu40%2FhcAd0wET9ldCPl8OaHAfDDxVW4Yad%2BMKXNBk2pSTY%2BhM0b%2BE54DpgDdtMw7%2FgCoAgUDIKzywF0v%2FKAxw1ID31EalSeXG68HOm9Abh6MGLDBb32BzK1ru%2FH33eOzYcct8Y%2B%2B1GDdx6cX3YhduMgSzlAXiKZwWvIqWfzbHJCO0ZQ2BxXr3lTLAlJABkd4k%2FW92E%2BQZf1SLzNLJEldixmcwtmYvgz4Zc9DpaN3wMPK3x80GOqUBLd%2FvQuAYeuq8MC%2BnOngzIkklQTuQ1vcH%2Bp5xwAg%2BLiXKobYFoErGtsi%2F0cRZZTlktuQEsbrphaoSixDFNPUHYPJGRfsNRHXT2GrK4bp1dOFjvYrguGJv83RZ%2FaC38HHNdRLxFvTd0yH%2Brv5gLn%2BX8Mz%2Fl7ehKLrdMomZj0%2Btl2c1bIQxOFDp0fEH8S%2F36fHxd7xOWKvGegbDDaliRO%2FVfpxxGJYh&X-Amz-Signature=25d7072041f34027364e4352b3f715783752c3a54c85844594f7ec80557a7ebc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656X34YPU%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGM4%2B0090knpV%2FaMzRYOEih54%2B4hpu%2BbRwr66AxL1P84AiAXkWC3HULHvzr3fuDlF2eNDROgEBRRtAWDBn1aiJavZyr%2FAwhmEAAaDDYzNzQyMzE4MzgwNSIMtwTqtSP1KR%2BAOP4RKtwDqU7RM3sXGtVCWZZpGzW6RjZLw1dHHyhiZQPk3aotd%2FY9RaiDYXiNpNc%2Fg5GyygqjaJA34lkxBY57en8XFm6H8Q51eFOk9PSJu0p4Jrad7C7UvGUvuaL%2BwjCQVahCm1tD591%2FDIZA1w%2FHVNv4GQ408FEK2P3IiXp0udK01gjngEWTZcRmyF1x1CQEPjwJ1hlNuxPo6gaa5tXZ7cKsTm1jgsYIExsRlk%2B4znr5BCW3JVwI83lHV2gDOhqn%2Fyv0o3NXcIVg%2FkL1ClhbaqwXsbv9%2F%2FlqqRhyie6U4otMdNrKVPmXz7y%2F6uhDVAHz2V2YB8lwqrpsds26H70GAS6v6UZtBWwV8J%2B6hkLZgwW8C7yrkFdHIguKav8ksd%2Bbc0dcfkyzI7T7qWpjBTdS5cj%2FfLeckytto4oM9dP%2Fs2NHNTOPuzKHq9tY7fpZftlwJ58ECLQ9%2BkkSWpd%2FXO3aVodIqblzI3A0ugILQhQm6asigjbxHWD87cn71%2Bp9AIrtj5psf6J3qT5991KngdoxmnyPigZrrxk3f4R9CWcY51Na471OmrivtZYoJ%2By0lN9nACG%2B0XW3huUdQRm%2FaHuaL1N%2FAPjU62rzbzng3ehTX4%2FBdziC%2FVE6qP4FCM9KE30SxIQwrrjHzQY6pgH%2FoYzfCJkE8zuv7cswVrYYKWe4HxgDZUiFL3D9CmznXDO2quv2RzlZp1dKEDNEjZsrZCFV8vuvhlfDraS4bHCXFUQaRgyjKO6TmbNIrngU5VFot2YdO9X3PHkhaQDLh37jsmufNRmATzaVH90xdLvGZkzC1WuAb5Ays73M0cFkZbFMvUOWn1O3UHKUqJVRSB%2BPK3AU6%2FJii4HsW9h2cAtqmSdnyekX&X-Amz-Signature=165d7ef2da55f45570786715a57dd3d30ec609fc84e5d5d39033391acb84e56b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AOCTLIL%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICNg64UGgyvqe%2BEa5nBNIMNQWSLo9VXuN71gfzRUYWrNAiEAgHJb08kl2rjHL%2BX1JVe3ibAoGfjUfYURXKeqCK3SHUMq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDNclHLHCjR%2BczaaVZSrcAyMVbDavvSXoKeO%2F0rKEvKx4deXp32xjmmPx9zFSVb5YWGe2rJmeOAjexozUOYgdixoqgBikG4tEO78TY3Nk2GBkS5QedYJTnVrOIOdeMevtTj8EnNvmByJdBUb2WoHSVJ28NvOaICuL4WTymSpXSdblYFaQacpVdTk7rwDX8%2BiHeEx%2FIIg7ImPOEi6fVeAsccYGZDVJfvly7MsPY2GETwFPs95JOrdzG%2B7rEtakAIGG%2Fb9SmGtLkx%2FObfjU%2BncSODH9Gju5%2Fy3TotkNGB16Q56LGT5dWS1im9Ocyr8ZR3mn%2Fj97OK%2FS5sgjyoAdxV2njqmRXSPsyrRKc24gMHjjZixx81MxbzZwdPRUyRe9tQVaNIilDTGn9w5cAwWNrtSuTxQthtj%2FhiqTuvCyjaVoIilAuVjYfLwahrRv7WS234oEoDg4tI5qxkWJ%2FI5l8Zfk09eMOBmGM1Z8y2tVuTeBXNi9JIdqc8D70ZDl33%2Bypz%2BvzOgEATybVxplxDJCRS4oS1M%2B2WJvXdstYKuQcXeJnnG7xsvahPeWVDJ7rGrSx7TPBMjdmGWACuol5H6%2B4yfF61kvXk9i9DWrrRGFbnWihrVP2wxjKhBiOEYrpJbW%2BhT%2BshkawuZ5SO0fnJ28MK%2B4x80GOqUBgEAWDSO3WOvIh%2BQT%2FI8JSY5Q8QGbjMnVp7RkXsiHCsfbFkkTn2IZPHniQt63Kvvih2s5%2FRjRkPoEi0IMweIwrX1AL9xE%2BNAnZdoCizVlfwsWlxZ5k6TAeL%2Bk%2Fitj69kXl1HHJV4P2Ed7zdr9C%2FlPOTsmGCa26SArcpNobqvVzLMO6qNhhO3htvvF4u7VdkZE9jSDjlhfP%2B85ESU5LpofgzKjjz%2Fj&X-Amz-Signature=65d4ba8c66256a42b33efe15a91b3a762d7b2d4da264d5fb93c1b5a30378dadb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AOCTLIL%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICNg64UGgyvqe%2BEa5nBNIMNQWSLo9VXuN71gfzRUYWrNAiEAgHJb08kl2rjHL%2BX1JVe3ibAoGfjUfYURXKeqCK3SHUMq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDNclHLHCjR%2BczaaVZSrcAyMVbDavvSXoKeO%2F0rKEvKx4deXp32xjmmPx9zFSVb5YWGe2rJmeOAjexozUOYgdixoqgBikG4tEO78TY3Nk2GBkS5QedYJTnVrOIOdeMevtTj8EnNvmByJdBUb2WoHSVJ28NvOaICuL4WTymSpXSdblYFaQacpVdTk7rwDX8%2BiHeEx%2FIIg7ImPOEi6fVeAsccYGZDVJfvly7MsPY2GETwFPs95JOrdzG%2B7rEtakAIGG%2Fb9SmGtLkx%2FObfjU%2BncSODH9Gju5%2Fy3TotkNGB16Q56LGT5dWS1im9Ocyr8ZR3mn%2Fj97OK%2FS5sgjyoAdxV2njqmRXSPsyrRKc24gMHjjZixx81MxbzZwdPRUyRe9tQVaNIilDTGn9w5cAwWNrtSuTxQthtj%2FhiqTuvCyjaVoIilAuVjYfLwahrRv7WS234oEoDg4tI5qxkWJ%2FI5l8Zfk09eMOBmGM1Z8y2tVuTeBXNi9JIdqc8D70ZDl33%2Bypz%2BvzOgEATybVxplxDJCRS4oS1M%2B2WJvXdstYKuQcXeJnnG7xsvahPeWVDJ7rGrSx7TPBMjdmGWACuol5H6%2B4yfF61kvXk9i9DWrrRGFbnWihrVP2wxjKhBiOEYrpJbW%2BhT%2BshkawuZ5SO0fnJ28MK%2B4x80GOqUBgEAWDSO3WOvIh%2BQT%2FI8JSY5Q8QGbjMnVp7RkXsiHCsfbFkkTn2IZPHniQt63Kvvih2s5%2FRjRkPoEi0IMweIwrX1AL9xE%2BNAnZdoCizVlfwsWlxZ5k6TAeL%2Bk%2Fitj69kXl1HHJV4P2Ed7zdr9C%2FlPOTsmGCa26SArcpNobqvVzLMO6qNhhO3htvvF4u7VdkZE9jSDjlhfP%2B85ESU5LpofgzKjjz%2Fj&X-Amz-Signature=c017815897ddb1c4344875dd9d263af7b5a67fd6cdd5b84f5cdb5f4e7cd722aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663GVMPVM%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDcb4jjhNzv%2F3jgB%2F1%2FWligGItoBN21QwbjiEE%2F08FquQIhAI3T8%2BkXV1hrLVHaBhPaXxBKWcZt7gQCZgxPF8zeHRlOKv8DCGYQABoMNjM3NDIzMTgzODA1IgwkpLI6YWVNssPBe%2B4q3ANnQqEcI8gJMEPtaMzpPMaNSIb7upN9%2FxUt7PMQxXTExe6s7jWNRNCUQ0b9BynvL4ySKb8DICWKJBq8ETUCaTRnemaNfOxwtMR64SBwIw9mw9wrr17dvJocoIntF%2FA1sOF%2B2Vec8ZByYK1%2FEYMTggsGX4IuQDYmVyJSrsDgRO59MjVykMpHzWIwNs9%2FBT%2FmFMhMDNt6ANayPuBsJu%2BjDG9uwDqMActHd1rmWoOvgrD%2FtVYG3pqFs8adMYJSPhyGCzehBYGvIzKhCZ6Sj4bvGVrA0siWsXsuqgYZ61dxf2xh6Db0A2r9u%2FBqsITMMHqfrgzowvgSrfJJymjyKGOi9fpoarOVloXrc%2F5nQc%2BWwDLZ6KNEi83QGfYH1RNMGjQXU4lrCQa6%2FoC%2BQOHpG7xvIy0JzXpUPxTkjnbRqEl0a%2FABGd3sRA5s%2FXO%2FOlxo8u7f8lqSGTnuo3RynjNCCnSshoVCk3KxlkrT6bdv9Xff0LDSspLHmTt9zx6ki6OHoi8BIAWxBrk1reKa4vYUKJ6qEIkitABoG8Fhz%2BH4APA5xuSZ%2Bki6OcHbz0pMRAOy0mtD0O9LC%2FMCF%2FgEWOrdlrQb5z9Pb9jweyvJUTnzww6I1XOPp8Hgwl7lsislekILtTCZuMfNBjqkAY4K1vrbeJAqA1swvDFPOrpfwoRqaZyXOLk66WG9KZT%2BnFCcaC5jIzaOq93QkxQEEA4T9EqBpSF9kt9bTG4Q9oZhvAHEIQIAvOCRmXMN1RkWGTnyjwTz80hT4XXHzRTArwJRqNFoOTiaW%2FNAIrYlvHBUct%2FRaDfcf9UJ1AFPfbRNQhA3MbUD05Zth6ikd5mFDIDsE9COd1LKIERW8nyaCyzrJfu%2F&X-Amz-Signature=2f1db8c73f5f43475f47e8ea620b6585a14cd28c7965683d73b34ba56618387e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DMYQLLG%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNHY7tQah%2F5ghlhQXC2ATqAv0mqzvp%2FRkd4Ywx%2Fd%2FHHgIhALv%2FAVQwDP%2BBIfCVnzSFpZVSKdfnsh3HQJTP0Qo4RoT5Kv8DCGYQABoMNjM3NDIzMTgzODA1IgwJokFEHiKXetKb9Lkq3AN%2FCDe01w%2BQz9X1s3chA4GL0UkScfRAhP36Z0l2dZOReLKPmeorsEfqtbHZOhzr%2FTu1MSErSf1bq2BJV5FA0iaa1XH9osn9s3cy4PwDC9jDQlDBrSXaG9p5LZnVrb0bcggYZdr06zNfTFc2D8u6w5nKEUGcZBqkSG16Mjh36BIrO%2BheioIH2ufZK1vT%2BRdV0SpBYZyQLvS34%2BIP%2FESFfWVQK2M5AOLEUHJpnYzXNl5pXoT%2FLd0%2FQY7JkpCe2H4exiLjO%2Fjtt%2B%2BlXsd59Tmu3ZSvZ455Tu%2Bd8DwWATJ9duNjCqqXk4qh%2BM64pJbddT%2B2WFmzb8PmcPgFRf4h9HZgcs1B%2FGbmitvIL6qOktmVurAz7WBfaRH%2BTVNZvU3%2FtpvZB2YZrpS1tkyZqP0BFWgJowIDZgYut9OIiAp93BWmVZPvsIsXS2DopyR3PKwoLih2gPDzHSR6aBjF8hgVfHvIkltGiOly4NdlKSxSI0Ea%2BCVdBFhlo2Nm98%2FnwJ7w6QFZ7vo%2BzITtQiVJ%2B7Y6YK%2FWvYdf%2BBq6bEqIIeMrXkdqgOkim23Rx0O1JlDHjras9yWvv9G1jvtIF6Xq2E1qcdGokCWqCxhN2x34gXhSNZl46lflrfl6DX7v8djU2d2kSDDDt8fNBjqkAbW358AzW6rQcUC4q1Gw57H2h1LyNgfaOXYk5LUMTnmyK0ZKjD2WNZg2WvdCzN5K6YXlkFnhMXwHy8UugJjRmaY3VA08K085EGUj3mVyMIvN00pIHGya%2FUvYn6QHcWENTKIHrVZxmzcnA60sdXCjLGtjC78TOB6hj69GgIjDYKIp5%2FzYa3J8Sw8i%2FuZy%2FB%2BaSzLGWiLspxf%2Bpb7%2B%2FMz%2FmSXOVwF8&X-Amz-Signature=aed3d21b5de63edebb500f5985fb746204987b8149673e4b842101e98ae3f0d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PCTEIUE%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDA8kDyq54hdjh8pe1hFY8oSCKGDe16QspQY1L2V7HM7AiEAm3YNQUevRsm6XFwdDH9eiOMNOYFHur3NjEt8LL%2BRy5Uq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDO%2BM5kfnSbT8EJU4gCrcA9sHZwSZp5G38NjG5xsxKX6cbNL5H37zyafht1lpiq80BVFqffAZ4e2MUcYsV3zgOsUQjjyjlkjLmSoV3zD6wGK1nHNub5DzsnSbX7XWejt9Gy6kgaMe4oAMz%2BHdArCGEguC6QOQK%2BT%2Bsg%2B1pR9a4skM5kLwC%2FmoKPMdeizbrW4QCniIiaJ%2FRf0MRUSaNry4zbyGf52WIIEOz8V%2FT6oEndaG0gMa6W0VKsY5N7Vds6opI3q0crDFtDTAcacsmf5WI8gssjz2O1MirsBK1Z5IYkx%2BckYm%2B2Giwn9gyFhyC3g0%2FFYzHbiD%2FoFfduXILNAf9PHypPVWLRQdGjAPtL%2FLxfTZ32R6GIYRhi2%2BE0xCVsezZGrHqdy3Mduqfrm%2FTFEoUJEKOp84pUw7fDDHp8cRct3ijRqkyEZ6qwttyS1TtirMam%2BDDqGaZe9RVHxktCPzrsq5rb1DXQPOTTr1LBTu3%2FSs%2FSHbtPVkVPufn7VUgfQxR4S8WZtm0zYqtEGiZvB9bqEXuDaliGmr4qhq71zTo4e%2F6Jv3Nd0yegiQNvJ3fmFw7iJSyBkE7VuPRR4ZcfJ0Nd6E3qHqtBsnqr5loJJrv2zInoQHR038SIsju8NK4eIVIam5wAufhXfHCmdUMKS4x80GOqUBGvqFaDz3tiz%2BZoFr8f6gMvS5GbkTniizRZbaG6o8AdpqOhwYEkjnjySdNRltjQCrgw66ej2axb6FWsv6doyccmibrAEbSFnQXFz686QwaamZWwG1K36ieRf%2FPAsyNK2cTMC%2Fn5Z6JfwN4PmooLWM0cY3dHP3ixGOX4YESEgEksvR2GecIfdkxkQZHANLAb511VD9P1gAGFmYhzlHwgGvHfgtNcxZ&X-Amz-Signature=65a1c2b8491ac900e35b8ae4f2c2228b168425fb98d4a2e2fb5257de5eca949e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQEUDBIL%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFHWXcXeBdwd8ceTeYWbPmA2VVUNGVHNX2rF2GwxzwBwAiEA14Mzn%2BGrbJedo9colGFtH%2FacIkLtoJvP63m7J0C1gScq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDKk6za1TH8ACUpCaWCrcA%2BLgmDA3xABfJ8tcGjFL0eWp8Ymyydh8Pdx0Nyj42bdmtaHL%2Bt5NOQR6JDsf6Kj5Le2NRK3tncJSjCbkiTnjha9lFZx2e38759o5EvK34u9kzPxbtAiZtf5pSFCtt6B1wxRdXpUoIJ4nlOPinJyoflZeiCu9XtZyu9qAaucDGXrJKQR4P5ILKmXSSeYabCgV6yhnZwwunxQkIEZzFeKmIZ0xoZi9Hmfl2ZGQWkXP8PN9k4ygsHIfOgRXVAXUKP0QOZZfNeawUnCpdlzpCGMv4Ma8O7dCP2dOSJVwHpXU26LWgdcsuhLvfqg7V0MF4A9Xfsqz15TxnKQ2JxcbrbmLgpSvN%2BnKIOy6URtdNQ5rySVZ973FWnYSJpGv84Dp1XO%2Fc%2Bhhi8LGZYh6qUt%2Fv4PE%2FeFCXQh62ngkySYHTbYuoWq%2FYksqdmChdnX7OkfjWWA5nxjkmgNXjWlmiEbzKEAVyYrfJAhHAJT%2Ffs7K39nL6rMnhg0Luy0xhoHuF3e6%2BUzlps3Txnps%2FgQeyo2A0sWYZnYv%2B6rmH5dRGB08lBpQc22Lz5mESSg9JHIH6B1DHSx5AhAPC4Gt3uAJLGRhat8bgt3fmFJpxgZm7pITJVrE8Btl8BODEBTF%2BYAIdLk4MMG3x80GOqUBfWx2Y5b3kYXnDlqZTRFdMsuzSLFvpS6FOYzN5TSdps%2FPUsEwHnJ2Z2thpB1RZ7qQkTnTh%2Fxg27yGgQyE8DclCsEQYwSuZ21r01JJGiy%2FT9TziYdm1mkuMfl1k%2BMxWmLSRMirzyQFXFnMY%2F%2Fwq%2By1Y8wDECEUdbRnL4jnLYNbJj6RC9lFdENMhfJWyfF1CxOndIv36hUOL7w%2Bx3ftpHeuIN0qJ2Up&X-Amz-Signature=6676911b3637a24e9e6718a4e21be03a6d8288282df64f3d3741320e85b3e0c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQEUDBIL%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFHWXcXeBdwd8ceTeYWbPmA2VVUNGVHNX2rF2GwxzwBwAiEA14Mzn%2BGrbJedo9colGFtH%2FacIkLtoJvP63m7J0C1gScq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDKk6za1TH8ACUpCaWCrcA%2BLgmDA3xABfJ8tcGjFL0eWp8Ymyydh8Pdx0Nyj42bdmtaHL%2Bt5NOQR6JDsf6Kj5Le2NRK3tncJSjCbkiTnjha9lFZx2e38759o5EvK34u9kzPxbtAiZtf5pSFCtt6B1wxRdXpUoIJ4nlOPinJyoflZeiCu9XtZyu9qAaucDGXrJKQR4P5ILKmXSSeYabCgV6yhnZwwunxQkIEZzFeKmIZ0xoZi9Hmfl2ZGQWkXP8PN9k4ygsHIfOgRXVAXUKP0QOZZfNeawUnCpdlzpCGMv4Ma8O7dCP2dOSJVwHpXU26LWgdcsuhLvfqg7V0MF4A9Xfsqz15TxnKQ2JxcbrbmLgpSvN%2BnKIOy6URtdNQ5rySVZ973FWnYSJpGv84Dp1XO%2Fc%2Bhhi8LGZYh6qUt%2Fv4PE%2FeFCXQh62ngkySYHTbYuoWq%2FYksqdmChdnX7OkfjWWA5nxjkmgNXjWlmiEbzKEAVyYrfJAhHAJT%2Ffs7K39nL6rMnhg0Luy0xhoHuF3e6%2BUzlps3Txnps%2FgQeyo2A0sWYZnYv%2B6rmH5dRGB08lBpQc22Lz5mESSg9JHIH6B1DHSx5AhAPC4Gt3uAJLGRhat8bgt3fmFJpxgZm7pITJVrE8Btl8BODEBTF%2BYAIdLk4MMG3x80GOqUBfWx2Y5b3kYXnDlqZTRFdMsuzSLFvpS6FOYzN5TSdps%2FPUsEwHnJ2Z2thpB1RZ7qQkTnTh%2Fxg27yGgQyE8DclCsEQYwSuZ21r01JJGiy%2FT9TziYdm1mkuMfl1k%2BMxWmLSRMirzyQFXFnMY%2F%2Fwq%2By1Y8wDECEUdbRnL4jnLYNbJj6RC9lFdENMhfJWyfF1CxOndIv36hUOL7w%2Bx3ftpHeuIN0qJ2Up&X-Amz-Signature=7a6a362c9e416f1881e9b4392b05a9a409fb900e3c80947d4d49aa4030d4de20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MP5SMTL%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID5UGIvxTm2hVyFhakhPLdY%2BqyjO%2BxprCQpJ8AHDVVRiAiEAmS7thDfw4I1kMQszBFn5MBAqn8%2F%2FSRlIb6xVi7QCe3sq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDNzsq5Vf6Qi9pBg6iircA3B8b2HRcn1sdvc%2FDS3510ok0kX61UbjsD%2Bw%2Ffhbf%2FsQ7vABcFW04HH7zk1CZ9oEe0r5Plyxpl4fKvXx36EMUngMJmZC%2FJj7rE4AnrAXZNuWBfs2CPcvPDWmRehRCs1yKfzj8NtBV0znwoh0ZuC4RxAZ%2FzmJMNO6EcLs0mX1IouUktRp%2FdRJa1mcVFwNKq79rDLKDkp%2FFfT%2FYJhv4MUBnfyWWwg4PnWn2nBdgIWozWU9qV6yFCoq5%2FwUIIMDQRPRHB0J5rN2SQVIJfDNi%2F0ghuuGQW4ftm9BVR0rLAol%2F2%2F69vAAf9Djq70sfZqZur8nd6we%2BcxVIgaMKmAZbZ0w1YsZwkEYowcYPin%2FA43o0NJlVQeDUZfqvVu3%2Fv%2FEj6Lu%2BkZFEBSc1xV1YuZV4aN6yH%2B0f%2B%2FR5yUC8mAGm9YJuWWDYproH5v%2FK5WGfN5xVjI0jFhF8Ys3hT1t882eJwGsk1c%2BzgeEhq0QQX9SLAJST%2BgVvc9%2FJmicwLZp2CeIfFld%2FBwVe%2Bo%2BPzI3IZoddFfQ6FpCFiPymhsWYEhLnqV%2BllQUFEKelmts%2FDTsoHbWsyAz0NgivdrZ3sLTskMgrPnIcMLVmDCuLfiYW3nC5lvdzWOR1IoAImPH3fNIVWhTMNy4x80GOqUBm6kQyJJvkNSf4KTLsma%2FOudG2%2BKnKZb0v%2Bx6RRpRTOhnWrkuZUMXx%2FN2a2%2BAAH4kSmKnDRFs15htH694kvFJO9%2FvOkOF74hpwux0DaNH0Z7n%2FuuPZgjRYb0VLAekuGdYkZgvz6Qe0tWWiropTVYAuUz6Q63ATQK7DX4LQCEHmB9SuxpTKx%2FGWWC8xNCE1wJAwBMsTSXJxXJDgTV%2FrZQGr65xY0Rs&X-Amz-Signature=7c2c2573a1b2a66cb18e803f535eaa06ea3174f7e04d5d84cb4ffc963f1f007f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKSPIEBV%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDEVL9WMJpK%2Fy8LuvKik9ugjdvOTWk4HahrIj%2BNbBZ%2BswIgd3ZqiVepdsywjxV%2BC6hnGe3GE8WBFvvnQQK77h5ct2kq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDHE9Al%2B1C54Y9TObkCrcA8m4bwfJ7On%2BeOfDs1XZzzobwdV3ITKi6Piv8zWFhd1YOKTK5t1UPJE5xZ5z1xJ%2BLyTJajZhJzmBTOuiuP1rJW13j1cGeUhn5ed8TkAa4RfMx5vXNr8BQe8qBAyrLY7Q9Kx6TCdmCPee5wi5JePMLUhJRY2hAe%2B2xp9CKMceh%2FWNJhg0bNQnQuhObysacildl4rwngpUjBnJqtEWWYyAHT3Yyv39lTEH5mk6fJ33ccjgvQMtue18YORKEiz2kYC0yIayLCpqlO2o1cflVQIQOBL0WGJvXjLUTCeEKE6EJNyMUV%2F26bpfhiik288zRk3WZUoEGw4NGvIbN9yr13rcSwKtmRmKLCJm9cl%2FVSPr0WPv3KzYsv2D2rDfzCRPoVQBeGOseOIw%2F7A9C0863vrdKEP3RjRZA5AUy0ofvBhp%2FiPomW5Gw36Xwn5u0Jftdkr4lt4SMYI00zadHiMH3V2JOb3xl4SAq5V%2BK3FczlyBYVqbA14hi%2FYB28nYYK3JVFv5PAmbEzLJJXptwTpMKQFDyBAm0eZAfq25tWpmwbc%2B5PalvIB1uewoDC0ZAKN8w5YxWFAMku2Z0hyM6RZBlHrbNi%2F4qJrfok315nhQ3kOlaIPaxdB%2FWR4sbUBUCWPaMJ%2B4x80GOqUBSBfjAEuMTxp4g%2BWtxtWvPL2K1nKsUKvVrYVhLyjYiindFATeXOIvYpwnETnCJNsMlt6%2BVrbf2Z8KWdgqYeu%2F1c8bO%2FivtJYiH%2FJ9JsLSFmhis8JMvSxXZ2BnEYB8POcZlbR50mrC3ONpyRb0TsfnZiCEK7%2BfOelI%2FxUSi8Je%2Fp42pvK7%2FDlkg3%2F7l3HonXFcJsGIPAjKsTyP5ELL2tzFhnFaWF4F&X-Amz-Signature=a3ea724603311e64deb966fd33a2c2cd97260172bd6dddbeb5c6e06c919a8db7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKSPIEBV%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDEVL9WMJpK%2Fy8LuvKik9ugjdvOTWk4HahrIj%2BNbBZ%2BswIgd3ZqiVepdsywjxV%2BC6hnGe3GE8WBFvvnQQK77h5ct2kq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDHE9Al%2B1C54Y9TObkCrcA8m4bwfJ7On%2BeOfDs1XZzzobwdV3ITKi6Piv8zWFhd1YOKTK5t1UPJE5xZ5z1xJ%2BLyTJajZhJzmBTOuiuP1rJW13j1cGeUhn5ed8TkAa4RfMx5vXNr8BQe8qBAyrLY7Q9Kx6TCdmCPee5wi5JePMLUhJRY2hAe%2B2xp9CKMceh%2FWNJhg0bNQnQuhObysacildl4rwngpUjBnJqtEWWYyAHT3Yyv39lTEH5mk6fJ33ccjgvQMtue18YORKEiz2kYC0yIayLCpqlO2o1cflVQIQOBL0WGJvXjLUTCeEKE6EJNyMUV%2F26bpfhiik288zRk3WZUoEGw4NGvIbN9yr13rcSwKtmRmKLCJm9cl%2FVSPr0WPv3KzYsv2D2rDfzCRPoVQBeGOseOIw%2F7A9C0863vrdKEP3RjRZA5AUy0ofvBhp%2FiPomW5Gw36Xwn5u0Jftdkr4lt4SMYI00zadHiMH3V2JOb3xl4SAq5V%2BK3FczlyBYVqbA14hi%2FYB28nYYK3JVFv5PAmbEzLJJXptwTpMKQFDyBAm0eZAfq25tWpmwbc%2B5PalvIB1uewoDC0ZAKN8w5YxWFAMku2Z0hyM6RZBlHrbNi%2F4qJrfok315nhQ3kOlaIPaxdB%2FWR4sbUBUCWPaMJ%2B4x80GOqUBSBfjAEuMTxp4g%2BWtxtWvPL2K1nKsUKvVrYVhLyjYiindFATeXOIvYpwnETnCJNsMlt6%2BVrbf2Z8KWdgqYeu%2F1c8bO%2FivtJYiH%2FJ9JsLSFmhis8JMvSxXZ2BnEYB8POcZlbR50mrC3ONpyRb0TsfnZiCEK7%2BfOelI%2FxUSi8Je%2Fp42pvK7%2FDlkg3%2F7l3HonXFcJsGIPAjKsTyP5ELL2tzFhnFaWF4F&X-Amz-Signature=a3ea724603311e64deb966fd33a2c2cd97260172bd6dddbeb5c6e06c919a8db7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7DWNOOP%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T221458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGox4QWpmIEk411LaVYS61TM9X%2FrhJnZn4nvjnKBCXZBAiEA5TSCwanR31155yfVk9%2FuwXWCLZcl%2Fggopa1856EYaYsq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDC1uLPcdWqAj9Lhb%2FyrcAzUJ0Yr0KyeMDAehIMVPmk%2FgvMgqgf5TB32zdnVMlSoxFWkYQyxkM1t03VJOfkrbjhPMR%2F3b6pNbSITnYGRM9sGsRh4WItXjeBQ5uU5MIzg49O3EaC%2B6KnXHhHUGYpFVYk7w1aFeXRTKFjCSKbvmNPO1oCq6wJ%2F9FVPT3PHiWimPQRS3gW8DqNB26K42oOCYLKnuQclpaqWJQHowOdwA2LwZ10LxFgao6JVxoYIF%2BCCUVQMCW0lDTDAJA2jkCwD4QpDTCJDEYDvOOd00INF8lNhWPHM290FwNfJi4aAQe7RqNohkBST4kepalOuRGnEbNKd2KofVJUEf3JCYnVo8ccPS2lR1Rs57I9hHaNDBAHf8IKEudHTGrUqf%2Fgs6DeULtpjwKEMExaEb3zmMtIS6Kp6pzpyiAUFvDWQrXCCLPXlobOQqvQhutUe0PVfJgQ%2Bk3s7vleoG8xxUYbt6pYaK2E1hMzl7UHr9jXSp1XcS1vyiO2%2FeGiemybw1X5W2sLWvyJ8h1xJtWbxy%2FDpe61PBCViLVAtF5jOWjC%2FdCOfYN1po8eSeWe4GaRpRxJBQKHyckszcG86oxx1lawuSmvdSbrKc9XQs9ry5MkOkXLkwh5hJxl7M8Zmu%2BlQ0iBWXMOG3x80GOqUBsm5UQzJlGOWrOd52Eb1Hv1fMf7mISTnhK3mYVf6z8qVD%2FfVtq9NAT7GPmcpQ4ImNoNXGhekYcAYZz2%2FsYQrU0M2%2FJAxJaZsXgVsgXWu97SBB7cRwQKu%2Fo75%2FeCDU0RaIxtskW33ecxU5ttLaam8wUkcmjX0dC%2BMuX%2BBN%2BZQW7XMOhywXTBuIYBydvg9YdeQ909naGbl6xs6leQij7ycdof7fOO29&X-Amz-Signature=e60440cff2870f439368aeb41dfc0df8858c1dcae375884bb9e36f0737dca0cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

