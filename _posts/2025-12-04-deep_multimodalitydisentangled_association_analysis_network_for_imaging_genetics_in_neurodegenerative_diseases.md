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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BDQKF4F%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQDt3xpNEJ2SMVrYk5Z5iELUQUSSwpGv0%2FVl%2F9wK031eKgIhAOf8U8vUEHN%2FeZa4qsezdwlkZDmFckRQnYADIFdwfMbXKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxjUiUaPt%2B0m50YG30q3AOoX1fZzJjJN1oRKy74t57xuniR5UvJVmCHWaugEWVEYzQEf4wSbH7HQ1eKzF9ESHwtq8PHrNe3TZYL%2BdrMw6r0aGDvc6MiT9Sv%2BbUoBuQlsBzq98kEMdSQY5cuwuu3oqp73jNChTy%2BcIiJYD%2Fljo8HKoB%2BwFeSQgcLfTYwAMceq7WOmwhP7oSoKWKcFcSiWSnkmLLjssPTDtJgUzmWmRO08AAwK4QxqVaBeKkplqlRFs9mCZNfAGlViiXhhwuOFRbsmj3RGofIDBsQvbgyg%2BJHL%2F01LWVAdFoIMGJaTbJJbyQWOzUfh8BEBLMgrltsyyaI3gdLxjetIyPgNFGg2IaF7hJL%2B5UvoOp%2FNs1KuuT6pjh2VTozUZ5GUk5KsZXnT1Wl%2BPwZsGAPlDAQxPG%2FMIjH76AsaA%2BMX2hFPAXuYe0ZjEL4z3zUmGO2gC%2BA4WbA6otBPMpgRMJC1s5SskUbO%2F1seeB9CSDr54j4LPDe%2FHaUTKViMyYIZfl9u1A8FqitF93rHCS%2BNDke1joXg8EcNGChsdUfCoAMNGV2s8erq8iI3gxC8Q5D1m7zgBOcT%2BtXqfWdvcleLoX45u9MJTZjgCNTwPT2T1M5AnMAomwyXWRTsj0dLTg0xCOMal8X3jDS0uPNBjqkAcXJ55uLfCLCHx9u%2F5RE7rN12icNY1fc0EkUeTmKNglJflIqdZ%2BjCLVFIMklf%2F0ioAx%2FGjhNBDui5lecS2WUmtO1LeUDo%2FCxQXW9%2FO9NDv%2BxN%2Fuo2rbkOVjheO%2F%2B5iJ9jMO8KUfYdn4B94z%2FqQK8aX%2FQO%2FZerNZxp5iB%2FrJszJ7Ax8u652KW4rjB6Wvb8rRboen3Crg1tLmA8Z2UW3UEIGYbGIvw&X-Amz-Signature=4d8975ccfaff7cf3294f11565ee349cd2b26d1b06a747ce23568ef225654f0ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BDQKF4F%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQDt3xpNEJ2SMVrYk5Z5iELUQUSSwpGv0%2FVl%2F9wK031eKgIhAOf8U8vUEHN%2FeZa4qsezdwlkZDmFckRQnYADIFdwfMbXKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxjUiUaPt%2B0m50YG30q3AOoX1fZzJjJN1oRKy74t57xuniR5UvJVmCHWaugEWVEYzQEf4wSbH7HQ1eKzF9ESHwtq8PHrNe3TZYL%2BdrMw6r0aGDvc6MiT9Sv%2BbUoBuQlsBzq98kEMdSQY5cuwuu3oqp73jNChTy%2BcIiJYD%2Fljo8HKoB%2BwFeSQgcLfTYwAMceq7WOmwhP7oSoKWKcFcSiWSnkmLLjssPTDtJgUzmWmRO08AAwK4QxqVaBeKkplqlRFs9mCZNfAGlViiXhhwuOFRbsmj3RGofIDBsQvbgyg%2BJHL%2F01LWVAdFoIMGJaTbJJbyQWOzUfh8BEBLMgrltsyyaI3gdLxjetIyPgNFGg2IaF7hJL%2B5UvoOp%2FNs1KuuT6pjh2VTozUZ5GUk5KsZXnT1Wl%2BPwZsGAPlDAQxPG%2FMIjH76AsaA%2BMX2hFPAXuYe0ZjEL4z3zUmGO2gC%2BA4WbA6otBPMpgRMJC1s5SskUbO%2F1seeB9CSDr54j4LPDe%2FHaUTKViMyYIZfl9u1A8FqitF93rHCS%2BNDke1joXg8EcNGChsdUfCoAMNGV2s8erq8iI3gxC8Q5D1m7zgBOcT%2BtXqfWdvcleLoX45u9MJTZjgCNTwPT2T1M5AnMAomwyXWRTsj0dLTg0xCOMal8X3jDS0uPNBjqkAcXJ55uLfCLCHx9u%2F5RE7rN12icNY1fc0EkUeTmKNglJflIqdZ%2BjCLVFIMklf%2F0ioAx%2FGjhNBDui5lecS2WUmtO1LeUDo%2FCxQXW9%2FO9NDv%2BxN%2Fuo2rbkOVjheO%2F%2B5iJ9jMO8KUfYdn4B94z%2FqQK8aX%2FQO%2FZerNZxp5iB%2FrJszJ7Ax8u652KW4rjB6Wvb8rRboen3Crg1tLmA8Z2UW3UEIGYbGIvw&X-Amz-Signature=4d8975ccfaff7cf3294f11565ee349cd2b26d1b06a747ce23568ef225654f0ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TTGDJNJ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCuH4%2F8ldEuXcu225zk%2B2JTd1e%2B%2BTAuQxoH0oIlSy462QIgabeSAmIYBq0LR4WwZKqJ0vyy6zcRoE%2Fy%2FAseDFDa7PsqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOV9bnhyzH5QvmrNAircA9%2FRpPu51QdGE3fYocMoMJ4a7z7dWNN9mLHZc3IQdZusCrIPcwxZ72mJhGzwARn4RtOomfASzqydYgFd6gdb5qxJ1aefQCJOjlbRALpqH4zepNEdi5ZIz4DVOT%2BW5BNDGwRoSh8bnGIp9QYCFdyndQGnVAy6t1NLRouGYhR%2B8%2BQjPLxp1W3QnqaYGjlEW0IPyDlKXRf%2BssdwQU24sPalreFrtg4WIH3g%2B%2FFKGnROiM0sPwrmWzKeuC4ubCZuTzjwp%2BuXIPAeBP4oJz438ZxPdfAruu9cTuGU8HaIEvtByh4CLCJX%2Ffex2Bc25vLHai4%2B9QdPcmHx2nfCUuemWjKu4zNzO57rtf%2BkQX7HVAwVXhCbRLT4PiiO3ba23BE4UUcoprqOC5pF8LVleVgORcLvrXwQQT3CxO752l2cU3lATZNfzr%2FXlayKuh4IktODPk432DnGfD5ADMba3T96iSlzOMesMNNPnMm7NVNp02Q4rghwcIDbIHWJsx%2FZMGrC07Rtjv5Qq5pbwPTRjSMHYczAUYEV%2FR%2FUxe7mLb5Dvb5WMu3DlmXJ%2BIBzbj2jISAnNP5OD7Vl%2FwdWTNFfMlbGpmTAT8M%2Bck4iCdANbc5Dge8RSWpQ6TMk5taTHAixTyacMM%2FS480GOqUB8LQKHllocPlLV0RtPZlpkOqxjNdFfkYsdpT1BvimZ9dG1CG62V2qp8sBXc%2FEV8NSXgRdS2UyvgYXMaGjyMjwI%2BJDRkQrHnV%2FRLd4z3q7RPeSdRts3%2F1013gN0MHpJGJ3GDWgDF0x8iZJaS8kdcVuh4nNKy3Hckxn8PW%2FPa6IdBAA06lGKEuTSYIOn7Hf4ToHFJOiEfBM1ncBIGkRszgdO5ydHPiX&X-Amz-Signature=507403f94d11925ba992171c00db9950b7f3e834ee343f20cd3501f3063c18e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTQ46MDQ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIA8JVYM0jWqrpLe7vecTOpIBuExlvgC7xGA9sTDYdD4kAiAwfr5%2BcrptuRO6pkCclq%2BR%2BS9F7WN7ZulJ1vRPQK2JmiqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2F3wuUYbt%2Btj1B7SwKtwDVIiZm71%2FMo0ycYSDkBH9yBYCPsxhPSC7RHUtEQF4YYDZXk887bFwCyN5V2q40WFp689nPgk83FQNKT1fzN%2BFpt4CRhL7s948v8BX5z8IcGDdReF%2FEr7XiSIui2tSw6%2BNoEM%2BzlFgSRWrtcLyY9Flf6F68n5ZLVanzkDPrAJ2dnb9c4klENzrXaCjPwZ%2FzkEiu17hsTkEYleah%2FGIgU4gkxs9hGn%2BBw4vFDe68%2BcwlmqaUqy2rxoZZoz8So8QAMWgKWn9Phq7FTnnF5tLgBkwhespJT4hlfMnWMQ5vzM1SVtFm6iKXAp1iMLFICbSRQ2PIXooUTsvewNRYyAZoqxI7P5qUTLo9PDVJvflSOQ0QjwIi2lWRvkGmYrjxxXoS%2BfcOLsKOxbR%2Fhecq009GB01w6Fkt4ws9nI1%2BXdKPBoFlfnG3Hhs4%2BXmuyHqGCZjyLJ8zEoK3UyoX%2BGwH7134XMiBDGyAn2gZXt8kZrDn8T4HeA9H17pYyKfl2jNEJjSGMi6h9inm78l60BpGmIn%2FCXTSk8HNGMBx9PpQEDX0symmeFoU8mtaCXHK%2B3eZawITkDCwVH1XxpsoDD7DiX5Xe%2BOIqKdFL4PXqQSwuOfTcJTaWoPd8e%2BaAwss5Ld%2BuYwldTjzQY6pgGgoywJNvQUks%2BVrAcp6A%2BanGuAOox21XhfqeNQrZ%2FmR3NPm8j0YAJMln2Aht8lcWqSISkuOC5TF2RJfy3XWYgdgRxQimS7HnCTD%2B3yKzkdXlyJYAgBhgCETjo3TyMIdFhJOcjzHuYOHHYDBTIEd7BrpFyPUXxvf%2FnwHNaCc62JJ2RXI0CF90YlQUKFMP01G%2Fwo2PkdjHnKkrIqyoNu%2Bpnb0g3El%2FR%2B&X-Amz-Signature=e07a851a3db361fb706bb8bd308df85f99d91b3e0165ca24956efec0b0a76501&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTQ46MDQ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIA8JVYM0jWqrpLe7vecTOpIBuExlvgC7xGA9sTDYdD4kAiAwfr5%2BcrptuRO6pkCclq%2BR%2BS9F7WN7ZulJ1vRPQK2JmiqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2F3wuUYbt%2Btj1B7SwKtwDVIiZm71%2FMo0ycYSDkBH9yBYCPsxhPSC7RHUtEQF4YYDZXk887bFwCyN5V2q40WFp689nPgk83FQNKT1fzN%2BFpt4CRhL7s948v8BX5z8IcGDdReF%2FEr7XiSIui2tSw6%2BNoEM%2BzlFgSRWrtcLyY9Flf6F68n5ZLVanzkDPrAJ2dnb9c4klENzrXaCjPwZ%2FzkEiu17hsTkEYleah%2FGIgU4gkxs9hGn%2BBw4vFDe68%2BcwlmqaUqy2rxoZZoz8So8QAMWgKWn9Phq7FTnnF5tLgBkwhespJT4hlfMnWMQ5vzM1SVtFm6iKXAp1iMLFICbSRQ2PIXooUTsvewNRYyAZoqxI7P5qUTLo9PDVJvflSOQ0QjwIi2lWRvkGmYrjxxXoS%2BfcOLsKOxbR%2Fhecq009GB01w6Fkt4ws9nI1%2BXdKPBoFlfnG3Hhs4%2BXmuyHqGCZjyLJ8zEoK3UyoX%2BGwH7134XMiBDGyAn2gZXt8kZrDn8T4HeA9H17pYyKfl2jNEJjSGMi6h9inm78l60BpGmIn%2FCXTSk8HNGMBx9PpQEDX0symmeFoU8mtaCXHK%2B3eZawITkDCwVH1XxpsoDD7DiX5Xe%2BOIqKdFL4PXqQSwuOfTcJTaWoPd8e%2BaAwss5Ld%2BuYwldTjzQY6pgGgoywJNvQUks%2BVrAcp6A%2BanGuAOox21XhfqeNQrZ%2FmR3NPm8j0YAJMln2Aht8lcWqSISkuOC5TF2RJfy3XWYgdgRxQimS7HnCTD%2B3yKzkdXlyJYAgBhgCETjo3TyMIdFhJOcjzHuYOHHYDBTIEd7BrpFyPUXxvf%2FnwHNaCc62JJ2RXI0CF90YlQUKFMP01G%2Fwo2PkdjHnKkrIqyoNu%2Bpnb0g3El%2FR%2B&X-Amz-Signature=91f3e1549bb3def0e4694448ecc2d211a5657c1000d1e96e7720716e7c211b4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUWDZQNV%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIEdj7t8aYFYXdZTfNIgqn7jwwMQ3sRlSX8Ei7CWqnmTpAiEAmcFnTWVAWA1kFSoNVml0jBtAl4rJdkOwbZVCclsjDGYqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFAXEodX9geAGqSP6SrcA8duUmyDxzY2aFbUfeJfRBntfsdfzhzctpz3Hqp4HWTJy5GkII3ADI%2BDmELMkJDokbqiQ1IOlMISrTL%2BsOq3s8%2BpOOj95VmqxMhbliRcDJx%2B6PnWSNmmDTSvz6%2F%2BmN7AfGJPAiZldgIB44%2B6KYUYj%2Btu%2BO5%2BYAH5r%2Fq09QCGjRTP3ZeQYjaETN%2B8RBrIiQ%2FWMStSLbEwPXcymQ3UKZ%2BqGaC30kEJehxFNEOMlA4L5WJ27E%2BDKH5tgHLOVmcIHUSJyBVqOkkRKttwKwMsjBrUE586yTJcsgalU6u7Cx%2FJAKWKvACfF0d%2BLDqn5qCQVg4QKqxcQ0jPm7LL%2FI8AAnLvurggmQAfQcGySsobLZ97iqpyTTjk2fy%2BdTajyCGPiCxD3tNUxbU3ztNgxrVc8Kwv%2FbKtmb9FX1Z%2F%2FCwsLQPBgfXjbNHFDVHj5gzltHy%2FppFw%2FWbTbNeA7unzOdfvC8jVoBZ9Gd%2Fp1E2v9rbNoPB9a0RzxfefRLDpbSx5Zc08N5aO7Q4%2Bau%2FhzmAFvEWDx2PDPIt6hvO9Iyg00Fy3byyh03EwcxJGZ4Sh2LJpOheaadEMHIC2VhUuOHC842TRew6PNumaKqn%2FKym%2BBdjNd8XsLdF9PXDQfBtJbxxVmD96MP3T480GOqUBYPQuXmNUyG6dGlXUItaOpZis49IIzHOLMwSyWr0SjD3SZynps7DSGvjPUJEt6pUwBaE25pIdueB%2Fobqtp6WyhU9c50E5%2FKrE%2BoegMkXWGRObzEIwgvx5SfJnhBvShADQQhIe9WJPdTw2NNGjJZzz4%2B8VkgUhTJ7Lhrqh0HnmHTXZ9uEplQXEk8FL3ZXScE6J%2BAkJ%2Fpyjn7mWu2gIWjaRyMrY7wB4&X-Amz-Signature=c67770d8580b40dfd752e170180037a63ed2530eaff93ca321149d86c38f1884&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWGA64I4%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIGyUJ5bD8tX6M5NuXkCPrPubSElfRu3ZDngLWYT973ikAiAWOUbtUOeTvUTteuvg9orZkBLwsV9oydldcdfA4its%2BCqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkS6Zjy0Zo2CT8ESzKtwDUuu9Y5UgOY%2F%2BF5BiBGv0PD%2Fqtkuz4%2FSAw0P7rFpYI0kuLBS3I3epXp2SNQ25Ri6Iw5%2F1ciT3hOaI3NaTxdpmDEghy9S0h%2BRHAY1pdd9AciKHUf%2BxpqrSz6JX1vOqf9WMZpYhnzgCQLZr8cSMnfqLl9CTYhcwvESJIBHnPfOwxCiOuHakdkF36eK1Iv%2BK4fs%2B%2BtePUvOI2q3j0GRY%2FsGggBvK%2FN2sgA4C6GbcEfYEFliOjcGdN4FbQfBDbaxjwADEt0nLA5fccO8jli7O0pIzAxo7MTBvhGOSNSoo7m1KEPcF5GLmTleyQUseOEu0boXoY6Z0W8YWJGM0J1GvAtLklKp9wdfIr2m3Iw7w%2FtvZZu5El5h6N9k7yuBsBR8llaOzTZOdiFNRkdwINh7x1DyB4JYAY1sPRIv1ycqanNz2GZ3CiQtVNuomZ98clvsSq7ziAyENjx88xQ8El0CRMI%2BnUvurMiW41LMU9POSl%2FJj%2Bk3vD67Zj8u6Ms2L8MCDieLPzeW32INeYic4N3HHfgWGc94vF2T9%2BKShHtbaYLHC1sycWf4ITeDYtUlMgpm8iFTFryMChf7B1DzR2K85f%2FQysQQ6VWHUWJFQirB4%2BJHedJt9lhM4p%2Bdqt4T%2FinQw8dLjzQY6pgHavLJAXZr2Bc3dGhQ9iR7F%2Bc1fcoStpo6UNbX1k27gETEPwumXiTMESuiw3A%2Bwbu%2BNhnmD9hlz0noJ2IncFl%2BXl3L8A1ebj4D5u1jQFSC9Svlf2TxsGQDHiaROfXK0Zf%2F3sOF8HYcR65fqjFWIATzpTzS091tYRED1begzR3o6560QrN0wgbwWbSsDn9sqjSKrz3SL%2BFy54D9CgwywQU9pPrKhDKY3&X-Amz-Signature=7a6a2dda9660de1285c55eec7d22ba80ca3428c7b0d3313b8f2b6ee57ae77a5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NMPLTPT%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCMgkq3%2FX47efINTiaR0PwESECogI49QaJur9%2Fg5%2F54nwIgdmExXHP4zfelG4DkCnflPWNy6PyE3if7sLM%2FHB7ZoMUqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE0eJykJ%2F1eJ2DoA2yrcA8oeEPR%2BJy5dv17z40fSNx3guz7NVCsoTnH3uJZpIGr9%2FDkcjrHGoJ85HUY46zvj46F7cuhmIBIkh9rQWzygixLPHgYHv6IBfaj6l6npVaPwOdxv9HZBBc7Mc8X9B%2BXHLKlx%2FA%2F2SSGmY80QJfppEA3gadMVoAIatS213axBTVneGY6eyrv1bg5i5jNhwUHhfTzB2dPIrwbn7BlCsFqNvrqRWX8giOR92uHWgNTz7NF5lV%2FHBii1aEJH2wzOeaYApX8VZAXw%2BdDhJMsSKeUaTcsQ7BQdQkgtX%2FIf4RRoBTM2i10j3AqGI5%2BOW2vp1f2kQdoqL4xqjmxgi8nA40YFEnn%2BjP6aPJtu68gXtxqOn%2FMXu9j2LWOUHdq1%2BD9au9JR%2Fu9iNo4apkU%2FVHTgmvtZ3Bp5EocnsL%2FT28yCxY9BK1bnJHGjF2vi5ZqaQA2zatLZEuAROMOh%2BbGnWcq%2F7wR25QmdnBL8w14JY6fYM%2F82g84Ss4gM4HGPqCvtw9HTKY5%2BZWWGhjOloABlw1UuSaJ%2FEP7jT6DFupkU%2ByUL1OCs%2BUNjIx%2BuzJcJdIuXTpDA%2FCGhMFMxpwL%2BwrJuYf3XfwYewPN%2BuuDSGhgeraBpX65R8uvp9izC8ghE1ELh20nBMOLS480GOqUBk5jmfbIr4DXBo17GCNQ94UBqfM7BvVIBIK%2BcDa8k1fI13oXMRCfq8o%2FX%2Fp7Seh%2BC6Ya7KKkYAuGQ2CIwTvdZrPnKj%2FQfopLHdn9l%2BNPAdYu396DLqrSrzEZJMk4Qogj%2BvJWD%2FWmITvMpvLxiDv60%2BT8Ls4PK8qQHjgZjAqaeGtGaJhflQ8DX1VG3k%2Bxzu4uCIHMNAfPXQparIktWmopERg1YpRXO&X-Amz-Signature=05f4df28e71983a4e858511f9123df3ce1b5bbb4ef21f1c408971fe8a2cc243e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XG4WO2UL%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQCQVYgQnw9lGhuSIrmRVjgKY%2B9RC6f7zqAIg5GTYjQzAwIhAP4afmCM51vnYxBJlwTiJnf4e8VdW2rhLF3JlPaTtiHnKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxkmeSd8kFLwijzyssq3ANAs6w9s0YXtDxzOqBTVC55MToahd00W%2FM8XtAWyso2NqAur0XuUD%2BkN5Q5%2F9tcPlPQbgni9V2DBxxBbqk1A%2BU9HxDiZwes29i%2Baqplu0EhlCsAW0kBJpZVYbkxB8nmJccEDAnaSM%2B6h7o0fLhFnuAbVXhT8YVD0P13cOcO8EJIq5GCkdxnQ%2FBrv908LkNzRDO2NMzw0aMaS4gYebWlVuYKrgoqZAHYSrnnQM5UIP7IQrWYZXcrsp4%2BZ7LVZ4eHSLFSn5d5YZDnh44ft%2B3AhwCV5DR9kFsdyOxlQ66zf%2BN4hL3CwWeRsBbSH4jzb9YF8Dmy9rizb5gZSKpH%2BP%2Fam866eYm8CiY9IyRbtTbn3RpQEHfrm115SGiwt9TBRez4wp5sb43xaXdUYNODUvp6JmfxsNqjm8IZji2mbbLkFZZ42ulQG85AH39ByYAaPV7Q4O2sm%2FkVkmCHWRdne3SJnh77jVfUzRpEoAPyaNqX2r1AcFrZYXqPxYVofhmpCp9ykOmBZyCbiBcjvpS0DwMKtsPo3nYth07OTSztCjw3u3PweCz4rXHwJAXuk7b1Pf6zVVmdm838JYHcC0eFaBOi9f8MEK%2B3DgsUG80pFuPhG0z5s056lpwZDiAGPi0tQDC20%2BPNBjqkARSoVX3f2Nk4elfoj6uHrbkJ%2B8YcKReAkbv7Twwqd3pTAAVAusL8QjTED9PUsNiXSv7CoXcGXC1WVO5tf1R5qYkCL6UOXF5KcsVJ77tAI%2B6Q8ja9b84vOEzVht52fTg51Y726rzgZgtMozSatBZ%2Fuk%2FV1Jtz3Mi71edCKthj7cjOYUwEJEVDQ1zbcCjBvW12WmtsyEVOb90TRpm5fY9aGEn127di&X-Amz-Signature=419b2956116807dc16bb3e62ae19750c52dfc4bc8b5c56503d0e4b291f338d18&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XG4WO2UL%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQCQVYgQnw9lGhuSIrmRVjgKY%2B9RC6f7zqAIg5GTYjQzAwIhAP4afmCM51vnYxBJlwTiJnf4e8VdW2rhLF3JlPaTtiHnKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxkmeSd8kFLwijzyssq3ANAs6w9s0YXtDxzOqBTVC55MToahd00W%2FM8XtAWyso2NqAur0XuUD%2BkN5Q5%2F9tcPlPQbgni9V2DBxxBbqk1A%2BU9HxDiZwes29i%2Baqplu0EhlCsAW0kBJpZVYbkxB8nmJccEDAnaSM%2B6h7o0fLhFnuAbVXhT8YVD0P13cOcO8EJIq5GCkdxnQ%2FBrv908LkNzRDO2NMzw0aMaS4gYebWlVuYKrgoqZAHYSrnnQM5UIP7IQrWYZXcrsp4%2BZ7LVZ4eHSLFSn5d5YZDnh44ft%2B3AhwCV5DR9kFsdyOxlQ66zf%2BN4hL3CwWeRsBbSH4jzb9YF8Dmy9rizb5gZSKpH%2BP%2Fam866eYm8CiY9IyRbtTbn3RpQEHfrm115SGiwt9TBRez4wp5sb43xaXdUYNODUvp6JmfxsNqjm8IZji2mbbLkFZZ42ulQG85AH39ByYAaPV7Q4O2sm%2FkVkmCHWRdne3SJnh77jVfUzRpEoAPyaNqX2r1AcFrZYXqPxYVofhmpCp9ykOmBZyCbiBcjvpS0DwMKtsPo3nYth07OTSztCjw3u3PweCz4rXHwJAXuk7b1Pf6zVVmdm838JYHcC0eFaBOi9f8MEK%2B3DgsUG80pFuPhG0z5s056lpwZDiAGPi0tQDC20%2BPNBjqkARSoVX3f2Nk4elfoj6uHrbkJ%2B8YcKReAkbv7Twwqd3pTAAVAusL8QjTED9PUsNiXSv7CoXcGXC1WVO5tf1R5qYkCL6UOXF5KcsVJ77tAI%2B6Q8ja9b84vOEzVht52fTg51Y726rzgZgtMozSatBZ%2Fuk%2FV1Jtz3Mi71edCKthj7cjOYUwEJEVDQ1zbcCjBvW12WmtsyEVOb90TRpm5fY9aGEn127di&X-Amz-Signature=9aee88c7e1399c20d135282891b62019e78bd6e43a4e8b4befc9fbb05eac933d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TNWQ3YL%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIGynwr0x9WMFyG6J%2FMY2eBPUywt8TlcfPKX47wsf%2BEzIAiBlonDNPemlHDcHV5mO7afTGqRD09SGCYFVb2PXhWWzdSqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMUNEnud2s8IHzLxltKtwDwpVTBCVJjKakY6WpAVIwjjg83pmk0ljvfHiL9vzaKBFCtulGS6Hcyvkwj76JNz4EmAXjXou9nU%2BMPFI%2F5KS7A0X6DKwBU8vnZnWF3XIOJpT%2BK0HFgQrMuhQMYXFyfsY70Z87%2Brdap%2B%2B5DCzy8t%2FKhnfYFGSb7d5fOlDkGf7rASTKie4pp7yTCZsBwHVJOaqNGhFzP%2FxUzJH8zOlHYKpou3Ixdrv8Z5OfbBxO%2F1mHZftloBoL3bljz2V2icLcIb%2FsNXM9Ti2Xd9MVHxX28jJm8UCcwW5%2Bv7Yfbw9%2BBYVi%2Fk578xD%2BwOQaMcAiDeIbN0kyhTboCm2Gw%2FccFm5JM6gUhFt1pDP%2FVVkejrdBVettsprtlZcPBuoJEkwHDq%2FffOZEmyLh3gVjyAq2iKhPcw20QEykO2t%2FJNS38yjm1XW9OayGMb3XFl5JD968OA64l9J5jDPrnIAeb7r%2Fcm4LnhAlfLxDjKgL4G0LMbGvRzT4niMfqfj4R6V%2F4kqZbOwvCmAGKb9US%2BhaV7jJBIOCWS5eZVajHqHhfIMiENtw7QwbxCASva9NKr5MU7%2FPG1RoEqo2PDIa7IwVmn35x%2F7E3vYzCRn3aTCdDcl3E8rKKg%2FOcXG3tI2TYCQRdNCK0NYw3NPjzQY6pgE%2FWzAXx7ALWD9izZIWv4FR6gzfnKCZTAVjwmsRjvy38c%2Ffy6y%2Fuzyy0EZjfru96krgZj7iV39hm%2FNIJP3vNxubJ0gXRStGjZzbqRMOa%2BMuMwOftqNfdPCHvukr24qVZX7jrjmUVPOLgiWRrOpqeRPXEKqC1T8b4Xy%2Bhw1PzjLgfefrmsTF4Uy3oooQzV96Xzoe7cHTZS8Uyuosw1RDDv8ST7oLFFeP&X-Amz-Signature=deef536ccf6d9fbeea4d303772b71c14abdad1da8f4a4fada20f1b8c387f09cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TYSQZYT%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIE5BbDrOTErw9IjHVBQSk5c0hwsXPbwZkSZOoAfezKfQAiEAhoe%2BKBK%2BahBsenrfnl8AHkFxUHl%2FrS%2FJ3zo%2BBcq%2FfZEqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFT%2FaqMvMoEfsC%2B2VSrcA5cLUbHay9viP11uXJMt1AzZq%2FA9%2FdQz74Ofl%2BteOncYhEGD%2FwWjyn2kBo6atc0a6w1Og4apVeA2tZrhCFPfi%2BXIXgOAstJIMfl0CpsjynQnok7mUFSssZ0iH7Jgl8qFnDAglX8H355K4pcUiwAoqWIIZCIhxJiVf9n1YhYL8N8xxAnK%2FY1YQUK9nAoH1qpSPq7qspWqhqZeftUMc5gG158tNT4WK7ZaanW01mt6uXG%2Fk9f9UYT7Qcd8mYxbn8I%2Bg6JdhKYtpA6cuembJ0HwpU6gpOFrqOMU3XviZeDztDE%2Fi17W1i0XJl3JUpAcceOPfMJrfAhCjeV477M1xSNoBoq%2B5mmn%2FC5tYjOq4312c%2FIM6U1mJ4a1FQ1VzP5wBIDU5TcZ0IcTqIH%2F1bMfxPV3zNlPZiN9l%2B5cd9Dmh%2Fic96%2F8bK7AmObPZ9H3poa7CQmQrQIrI4gEXb3hEs9kAqfmNGR3Vpm1u4W0Sj6ts6U%2Bmm6Y72in%2BGMk8OCXw3u41J2jv4ZToQPxfAlFeSgVhriVygqu5CKeUgWx%2BOyzuMx51uudK1TxCdkj6GappPfsE1PemyL0hOYffr5gTg76PBqPw2tbv6QFHx7uUdrcZNHxOpJdjse7X%2FRue5W3ZPcQMOPT480GOqUB%2FVPjF0xcDcKVPTqzUrzKOoDzCjkrpiXg46MRez%2F9kJBAvU4pUBnTEb6yH4HVBJw7Rwb2tJzAkdfFrSH5D0HPThLapyqWBO3Y%2FwbVEPx40x00xT4VEHFcqXWvnBUSS8X3QS6fO%2B%2B3q%2F8SO7jmNUL8W5PhoVl0CSI3i2eXb%2FtS%2BU7Jv4wMxdjDnL7Xj5iFG%2Bi%2BbNG1zGU2qca1URuBi78EmChY1D11&X-Amz-Signature=6bc120310e42c0eeed5ab49b3c18b28e54d64b7f8b37a4592e46ca043b4a2bc6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TYSQZYT%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIE5BbDrOTErw9IjHVBQSk5c0hwsXPbwZkSZOoAfezKfQAiEAhoe%2BKBK%2BahBsenrfnl8AHkFxUHl%2FrS%2FJ3zo%2BBcq%2FfZEqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFT%2FaqMvMoEfsC%2B2VSrcA5cLUbHay9viP11uXJMt1AzZq%2FA9%2FdQz74Ofl%2BteOncYhEGD%2FwWjyn2kBo6atc0a6w1Og4apVeA2tZrhCFPfi%2BXIXgOAstJIMfl0CpsjynQnok7mUFSssZ0iH7Jgl8qFnDAglX8H355K4pcUiwAoqWIIZCIhxJiVf9n1YhYL8N8xxAnK%2FY1YQUK9nAoH1qpSPq7qspWqhqZeftUMc5gG158tNT4WK7ZaanW01mt6uXG%2Fk9f9UYT7Qcd8mYxbn8I%2Bg6JdhKYtpA6cuembJ0HwpU6gpOFrqOMU3XviZeDztDE%2Fi17W1i0XJl3JUpAcceOPfMJrfAhCjeV477M1xSNoBoq%2B5mmn%2FC5tYjOq4312c%2FIM6U1mJ4a1FQ1VzP5wBIDU5TcZ0IcTqIH%2F1bMfxPV3zNlPZiN9l%2B5cd9Dmh%2Fic96%2F8bK7AmObPZ9H3poa7CQmQrQIrI4gEXb3hEs9kAqfmNGR3Vpm1u4W0Sj6ts6U%2Bmm6Y72in%2BGMk8OCXw3u41J2jv4ZToQPxfAlFeSgVhriVygqu5CKeUgWx%2BOyzuMx51uudK1TxCdkj6GappPfsE1PemyL0hOYffr5gTg76PBqPw2tbv6QFHx7uUdrcZNHxOpJdjse7X%2FRue5W3ZPcQMOPT480GOqUB%2FVPjF0xcDcKVPTqzUrzKOoDzCjkrpiXg46MRez%2F9kJBAvU4pUBnTEb6yH4HVBJw7Rwb2tJzAkdfFrSH5D0HPThLapyqWBO3Y%2FwbVEPx40x00xT4VEHFcqXWvnBUSS8X3QS6fO%2B%2B3q%2F8SO7jmNUL8W5PhoVl0CSI3i2eXb%2FtS%2BU7Jv4wMxdjDnL7Xj5iFG%2Bi%2BbNG1zGU2qca1URuBi78EmChY1D11&X-Amz-Signature=6bc120310e42c0eeed5ab49b3c18b28e54d64b7f8b37a4592e46ca043b4a2bc6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5BBU755%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T064600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCy%2FVParD%2Fcnf7CTZ%2Ba8h1yOzrxYIXv906vLO%2FuI%2Fj%2BEgIgDvG9NVcmTsPnPIX9sDW30jcJSfleUx5kRDAF4rZdZy8qiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF1qmz4ebuBXuYnfIircA72JPMvCBqqvE3BQZ%2FDs9NDXd8rOynmFDmR%2FTF5UGZOwJVTpktQik0r9%2BiJDLebYMak2jHNH34txzEgwarP4rr5J670sttCgRmFbbGm5SHIf1%2FT9LQxzCJwSMnCHLr0bjOEnnZnX0%2FSOJb9h5aV3Td7n1IZtbnban%2FiQQfntZa%2BbgbAZhDJFbc1zDTJRAvGERZVXRLjPhU%2BQzErWM1seWn1ERli2Sy%2BTd6hQohDldrz46oPP9X6H8DEHGCLW%2BTGeZoO%2FqsapwNQV%2ByfpmwD3YVDkkYdeEBTH6GcPtc86Whyw2YmtTOJBDZ4jbxZmVPNG8kVRka662UbcaBL9GUdP8FDhGoMX0xSShjiI1SmksqOZSbc3mS1sH8jUUkT3xK1oPPe1K9A%2F9iXipYqjj9Nn%2BWjYyD26SwAsnzmrVgi1adx9R55p6HGTRTVJrXsfREICb0HNBNNQrIyQPy7wQU96x%2BYIii%2FglQUCro%2F1fYh65Cg%2FlfiIFqI6NcrzxIfGP9KtiFJVpV%2FLfnDC2w5PX0umyC9PAxiwmqmsoGIOlPJOSyvAVtOLorw7BAuhxB1rYIXAmv%2BQO7OD0%2F266hcekTUOsDZk9vqTzGxXMivgrVs4bcFgFlgptWi6PtskAsorMNnS480GOqUB0n0OJ9ODmbD7mqDIoxOxncquqHkw89gaO6VVIo33FAYvs0LsQEDW2QyD9cAin0Zy73LuGBgaRaX%2FRJ%2Btb0SPxzp8KgRG2Te2SSEpHu2T05cN74Gwe9P1CfHid84d0g6aBoHq9FHKheeMTZuF9cmx4nrl17IPdkIkq2wQbt5d93lD%2BuuQRuyMh0mKMJD%2FAW2qoLRyBh83ZwRp%2FiRA46nHFMqCSNlB&X-Amz-Signature=afc05c2fc2268cf4f06523c2af5552e303bd0c0f95fdad99d8ed8cd130ca789e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

