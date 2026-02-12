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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2VV4F6B%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDNDJ%2FR1aMysG%2Bd1poXQsXDxUjgaxn9cZBb9DuO5R9fbwIhAL0PILC4PwFCAp5d7qEHkQTkwbQE9ptIz95nLPxWI9RNKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzo21fhpc3013bLCRQq3ANHmIq7c1Q4R0oY%2FF4knzSWV4fe1lxqttuG11v8d1gFUOdBB74qmAOwGDnnoRub5DNQ8sOTFZOoYBAb7UEeRFQO836lJdjpUngEofs9iXpN2eD6SgmeErkTxy0WcASshwHOHqYrW5hQthoe4FTZd467dGsdF%2F3PJsu13pQVzBDcLOcDwnht4mr%2F9Ar0irbQqiKWUvfnrr%2FC1xeXbzk%2Fu5hdBQq1BZHN4F83peXRhJ%2BGyKYBAgPdgogSnbVR0BZilGFPQq2F1OXgqcVyqAvP8ptdipgiHKjsxLM9Kg%2FruiLwBpW15BXDz3Lckl2FUaZFhltbzJTV9XDnujNH8kcwbgpCud7ZVkC7fQId87c2QnKKpYgFyXkkGctK4ah7v5ZEDvNwT0FVFdKD3WnnMvu5QcJ1VA8NXKiVJTO3NmkgURrW2UYYbKUjOCRdR4oMITjLiNes%2Bv%2Bg85%2F%2FNSF8J5qwJqWLqWNcVHJWNraE6N3OuwPaNjgR2fvrGaJaRDoOAVRJ9C7PRRN8ZpmyvIj5wtmZoUV5hTSYAsesnxlUdwU64Z4zgyPrbO7Qfnl3PTKwaB2RRKtJt8Qn1FVZVn09QYvJOx5bL2dXHTozVjdcmO2h%2FRosqOGaNfYm6S0nuqKluDDzkrjMBjqkAR68SWd7lvFuRmr%2BIURDEXXH94EmhDeP2bB5icz7NTAIlk9sa0ANt%2FuLEQ%2Bfp5znF6crPa%2BBUTxAJxyIfGls1ASIud6ygs3tqaUaL7JkTn%2ByUPhCbY%2BvKiruJACzu%2BPKTECGNrzZaq46uSafH81tNZCMq9FTK5cCtBRmNZENEqTMSHqCcOAmMHt1I88xlb5OOctzp6FHu6soD9Yf9ASacy7IlR5k&X-Amz-Signature=f119f46793af836cd23898cfe6870b7c54a22c407cbfd6f770392f17fc8c872f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2VV4F6B%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDNDJ%2FR1aMysG%2Bd1poXQsXDxUjgaxn9cZBb9DuO5R9fbwIhAL0PILC4PwFCAp5d7qEHkQTkwbQE9ptIz95nLPxWI9RNKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzo21fhpc3013bLCRQq3ANHmIq7c1Q4R0oY%2FF4knzSWV4fe1lxqttuG11v8d1gFUOdBB74qmAOwGDnnoRub5DNQ8sOTFZOoYBAb7UEeRFQO836lJdjpUngEofs9iXpN2eD6SgmeErkTxy0WcASshwHOHqYrW5hQthoe4FTZd467dGsdF%2F3PJsu13pQVzBDcLOcDwnht4mr%2F9Ar0irbQqiKWUvfnrr%2FC1xeXbzk%2Fu5hdBQq1BZHN4F83peXRhJ%2BGyKYBAgPdgogSnbVR0BZilGFPQq2F1OXgqcVyqAvP8ptdipgiHKjsxLM9Kg%2FruiLwBpW15BXDz3Lckl2FUaZFhltbzJTV9XDnujNH8kcwbgpCud7ZVkC7fQId87c2QnKKpYgFyXkkGctK4ah7v5ZEDvNwT0FVFdKD3WnnMvu5QcJ1VA8NXKiVJTO3NmkgURrW2UYYbKUjOCRdR4oMITjLiNes%2Bv%2Bg85%2F%2FNSF8J5qwJqWLqWNcVHJWNraE6N3OuwPaNjgR2fvrGaJaRDoOAVRJ9C7PRRN8ZpmyvIj5wtmZoUV5hTSYAsesnxlUdwU64Z4zgyPrbO7Qfnl3PTKwaB2RRKtJt8Qn1FVZVn09QYvJOx5bL2dXHTozVjdcmO2h%2FRosqOGaNfYm6S0nuqKluDDzkrjMBjqkAR68SWd7lvFuRmr%2BIURDEXXH94EmhDeP2bB5icz7NTAIlk9sa0ANt%2FuLEQ%2Bfp5znF6crPa%2BBUTxAJxyIfGls1ASIud6ygs3tqaUaL7JkTn%2ByUPhCbY%2BvKiruJACzu%2BPKTECGNrzZaq46uSafH81tNZCMq9FTK5cCtBRmNZENEqTMSHqCcOAmMHt1I88xlb5OOctzp6FHu6soD9Yf9ASacy7IlR5k&X-Amz-Signature=f119f46793af836cd23898cfe6870b7c54a22c407cbfd6f770392f17fc8c872f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSQZVZ7R%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIAOKnUww762jrHww51lmXKz%2Bmt%2BQttObZssEIlxZ5iHiAiEA2QaWqX9gaOn9uMxMV90F2iCkFd2wy73Dp8qTuObNs2gqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPMyIfnzZns0Tq%2B%2BDSrcAxn1DhjUkdA4cyYzvoyuFnhovOlh0oqkEvbpjlp1APQZYI3Qk4XWLvwmjOR0LSU78Tk4ScsWWGibBscxbH7mpRbxDEBny6gRESVlVwZw0Tddh03mGdLv0dO3HcVQmO%2BkOIGoKlMpmK89AZtQZCUuTDhOSVRAO2oPOzN1ps7qhGLfSM8x0RiTJUqYdQvliUFxYUI71Rbxju3UcP%2FPAsjD4wassCwEmiE1CjN81Fsf6teAZVhI%2B%2Bw%2BKZaTonB0v2mWuprpAXVUE0Q0XkQtFsqk9t3dGrKiWNpdk5z4qwUp8Be5G605QxClJkfa9dIb0qzxTXPY3jWxiqcPLZo6SnMm0TMlZQJdZyU3UHKAJ7Yxx7yzy%2FFVlEb5ifWd6SAFaF552f3aimHuqCveJB7%2FJDH%2FobEM%2F97rO4HOOfnhZ%2BUUcb6LtVTyYLDhlN6JKifUYjPRoLukpI2T8iLBFuCr3Villfh%2BcscXu2bav7%2FW4YrvaCGX%2B4QDZXM78rMzxEkRfGRbGPqn%2BTBAVNyi65bbOzkiQBEVo%2B8w22a8dS2nUeysMhKY8XnLAl8dTkOBpdoOYLq5k9PDOS6NXUdwPdy1kfGISwqDxhPqSE0laSmyCP9y5zWr1zQkpnLNMIb8jdpyMMiTuMwGOqUBHV3SMmQy0xGP91Za16B5bsu4%2BxhLnGTxlBgr9itsakuN1eECbk8Lry6L1nQfvI63npfXMx1SnDZcBNq5Z3Hb%2FB2GHAnYLmFrm5OkwVd%2Bkl6HMr2%2FMv8v87W%2FroFwYOlEwdjdMJ2GSysBRpKQMxLv7IIDskG%2Bx1BkLBRyBdYpDe0eyhxzSAaqB3d%2BTTByXrn2R0BZguhwgfPVsBrO1d6h4PB3fMwJ&X-Amz-Signature=f1cd4697c7f8176a88f59f9d7c1a3cbefd49fd5a4255f480fa64ae22990e032e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XYAM2DC%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQD5KoLFQRUefr9j6LQSAldKcNVJasFFuroG3g%2BpaCYjJAIgdjA321DX4FfjV1ydsbvTfSiwoBUiyvTYk9oj4ZPKEIUqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNPhnAoo744p9EBxXircA7wJFNforVWcuMvt7Yf21XzWFKGr%2FR%2F6hDdnBLCO9VL75tyCFs0nMvcjpdV79PCIyciignSqP7JcGFE%2FYYG%2BE7THPU2YQrms6VoepltyBiiZP7Uh3F7c8k5XOHMhc4HR%2FKWN7XiZ4vCus6bJgM7WoJrbrMIgxCyk9U3a0FZ4UkRo8oixg0w2ZFPjFTwJsywBKGbstfbNXWxTVgaB1t1k944GXRTOvz6sI4SfSgGIvKetkKNJ9dHci%2BHH9AVAz9v0%2F9HkpBiprnvzFXF3pUOmI1KP2ZYSSqfcgQWiWI67OUBOrC9CSwYMAAaplydAMFhmWnr6ZHjgauDYcntSe2bMI6GKv5vcGxpn5ZkZToR%2F3XELZpxqEpQC%2BppQtJy3z7sjulSoYvcK0xBv98dgTDk4I7da%2BdxsTpJX3qAY4lZm6PBAvahDC%2BwGyZf9%2FAt69q5MThFkH5zPxdrbJ9ifBfUbUIHFtOULP5wwwQUuzxK6y3CF6fKHRVORHWlPF%2FveCyFc3qhbcKMcbz4SaVjTlr5A1HWx0yf0eaDVCdhfY4M8XrgBXGQ5nr%2F7S7VAqWeeyR7QZRyLMwSs2LoQi%2Faho2HsKh4dHnXXtbxRhrPIMb3nJ20iDm2NetVmltRwyaHTMJCSuMwGOqUB9zX8qCoGlEIMpoU1LaOKz2BaDBCxH9I2PzCJEhkMOJCrKmlGr8O8JLbm%2FEGsEnpzAaW83ZFyH8sdIMujB8WnoZIZyuU683nhcduG5giv52CNOw1QYGRx9J%2BWv6jvBA8Hel3Vzg99En%2B5PkDpIwGdUllR8ayY5%2BVlU6f8Fz0bJpiV71sT3GDnFDslk%2Fo1WvG1uylzFdXqGVKKqk34m7rpzLbF3I5j&X-Amz-Signature=b291db8e78703c0cf96f3655c381f6041fd915aa45ce7fa6385de97935433b72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XYAM2DC%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQD5KoLFQRUefr9j6LQSAldKcNVJasFFuroG3g%2BpaCYjJAIgdjA321DX4FfjV1ydsbvTfSiwoBUiyvTYk9oj4ZPKEIUqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNPhnAoo744p9EBxXircA7wJFNforVWcuMvt7Yf21XzWFKGr%2FR%2F6hDdnBLCO9VL75tyCFs0nMvcjpdV79PCIyciignSqP7JcGFE%2FYYG%2BE7THPU2YQrms6VoepltyBiiZP7Uh3F7c8k5XOHMhc4HR%2FKWN7XiZ4vCus6bJgM7WoJrbrMIgxCyk9U3a0FZ4UkRo8oixg0w2ZFPjFTwJsywBKGbstfbNXWxTVgaB1t1k944GXRTOvz6sI4SfSgGIvKetkKNJ9dHci%2BHH9AVAz9v0%2F9HkpBiprnvzFXF3pUOmI1KP2ZYSSqfcgQWiWI67OUBOrC9CSwYMAAaplydAMFhmWnr6ZHjgauDYcntSe2bMI6GKv5vcGxpn5ZkZToR%2F3XELZpxqEpQC%2BppQtJy3z7sjulSoYvcK0xBv98dgTDk4I7da%2BdxsTpJX3qAY4lZm6PBAvahDC%2BwGyZf9%2FAt69q5MThFkH5zPxdrbJ9ifBfUbUIHFtOULP5wwwQUuzxK6y3CF6fKHRVORHWlPF%2FveCyFc3qhbcKMcbz4SaVjTlr5A1HWx0yf0eaDVCdhfY4M8XrgBXGQ5nr%2F7S7VAqWeeyR7QZRyLMwSs2LoQi%2Faho2HsKh4dHnXXtbxRhrPIMb3nJ20iDm2NetVmltRwyaHTMJCSuMwGOqUB9zX8qCoGlEIMpoU1LaOKz2BaDBCxH9I2PzCJEhkMOJCrKmlGr8O8JLbm%2FEGsEnpzAaW83ZFyH8sdIMujB8WnoZIZyuU683nhcduG5giv52CNOw1QYGRx9J%2BWv6jvBA8Hel3Vzg99En%2B5PkDpIwGdUllR8ayY5%2BVlU6f8Fz0bJpiV71sT3GDnFDslk%2Fo1WvG1uylzFdXqGVKKqk34m7rpzLbF3I5j&X-Amz-Signature=7fdacb8a446e50293ff9d6bd567ff1478e8967e12917fc16650df5ad553f7f1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627H637RH%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQCrYIyezTUCwNLKbuh%2Bnq6eoQF28UCcLrr%2BmAX5HRFHEgIhANfIH98R9vsj9X4SZNabSvAF0lBO9o1IL8O%2FcYuj9Mw3KogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzMuCdRwFaRIEyxVtwq3APMJXebQD%2BIO7xmF7G2Nf7fh6vh7fvIqK4%2BopksT%2FCBg6lx7fI1OZMy%2BtfB0Ff65rrSXMSbW8x7VE9vF7J2EW0AeUCDiZDh7XJ5Vch%2FcTW84CfGGAmoQdy8%2BiUqegEHoXQwV0%2FJWs4b77G0wr2gdLbBH1Y%2F80Eylw0ryjKoX4L2ybRWpJAjePg3VCLuaUB22HxjJPVFOjzb9zR1FwuY2g48%2FvOP6nniURQxgsjEByRFO3kcnJ0TvFYupeVrXo%2B0nGS72q2WgrHtaPRW98YLTanHsvvRJUK8xjwgGXGE57kKCD919l25f6MFAr337O27kCU6kpb%2BKtRfV6OigviEAZi8ETDQci6Cs0BZTSxUWAion6eo3mwtTCOQBrzvGG3kK%2FAy4p%2B4zzjoO%2FFjnm65v1QfuHT4XJyl7ustebt44OBGcCpDm%2B9S8dGNg%2FhHFV1yZPbOS%2B7hRk9KLwMqwypxnuyuI42IyZgCtNJQ29PAUH%2FQ2sZP%2B%2BgSqx3PDZhje93hdkMeuIdYHrO063D%2BAjNX%2BMBu8SRV5pqQ6Kl%2F6SYYJJOPKgHA0xBmhZBbKsalv8vHvBlSVs%2FDCET4jLXT8HuY5yaFgKOvi64Ukb4BOz8Xlgr58dGGJgyPBip6EacmcTCMk7jMBjqkAT%2BhfEI09is%2FTWjmdrdgZT5W2iPeWdHszkYn%2FM3MqDxjMLK9pkHC8M%2FHtDI%2BX13r6wNH4Uj3wm1FylMmtA7C1AvBW%2FE8Ch1Rzj%2BfCpnJh0T57riDY%2BDUfxoAhqiHYP7tryJ3Dk%2B0YkPbmS2DZQ8oypUujHFhn9m%2B%2FG1FcylvDP8%2BJC9ziM4tajX%2B3yVMzGf7%2Fj2uoD8A3IiWT3SZDyJZvy9D8y0n&X-Amz-Signature=25b33b50d466a2c2a2737b1e6c0a49203bfd719225d18c171ec97cff99f7385e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666A7L2UZY%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQCsi%2FfZkQ2ITp6M%2FFc0xTxAkX%2BW81R5N1%2FtXHwYxRnf7wIgFYqhi1F4OEiBrMRK0DKJRgyJyMvsRy7lPRCKkZokF7gqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB93KyzMF14romxJmyrcA9%2B51jbwvE9kvuZN8Cv1vbZRP3aUu2aKyPdGAQw6XrjepN2IYA9UfFVf5MfDLPWSDd%2B85hgvzdlsVkvWOS8ctaa%2FWP2NP1xRR2dhZ3rOQW2iEy1lKLwAJZ2BLCKGPvgFJ6x%2B9jDUPqG%2Fbg5SE2BtVzXTnXV6pOkTkUESfOkhUv2iT5ps5POeytBYN6%2BA6QVrhz7lBMXeE76qTa6tHyibLeyXAhj3f9FvdJ4Kmrl5A2hfm2kyooIltDiCRl6lPKQy3I%2B5yiJjbqGMrSKUJQ7wV0pzs8Fny1gcwdAbrQ0EdUbEdGGD2P%2FG%2FfQERrwZvUAe%2BHyilvE%2Fe0STm%2FSCigsAy9lCqtQTigB0fzSSa9I7DpvOuqWF1U8gWSOBvU2o32acRO0AftjbklnEb9EYDbYngZzr3fm26ZYBqWy00aKNNgc1V4C3%2FcRHTdD35TYnyJKGn7CXxIPBbwrtEbRE732zSZdF3McDEWAG1NOHZ%2FoMONAedz4ymxZ9FVNMkBF5%2Fft2ppU3KPlA5G4JknUyEJ%2FuZtIQMGeSjCtJBc56n6WiWfHNY52eflDVndttNwEHGzTyyBY4Lbu%2BpJXVhwAfunzEFtRq9xzkZkACjRf5Wmn8MwF9XfVEVYjvmLEKbBiBML2TuMwGOqUBnG9oIBtf2zNmxs0dxxaJWkQkPjZ2ow9uriVgjyQR1%2BC8h4cjBDT%2B6yC1oe06dBbHGVWh%2Fw2qwh7IOQVpVK3FkXn5YpgMdnTySxIbbMcY8a4KgmZX%2BYGNae%2Fkok9avqa8O18cdjlAfLLbj%2FMF8N3smM%2BJU7eZPEhYy%2FioEPLltNVbV5LzRXFrO19T7sYtDxz6c6lkKa6wRLu3IwY3MqDrHyP97hmh&X-Amz-Signature=efde695335937d9d4a7eca629021f7cfee4a6bcd1c2d9e7b77aa61f34cc64ad6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662G4SZSUQ%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQCxWCp7TKOxFl2xeqb4aerY6DXGcao5NBu6bAUkVQEMuwIhAMa40fIqP0kUl5p87r650pxG%2FEy24%2Bj8UqH5kjhMfUsfKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxMCOosGwM9n6rSTy0q3AOa1Tp7w0vkIBbbootwwUy06NS87cNn2AwHjsyjUXpuuwIdUcxPX0pu52Xmd4sQV08lWz%2BjCx5RkxkipIhcGJdvhpsbWsRNZqHsN06l%2BJqdbn2S%2FgCXg856wtgAUyIAEhVxqXxL0H9rlBvKLS7MjcskDI3rNvyVVzhsRKgSBgt1nhCbLhVaNHa1usMy0HaEr%2BARL8HVBt%2BAmiimkEbscRWYy6zE0S4%2BDdq1SiQqn0y8dtjlU0uUe14ogjUcUkY5C9qmHtGAxud2fkeHQ6wYIcPy0OSXUYS0CgiDQmu2EcIpaYwvpqwvQaU725TKG%2FZUzTbVLYbprFc%2BgU8JfNnLWgKNWRHfYw3WLcdX1AkIBFi%2BpOujVl7p%2FTdS9y9gVvCMUk5WpySPq2xSRQ9a4CJeDGeK7Hf5aAo0bHofJOHMNa4sE9dyinUV316xXB3%2FSSVxeq5wfy5AHuOFPPQLUIxzGDLUUi4%2FAmgdq3NyleWXrVRCQ5p%2B55cO6c0LhJspaz6JK9ggBB83Us6XGBGjaamQYH7ZbNuUX9R8KDFcXs1ukewG0XyJlH5nifQUYMl%2BYKOGLhEeh3V%2BMS6OhHwL%2BSCgU7tI058jsYf%2FLkPHmC9KUMfvu9Lr%2F4GiY%2Fzy1QTadTDFkrjMBjqkAbJQGdb61zNNXUNV%2BDw4E%2FjGqZ8%2F7yETrhMDikoSsD5XGnejzQ%2FBvd7lBm4VKYDBdRgQC8WXUONe5hI%2FyD4d2oyEY6luCUfkXR6uUswkK68etmPM2SKnAJw5G48kpetJzlYhavfxiP5mEsMngqBO%2BoXhfejgTET%2FCOuRAZAIXGSVzgPFOewCq3JKUwOcVrkLXSF1BB900guOGRYYwhyNqDKs2ykK&X-Amz-Signature=53ed8cee4283763bf7f837c134fb57a6658e2769b646349a508e32d24f4e6fd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQ4HOZDC%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQChs%2FfEJ0P1gIp%2BNWDdDO0tK7sOsVFdo1gL4JrSKAPBqQIhAJiA2RwW05NPsjFKDcJzUSSPq%2BhRa9HvF60WyTzbNOw5KogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxNSdfdXL77NdMGiJ0q3ANAhBi%2BBYycM0kDXdUTnOdtXEo9hZRpwPiFtI8%2BnZ%2FjxE88c9Oh9iqLQ5ukvchpmq4SxrN3gkHcmVYxlreN8cBwJ4lkWHxfWyO973a9Vs88Mk929tBVUekAj9opJhLyFsXBClwWZ0azpIYNgsSe0NOwC66dbrjywnevVJYrPhBhriHeIyUU0BxND5NgZkD9r9Si2tpbk3WdBqXoWnZn5pkTqKmSiuQufWrVby%2FPNHR0dGVzk0fH6fCI5Umgnqlg5CoOHCucGLj0DbP4w1UV872YeTN4A99QoU%2FQ2ryluNnYsN%2BDvRXc2J6bgiZTbeV77iAkgkHw7kMLtum%2BOFVGCuj8E58OAJbVAnlRjbrn%2Bdl%2B4ChLCmS6wyFPcasLjqFTOmEx1O0frQGy%2BFAP1I1Jap6h6fDW8M2R72IBcsWretsrJOR33MfGj2X0gkEz2kadkxZwrtwd6agX8z6I5eT%2B8oRPZqNxxS0v1goC5VVmqhi8wI0%2BWNF8HGkm11lAxHl%2FIAfU9YuZa2DAdOzdeZLenqSdzQp%2FzKRnwlDOZSJkKgCltympbgoxawwIOPtbKyZq%2F4aYRf1Ga6qXXJXMjGGt2xarugmXNgENYYsQtbfqYx00HrMjsmV9Y0bdUo2rcjCtkrjMBjqkAf%2FGQW%2F6RQuJtB5RpFFwiA7APjkIrZ0%2FmN%2BK7cpxhW03rvuyIi2HXlNeIqxVAh2GELHT8Kv1yatHUNIS6fb3YcxpDDvGwqu%2FFC2j1CYeNnlo9rYIPqWQck2NwsmuC2pLqSygF5sV1Jx1KFhbEScljWScGW5hHhk71FfifBH%2B%2FIs%2F0800dEo%2Frq9GI6IYD70hESkpPGha1bdvigObSbKVSjfXo3Yi&X-Amz-Signature=1faa1847a366c08ac3c53c48035e2eaf8e0d9dc309ac00f03798ab2bc0a9ec4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQ4HOZDC%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQChs%2FfEJ0P1gIp%2BNWDdDO0tK7sOsVFdo1gL4JrSKAPBqQIhAJiA2RwW05NPsjFKDcJzUSSPq%2BhRa9HvF60WyTzbNOw5KogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxNSdfdXL77NdMGiJ0q3ANAhBi%2BBYycM0kDXdUTnOdtXEo9hZRpwPiFtI8%2BnZ%2FjxE88c9Oh9iqLQ5ukvchpmq4SxrN3gkHcmVYxlreN8cBwJ4lkWHxfWyO973a9Vs88Mk929tBVUekAj9opJhLyFsXBClwWZ0azpIYNgsSe0NOwC66dbrjywnevVJYrPhBhriHeIyUU0BxND5NgZkD9r9Si2tpbk3WdBqXoWnZn5pkTqKmSiuQufWrVby%2FPNHR0dGVzk0fH6fCI5Umgnqlg5CoOHCucGLj0DbP4w1UV872YeTN4A99QoU%2FQ2ryluNnYsN%2BDvRXc2J6bgiZTbeV77iAkgkHw7kMLtum%2BOFVGCuj8E58OAJbVAnlRjbrn%2Bdl%2B4ChLCmS6wyFPcasLjqFTOmEx1O0frQGy%2BFAP1I1Jap6h6fDW8M2R72IBcsWretsrJOR33MfGj2X0gkEz2kadkxZwrtwd6agX8z6I5eT%2B8oRPZqNxxS0v1goC5VVmqhi8wI0%2BWNF8HGkm11lAxHl%2FIAfU9YuZa2DAdOzdeZLenqSdzQp%2FzKRnwlDOZSJkKgCltympbgoxawwIOPtbKyZq%2F4aYRf1Ga6qXXJXMjGGt2xarugmXNgENYYsQtbfqYx00HrMjsmV9Y0bdUo2rcjCtkrjMBjqkAf%2FGQW%2F6RQuJtB5RpFFwiA7APjkIrZ0%2FmN%2BK7cpxhW03rvuyIi2HXlNeIqxVAh2GELHT8Kv1yatHUNIS6fb3YcxpDDvGwqu%2FFC2j1CYeNnlo9rYIPqWQck2NwsmuC2pLqSygF5sV1Jx1KFhbEScljWScGW5hHhk71FfifBH%2B%2FIs%2F0800dEo%2Frq9GI6IYD70hESkpPGha1bdvigObSbKVSjfXo3Yi&X-Amz-Signature=48be82fc3a85eadb5a7213a765381f73e12b8b91a5eae781def7346c0e51c291&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ILWMDWA%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQC8W26ZDINHY4X6Y4sdL8ZyZ8TVPVHqSEb6%2Bkk6F22D2wIhANQdJRnrITxZz4F6JEjazuBaDZYY57J%2BJ0cpTNNKtpyuKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy9mIIMBm4zpQkkRTYq3AMSY8eIiesRhdusw3PoTBzq%2BwOnPMwalfC5gRTpYLt3mDDrTuYOhvDHYjg3wbOlYBYo2ykyVFdHR6gvPIWdx1isHuBXvLxj%2BgrQpAxnDNnT2P2y2f66zcKVEeuWVqKtjduso5o1mbYo4XE%2BZsrWyZ5hkruPZjcP5Kft5NjGShRD9QSL00Wqgxkxakf5WKdEfe0F4OJnmvEI72k28Jbb3hog3%2FnVYI9m00bA59w%2BiFBeOGN7tyaMraY1FWx3sudgYxUtN7rQ4jXGJLZFhdfyb26Y%2F7s8czmgh%2BVw4NkJwz5CP05vtKXH7qCYi1PHOYhi5TiQlKXy5uBcXwZDTF%2BFvGU%2Fgo9Rupt%2BNxdZ%2FrJXHd72ht4NM97PSXPAtk1wJDcw%2F%2FM%2BoY7Oem0GC2KQFVqqPOqoi48pfAXereqlA0QsP4lWrUr8cyvzHJoM4Pzl%2Bvrdf0x%2BurTAK7vmohYSuoW7%2BspgcOOUzSUecEDmP3U1kT3zZzzT0dOE8afA9xV8hXFiSbJ66OJVkoEj34xLOgX8w6E3yk1vw49zFEj3dfv0y4qfQavjKbEMLMXGGVPLGm5v4BzoATzXtjuYbduvymMpGtPmCWUUDuMcr6gupewSzE9URgIh4OG%2FfPMqUteWuTCvkrjMBjqkAWcwvJ2OeOnu8p0DK6MrreCxi2fvrghLZaoKLAhqZD7PKGEcP3zRDQqUzPfDMwUx2cbrQDmlWX%2Fb8c%2B43h13mJnzN9x3wSRWTySgI%2FYM%2BHBZpfiMgkCQojrxyUw284iOwhLed8yii0MCEHMjtKYv62I0Zbb9DHnQYEY38ru4HH%2BihRThG0Nlo7HdfZsHarO6gAsDhCPwWnFtPDymVEdg0uaU%2BfxY&X-Amz-Signature=1652c171629bf6e811b760e0789669000ee6b7f59c60c35b42c796fee89bbdb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QV6PAXOV%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQCvUA86DzLeRJC1vcvFoE3kxOzb8fsBvJN1XRbiDmYchQIgcVWmriMxLF%2Fdsxs9%2F%2FrPjkiH9y9XFFR6B9Cp2WrRy2IqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDPxmPjYsttPutRtlircAzsktPgRQLMiGjjrgrPdkbyYeheboaoktkt8iRjfmN65O2XAjsr5q0dCx0v9Nyc%2FHVLaZx90iRtV8uCeoBg2uyNanWsEjVu6Snpz06AB6mY4GiV0U6Vw6AENMXoB4jbXZXoT9TE%2FSYLAvxzPrk%2FhnRND5rT%2BuBLiSLhuIMY3WP8h5lPaLAjTwzCr8rCa%2BVOBHHDP3wMaSETxMMcbzSQMy0RSctOGRsEjKHiJB6eDzs8cBRwLG5wH%2FYNz0n1g%2B1Aht%2FDFQt25EmmwJUtxmDuhVIzMShBuTh95iyadYOnbWrHDDzqeZ%2BV4qTsOBjnuNH%2BWEBGTDzMZNxd6bwbfdBraftRchcupYxfTY8yrpOGmi0ScoehPES1NvibwXCnLsaQzBf2Z0r3lcHXiJwI6lHi5pXzqJMNeHNF%2FZEIePQ0kVbNwEfd3ulx9U9GyZvzs7J3CbWChxmLRDGQSdeIcQIrCOnQD36XWJRqJzjremYmCDYKZHlFXbem3WBRziXItgfeZh3BCfwJS6kiPDVQTI2CoL6fhDMRzO77FckTe%2BORsYGZy69J1OwE4wQ53%2FNAQQVD3fOSjYsTZp3cBu65hyWECE5aEnLsor%2BrRzUnPSJC2fP2HSecCp%2B%2B6bzaE%2Fw%2BbMKqTuMwGOqUBcMXEPhy5Qw78Fkr1y1PICxTNTd8T8W9j%2BieTXzw8pjBVgmtS1We1rU9XhMWEyWcK8%2BFmnMbWacdvUgj23SE%2B0kz%2FIGGZkfAhcuhUDKDrSUTjRja14cQhBnhFdBKIoDFeCism0vwAOTilI21LaLuQC9cEdc9xnBmh9qrUgBk6Qq%2FVd5taHMsgNn9B5k6fNXPkQ3ce6u62L%2FlMEkvLpH1HV49wSKUe&X-Amz-Signature=668232130ba36dca4b2e7cc57b1bd408ca9aaa4e76bc6dbfe1d8f8d2b8282164&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QV6PAXOV%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQCvUA86DzLeRJC1vcvFoE3kxOzb8fsBvJN1XRbiDmYchQIgcVWmriMxLF%2Fdsxs9%2F%2FrPjkiH9y9XFFR6B9Cp2WrRy2IqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDPxmPjYsttPutRtlircAzsktPgRQLMiGjjrgrPdkbyYeheboaoktkt8iRjfmN65O2XAjsr5q0dCx0v9Nyc%2FHVLaZx90iRtV8uCeoBg2uyNanWsEjVu6Snpz06AB6mY4GiV0U6Vw6AENMXoB4jbXZXoT9TE%2FSYLAvxzPrk%2FhnRND5rT%2BuBLiSLhuIMY3WP8h5lPaLAjTwzCr8rCa%2BVOBHHDP3wMaSETxMMcbzSQMy0RSctOGRsEjKHiJB6eDzs8cBRwLG5wH%2FYNz0n1g%2B1Aht%2FDFQt25EmmwJUtxmDuhVIzMShBuTh95iyadYOnbWrHDDzqeZ%2BV4qTsOBjnuNH%2BWEBGTDzMZNxd6bwbfdBraftRchcupYxfTY8yrpOGmi0ScoehPES1NvibwXCnLsaQzBf2Z0r3lcHXiJwI6lHi5pXzqJMNeHNF%2FZEIePQ0kVbNwEfd3ulx9U9GyZvzs7J3CbWChxmLRDGQSdeIcQIrCOnQD36XWJRqJzjremYmCDYKZHlFXbem3WBRziXItgfeZh3BCfwJS6kiPDVQTI2CoL6fhDMRzO77FckTe%2BORsYGZy69J1OwE4wQ53%2FNAQQVD3fOSjYsTZp3cBu65hyWECE5aEnLsor%2BrRzUnPSJC2fP2HSecCp%2B%2B6bzaE%2Fw%2BbMKqTuMwGOqUBcMXEPhy5Qw78Fkr1y1PICxTNTd8T8W9j%2BieTXzw8pjBVgmtS1We1rU9XhMWEyWcK8%2BFmnMbWacdvUgj23SE%2B0kz%2FIGGZkfAhcuhUDKDrSUTjRja14cQhBnhFdBKIoDFeCism0vwAOTilI21LaLuQC9cEdc9xnBmh9qrUgBk6Qq%2FVd5taHMsgNn9B5k6fNXPkQ3ce6u62L%2FlMEkvLpH1HV49wSKUe&X-Amz-Signature=668232130ba36dca4b2e7cc57b1bd408ca9aaa4e76bc6dbfe1d8f8d2b8282164&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFJE7P4T%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T174653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQDLcXI84foyU%2Fmg480fR1SvXQkLS8vgrtuwd59iX3VRSAIgEa5ETkNP8w%2Fl6dgG%2Bc0hM1%2F0NNg1ANik0KnwaFm8EcoqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHRMU00Tu%2FCDo%2F77sCrcA5H8yL7a0UTJY7Q60a8s76ZPVvuTS87pzw5dbLcgsrE7gw3TG9Gon30YLmTXxiCHi6CDw81yMlNJnWl8jyiNtsOWAooihp1kC4%2BYEaZmq8xU6VGwI18VQpWvfm%2Bwepwup5zcwb22Z8yUjhngiIwSUzYZ1u%2FQFNBvwaDQmInd0ub1q8nVfXA1xJMvSX7%2B%2Frq%2Bzmb3uihvVQmmVoW2%2FqmNNgg%2Fwc1CMS0WlNA0RR3vzbBpnrPeMKJ8jcwsQ%2BRwHPYNHiHv2zj4dWRU3mjiIFWhRpbWM2sbF%2FtD6Un2EA5dDIs7U3e%2Fp2p%2FrMsbK2rUgrPkJ%2BZGN8Vv1u02fD%2FePtZUl9RporE2gBxwulI39WPx7gSryUazmgrbRGFNuQD3zF0uTp3Vn1UiSrQnRkOHHTBnk7yuNFLg2UhFEl59MbTwPzx12YT%2BwHapj0QI1Cbo5U0Vk5ctvAJQtT%2F%2Bf7NBantZtOYfpWEmSFEGAmqd0gbq5vXsBZ3mt%2B%2FZY2D0ZGSdvex2TmsRLqrgF6iRXKFvaeaf719Lc6i9Vmd04%2FLvoPX1nDePs9JTy%2F%2F9sUvOKar3TjsNObJyY3Eiu6UOnV5e80J9UebXEf%2F7MWptlMSnJBbke0AVHzSVOYONqYZ9xAuOMLiSuMwGOqUBmtHLEJWnDy%2F5IOr99%2Bo5uNSfi22g8rsBxqMA5hdsDJmt%2F4c%2FNfGhoqF%2BtaunlZgOcZUiDh%2BjCzrXHk7y8cppnzSV5P%2BJ7u8%2FlzEMtH4ULMjkj2T3lN2ZYCkvLOM0HFAuzJ6Mgca77V8UXuCfys5vzD2GX1W707KNpD79qAegIggcInIVGuCujxOsDoZJDEM3mHpg1TIf5d2D0TmRb0Bfil8cCvzk&X-Amz-Signature=4a2b959098c31975d6377a67f13b744ac8a6137013337a665ce2813a8deece78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

