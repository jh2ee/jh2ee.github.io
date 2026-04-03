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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SABXAEZN%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC4ofzYG1q3anNMKVvgk8aM8fuiD6IJvnJ7KkXXUsLH2gIhANp%2BaFJfNn1ho%2Bqw6yGdjSHIYjlSkHBtct26OhMqDUiAKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxSi%2BAoFIMo5Pva%2BKsq3AOgkDlRTexMXRiK6cZOYzPUKl41mk9VM1BNnzMFBYL8hxa%2Bb1mbcN0zBl0PLFmLJ81AXKWuJ2VfL0UuyNLoflcOrL%2Fcj4R%2FPQ3mFlKYVQgYWmNZQSpQQfiwijpwtRaWiJETeBSmpUY2tHu%2FBGzzuPhgSUl9WKxa5ZCCHSNiOHwV%2F5ZLkiPiosTGrTZYUTiIqUvh2NYN2nsZ68pDIyIWxoP5O6kMAmdB5GX%2FzI7VwEkdvchivUqBPpwTJh80koVGzOJMZKgYv1ovkpCk%2BrC85ZCIykNtT3vsCEMW%2F1PoIJpw9maUCjUMlrCLBMph6UB4qNbKG39jAY6aga3D9kS6M8SQfMPmYyjhw2p25xwfSNpzlJFUmbo3HLW2vl8%2BZ3xH6XRg%2B7lsxbBVr7yXUP2MdBZwV49%2FLHfGz8XCOUrOIC9QjbaNUFzNLp9bWxoVoFBItNetTR7857TUBRkzyBWcRJ9%2B7YqWK1ilrwtY6s%2BvP5d%2BdAGjh%2B9lUZ904bcxQn2qxOCXmFguEduVe9cqpfBY%2B%2BSFkUYFvg1xBVQZLE1lqBCQ10Nkb3Aa7%2BsuBrpDxsyf4xC8ne3Y8Fb%2BdWd81Ihz7UOjVuwfxBkmrtZFyzpCdAUFgdvQEJlmGDLXuy%2F5%2FTCHgb7OBjqkASlZG%2Fz8uNEK2d1WrP3LOWhknjLKlF8HHmRFj1eKpogR87uk8g3EKR5lCyxXsY%2BBd9PU1U2qr32pNq5w%2Bb7ehB5PpCG%2B2OqFCBV2RyDQdX%2BHfQZA6KRc%2B6yWnGpIOIYjPvFar3jdEmNch88fz14L2bfZaUw%2BGyUaUnlh68xV9Jikf%2FkBsGovyQq5aGS88jEk0%2FWWxpuzLoCxI3ZH1cZU4bOWr9GY&X-Amz-Signature=99f2cfccbe633633ec8139de751996e5534b8ba9359b9a56c88b2778da9d808b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SABXAEZN%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC4ofzYG1q3anNMKVvgk8aM8fuiD6IJvnJ7KkXXUsLH2gIhANp%2BaFJfNn1ho%2Bqw6yGdjSHIYjlSkHBtct26OhMqDUiAKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxSi%2BAoFIMo5Pva%2BKsq3AOgkDlRTexMXRiK6cZOYzPUKl41mk9VM1BNnzMFBYL8hxa%2Bb1mbcN0zBl0PLFmLJ81AXKWuJ2VfL0UuyNLoflcOrL%2Fcj4R%2FPQ3mFlKYVQgYWmNZQSpQQfiwijpwtRaWiJETeBSmpUY2tHu%2FBGzzuPhgSUl9WKxa5ZCCHSNiOHwV%2F5ZLkiPiosTGrTZYUTiIqUvh2NYN2nsZ68pDIyIWxoP5O6kMAmdB5GX%2FzI7VwEkdvchivUqBPpwTJh80koVGzOJMZKgYv1ovkpCk%2BrC85ZCIykNtT3vsCEMW%2F1PoIJpw9maUCjUMlrCLBMph6UB4qNbKG39jAY6aga3D9kS6M8SQfMPmYyjhw2p25xwfSNpzlJFUmbo3HLW2vl8%2BZ3xH6XRg%2B7lsxbBVr7yXUP2MdBZwV49%2FLHfGz8XCOUrOIC9QjbaNUFzNLp9bWxoVoFBItNetTR7857TUBRkzyBWcRJ9%2B7YqWK1ilrwtY6s%2BvP5d%2BdAGjh%2B9lUZ904bcxQn2qxOCXmFguEduVe9cqpfBY%2B%2BSFkUYFvg1xBVQZLE1lqBCQ10Nkb3Aa7%2BsuBrpDxsyf4xC8ne3Y8Fb%2BdWd81Ihz7UOjVuwfxBkmrtZFyzpCdAUFgdvQEJlmGDLXuy%2F5%2FTCHgb7OBjqkASlZG%2Fz8uNEK2d1WrP3LOWhknjLKlF8HHmRFj1eKpogR87uk8g3EKR5lCyxXsY%2BBd9PU1U2qr32pNq5w%2Bb7ehB5PpCG%2B2OqFCBV2RyDQdX%2BHfQZA6KRc%2B6yWnGpIOIYjPvFar3jdEmNch88fz14L2bfZaUw%2BGyUaUnlh68xV9Jikf%2FkBsGovyQq5aGS88jEk0%2FWWxpuzLoCxI3ZH1cZU4bOWr9GY&X-Amz-Signature=99f2cfccbe633633ec8139de751996e5534b8ba9359b9a56c88b2778da9d808b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJNVVG7S%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCNDfHrnfF7gsBidCHa%2FlhdFmXUX4bGfgCNnhSHP08FigIhAI7%2BEQ%2BR%2F6MAqmOswNQEj6n0y3%2FlkBYnMhaGlqHvLfGOKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy57dF3NH82fQwZHIkq3AMYzX3lJavoXDcTaeIilhG%2FUhSNe4TNewef6Jt%2BnPfNPhPLNw4FeJnQh3hkkPCDktnfVYk4iaJk6e5ILNY%2FvbAy7qn5CrE39rEppDfTU1dzVmD%2F1pmQvxQi4X5Ze1lS0w%2BYJZ%2FJXEqM6RbY9bMfo6LOmX0BI17xrYJS4PKqmSavZOgINMm2kmuD3BrCXu%2FEcHP4BcinfnxY%2FrDB5rlEPm2HN4Hs7Yy1r6kGZPI33N%2F%2F8YcR1Ah5w6vq0ETTOqTyXnyf9fEHiuBCn8McHGnxffja5vUQ1Vco3HsZAzuI%2FiFNaF3VDT1DWpjhJTGKqiStG%2Bc%2FGIRCw0i9neuPYdd5W5omb3R5fUzl5yx%2FM2bZjY6WNAUpQeXAK3b7PlR7%2FzUEvZwd5j9aHxdoxLC4C8fZ4bzopAl6BpewDxOSK2zF6pR%2Bu8ALyaDsPemaJ0TWpdObXC%2BQG4hvrkkB1WoPagEBZGhqpK%2BEod8I0Nn34cYPSR5%2FSLwgkOAzto8GpSTtjmmF5tpxdrIQxWORkojGK5kqMurIct19cIaIj5gzsmYTJhkMkVT3OtG5mA5txcJt6WH54lXcH%2Bg14vzJWlWkjTDxRgqAGnAPuCvxLi%2B3M5QYbgIbJorQfvYI7NVyVad9%2BzCxgL7OBjqkAStuXgAasMDYeUxqBaBOd9K%2BJ45nmb4OwZXKE2xj3VroJNCGsmmGQ8d7vIKAR6APpN3fiUFC06ik%2FY8ZjeegXc3Ibp0x%2BGhyIlzxVxfp8ZFnXzcmToUibeeEbnEymlMr%2FjPtCaEvb4nd0iG3pVYU5rRNgnAPmlAQs7JHFS0S7wspma%2F9QRcWHh0Chy7FxrKKxfxIHuOqWoVUB9UIlgSGU38cPxf2&X-Amz-Signature=18942e06aa1feec3a88db680808c369f4a0f67736b09835c461593252cd7d82a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QC2LTO3W%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDfGhh1hNhR2HrpnZn4pqvP38Ahz0pKMICEKKsaMI8jxAIgUd5pkRIJVB%2BpMDXV3R6sKZ8u0UUcggUnv5ypp5Qzp5gqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNTcWuYVJa0P%2BBRpZSrcA8x7f5UJBl6zCkx9Ku%2FuvzG2uc2bGTUVp7HsnCJGhq6P3Ri9Q5B4fWKbzDrqz1qZe5OCNcn6kfBGYs8NHHpdUwjtQULuHVRaydPLC5xjaCg48wnEq0VsJVe%2F7zRSYszrzQ%2FDZHtRJ008O%2Fha7SEYbh5knjDou7WXtF9c9sR1CFAbexIaxP9htTdzY28ro%2FPjDnRvNSJbJ%2BwFUTDcewA1S2VjS%2BnhP6aP4qB7aYiVVYylHqqWL0pAsxmbU%2Fj0L4BMauPEz63ELvzLSE9d8U0CNo3D8%2BO4xFOab3LlP0rVmjq%2Bm%2BHAB4vmAlED6O6hZngclPfeScNP2zP70UaToFOUYwkTAxuXsFn7QpTrSeKvFW91doQ3DFlL87kM9YfCmC8MMuvtzBTJb3ReMrvDBgwOt91Axno3Iu4UkM%2BPOzPEylMIHgta2INzIaiNo2vTzQEV66lLHRfLsQvnaWb%2FzovctqfnNSrbL%2FllfbsRcyC779esKoIqcP%2FxGJ9lLW6YfA6%2BQPv79TxrybWbx%2B9GXGW0%2F6YlkaAnNnEj4wuq3jZPO4R4j89saW1X30avqNSsDbdEae5TUVH7tx60UQE%2Be4Q3m5xkDq7X3%2FN7wug6XlglMWrCygO5uLSs%2FACETzI3MLn%2Fvc4GOqUB5I%2Fqqeg3RvWteFmoGQ2SPt2d8R7woZk0e0G2W44HzffTtK%2B7FBgnQDEMH7Q16hSqbEt%2FPphe%2F9EpCgtljh6xdct0ycI8%2BfAOVN1TtRJ%2FIuJ4KIAbtZLJQs4ZkAtNJGG4iV8gQM1232%2FlJRTAN7vvb%2Bz3zSY44U5K%2BtC%2BB34pOWgxnlAX0eTHU3F%2Fz%2FJ521pkkPqpE8XyFVIXKDohPeBrRrZFrmIs&X-Amz-Signature=4eef91f0361bb84ded6ec407dfa857ea4ac9c2de50d15b54f61d5ff00865f7ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QC2LTO3W%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDfGhh1hNhR2HrpnZn4pqvP38Ahz0pKMICEKKsaMI8jxAIgUd5pkRIJVB%2BpMDXV3R6sKZ8u0UUcggUnv5ypp5Qzp5gqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNTcWuYVJa0P%2BBRpZSrcA8x7f5UJBl6zCkx9Ku%2FuvzG2uc2bGTUVp7HsnCJGhq6P3Ri9Q5B4fWKbzDrqz1qZe5OCNcn6kfBGYs8NHHpdUwjtQULuHVRaydPLC5xjaCg48wnEq0VsJVe%2F7zRSYszrzQ%2FDZHtRJ008O%2Fha7SEYbh5knjDou7WXtF9c9sR1CFAbexIaxP9htTdzY28ro%2FPjDnRvNSJbJ%2BwFUTDcewA1S2VjS%2BnhP6aP4qB7aYiVVYylHqqWL0pAsxmbU%2Fj0L4BMauPEz63ELvzLSE9d8U0CNo3D8%2BO4xFOab3LlP0rVmjq%2Bm%2BHAB4vmAlED6O6hZngclPfeScNP2zP70UaToFOUYwkTAxuXsFn7QpTrSeKvFW91doQ3DFlL87kM9YfCmC8MMuvtzBTJb3ReMrvDBgwOt91Axno3Iu4UkM%2BPOzPEylMIHgta2INzIaiNo2vTzQEV66lLHRfLsQvnaWb%2FzovctqfnNSrbL%2FllfbsRcyC779esKoIqcP%2FxGJ9lLW6YfA6%2BQPv79TxrybWbx%2B9GXGW0%2F6YlkaAnNnEj4wuq3jZPO4R4j89saW1X30avqNSsDbdEae5TUVH7tx60UQE%2Be4Q3m5xkDq7X3%2FN7wug6XlglMWrCygO5uLSs%2FACETzI3MLn%2Fvc4GOqUB5I%2Fqqeg3RvWteFmoGQ2SPt2d8R7woZk0e0G2W44HzffTtK%2B7FBgnQDEMH7Q16hSqbEt%2FPphe%2F9EpCgtljh6xdct0ycI8%2BfAOVN1TtRJ%2FIuJ4KIAbtZLJQs4ZkAtNJGG4iV8gQM1232%2FlJRTAN7vvb%2Bz3zSY44U5K%2BtC%2BB34pOWgxnlAX0eTHU3F%2Fz%2FJ521pkkPqpE8XyFVIXKDohPeBrRrZFrmIs&X-Amz-Signature=70c49e5ac550aa5970805f891b2ef7557986cddc07a54d760cb2b137445d28fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6YUXI2E%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC8zmkhqE%2FHMkQfy5meC1JwxE3PgkfBVIwjpb1HaYfX0AIgEpodLcuqhtBfQ3mGxEmE%2Fu0qcxcB20q9EXW6EFuyOlwqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJs7R04bSEX7z79f8SrcA9bAZfFW7ZZUA6zQxattiUzgI%2FNQcwgHdvYdQoLAnaHS8VvTzcn94QsAqVa%2BccPlR476Rr9LZnRTqlF6RR1RP38m3H8epDEwVQNSIrWVZfEGKNxmXs%2B4bjss6pgs54YVcnnZHixqmxwsr1MSbZmywkV4F7CjS%2F9koguVjMfMoLCo7ro%2Fsjnn042txFzb8fq0KFoBaGqaJTH80IwoNz1xsS6BYw9CDsPs01hSmkEAtRC01sRDXRMJnNy5t7K9sdeWc7IDbe08hJxb2CFIy9aAo1FfpTMNsGbf884I33G41P%2FXnFhY24vwro0Twe4Aelb2VKJpmZn3miYjZtRDBQBpffSnbyG1SfB7GhtE6AciASNncn6r6%2BhlqEJh3%2B%2F%2Fc2sreWReC12BghvD2hC3KvjzJ0TBBL1Ecuo0oIcvEvHTaOG8fV8ZFaG66Rmkgizq4hEHeDPuRa1LJxgO424H4Sz4%2BK%2F289BuzKyLIOH%2Br%2FO9qeMe288MpI2lIhdCnTvK3yijFCoJ9hnaG4bdfJJBe%2BRhcv5H36SH41TJsANLsPKHZIsIxOjaxqxVtXL8RTfiyiIwFFoFPQBm46bi%2FGUy9pJxSBjkD38TGq2kCbKJleqDpM4w6PH48YCCbpCmipCaMLqBvs4GOqUB%2FxER2hca0kJzaTl66LsWKIaXkX4PI1rTkWgRA352yTLvXWD9g1VgyqGYYft4cQQQFu2l0XqGfYC8aEdDhist9oWg%2FuhP3pm9pFoT07QjfiPPfNW2D9nfiat5a3GHQR6gV6VEE87uGdg6ZfQFj9m6RbIUK4sHW88ThpGFqgOoBv085H%2BxzovqMyt4ZOd2sl%2F6JLPt4vXk7Vx%2FRyj31ZhWtJyH3Dv8&X-Amz-Signature=1459748927bf2b25e43c3011597af1a97f808041de544322b0b37e4f0df04a6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNVCW4ZA%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCj7tTV7WhQnIbHv%2BYwXwm7OpED5tEBq8UYMTSD6e1fqAIgPM3tXXuctt6KuTNnhk68JsgSnujAdk53TdImmfuRSTsqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHCoDMVhVspsdBXo%2BircA47heyOHTE3ZEwu28P55EWVpRzy9i9KNc0QHH2S07oCAttl08P0UikQn7EaL2p7vf1437i%2FLqzb2DmO9scOMcxD4VB%2BYu3gZJKUBCFQpyMJnxaXCh%2FB2JwETPMdJ4y5N3%2FHejPw77igwDltF06dCo2Xt%2FKtHrXyK7EXdGAW4D1bqqtar9CUDyRVyGJlCLpCizJgU2lGt7pJRB26dwwO444XnDExMbaBu6VqeQJog2CZsWCh6GuPfQeQF%2B3%2F63Wp3V3PWsO1joDaxWkozlveJWNs51HDSsidVJNSz1vbFDZCxvDBqSB7k%2FXe0XmFaKSEe5KLQw3gE0B07rqFwESKr%2BJRaf63HFhU4R2dKSL9T9ql7h%2FK2VRfT7YGReiHOyRXiEqkb9V7PB6ayLwzKSaDdNOG0WiyyKZvD%2FYMngKrukOmTIyyjUS91O26mJavfREOhRve4UjrOlzcR%2Bl6gJz7hl%2B45ybZ%2BtlIEmEf0sHZ179JVypfL83rtUtP%2Be2U%2Fta2oOZWWB06B%2FFevvRCvfIsTkIMcMM8Zjr1oToPA6fUPb%2BQiUJlgdSPSaPIe9fERmd1FiKwxbumeLn0vtDhf%2FHsGTl6ziw%2FajHhTzbalelC%2FMvn9gJM7z%2FVYXVxNEFDCMKD%2Fvc4GOqUBWYwYFh5KAxJTvgF4NSrIiNz212BreOByABjNkm%2FYvcUA0UakUPP7Ut6EZZnRdwACCaZx%2BbO4Q5Gsj5JVxlhrcdobpognCPr29A1uk%2BdCBQDgKBeGMCNys7ya8Pfkgj9GrfOqQ%2FaI9dkTHwMifHEHtOdEn6Alfhd9z0DPXNVYyygcfET1PiTmuvLaJgdXPzpBZpsZLky8j3KfPohWTbgCeSN35Zsq&X-Amz-Signature=b591e5d8c3172a3588451bd4c7fa77a2ac79e7b170478ee6f3e72eaafe11ab15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJVYK5DC%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC0%2B14dVxhLc%2Bg7OSRZD4P2T%2BfA98Mn8Vi2vEPU8x7NTAIhALRrEstJ%2FOGNQwakT1PiG2eohAMn0Nr5yGMuRfXzM8VZKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzg5rRXG0BJsB%2FKuwIq3APOyGTII4st6qFfMGan1n3mHDNIrDUxz27FvBOkh3NJ4V4fLlJqycWhoXpFJrBsiLvr5BZr%2FqjU7eVcqCXtwm6QQrMsJyZ6%2BtiiqSaqs0KEAadU71XJfC82GFWlhUeRn15IUtV45oWR%2Fv6WGQJhCPwTu8Zeu2Kbbxa8ogp5C2Hx6BE9bO%2FzW7QFafO1Bbotv4IjJDMOZlHP073Hw44i2xGJ2i7rMcXEn07TakZ6uwyPUKLoIVr%2B3uWQpWlJRVh2DaZrYpGOT%2FRfHtQy%2FZ7DL3ZqB5W2uyjMNiFAfEMAJo7gLCek%2Fl0yo9XxQm46b2gt%2BXJwSRNFBqfUCVs%2B8c68cFtJ4WwV16UInwvTI%2BEPkWc12%2FjKU%2F9uZKVk0%2FzyzoROWXnU8YY%2FH4Z5Rp%2F%2Bo3bhRWzt8VhzrFsqXUCqgDFGzSo%2FJX9szYFhRBEK6F714W%2FZq1t7cKhe7GEoXUE26U9eOaIqDb3FLKbUryM8cW7EbCotAbaFPcFSSa92kweOKwMdjzliTspnTpxZj56koOh3w20XO5YUC7P42Gs4r3WqxlXWcvZRlMBV0FXlYB1hjTN2yRpdD3djCgOl3i4Jo%2BgS5hNgM9Og12H3uQMaAnFUx%2Fms3jxdBZaR%2FydrfndiXjCP%2F73OBjqkAbkOP94wKYIwvLE0Q7U3InMaC3Y8LDJcuuXZi%2BTgQXyodNikLjGa3S5XY9lXeA7A8kTEXRII2YC6sA%2FnG7DtJNJ7vgljxN4yKqHQqebJInCOqKW0I4IbYhtnuA3M4qkczCApsO3xF1sKYZLybcX8BNxeUywHOpWEd2S1jRLRZdEPHIaDaxrvjWsbuF3b42b1JtKSyegU%2BrBEryqdjhCvF3ylUPor&X-Amz-Signature=0ab20f1d96a29cec46a78656cc09a0ef2f5f6152595c7ea607dcf63436081504&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466534LOYEO%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGGgCKH93sNwFVntmWR621Epkw1l0JBLnCdj99UyULcpAiEA43CerLewEG%2BTil37O0Is8qkFvzCl36vNpAQ0XIeOEEEqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO0XBlh2b5VzQPKyLSrcA091%2BmqXra7dFAW6wBcLRT2A%2FlD%2Fr7yjOjLkkWu8W3UBpCi4Cr1X%2BKQaT23tIPuBYmxc3NR3j31aKCaSMZsvbI6%2BHcSVZnZ49Jl3nxJ%2BVWVIM91BYh5ICneGkcO8VLD75eB1dan9LSlnDX3sIDaYRad7d1cTe7h%2FeExhWpcJr4qFYjdGuo41KOQPH0AE3G7P57xvJL9iOao%2Bc98T5%2BPTCEfib9nl0Fl4U7i4JWW9bBNfcjLBu3dTqXNGKlTPlGkpiyXRnKqu5RuQJBhsYNYjMqOjjSPeBa2Jcipybvof7DhwPJohDymktGC%2FehlPoIDQ0K4v0%2FMPdMafhgngwk4%2FSQmpR7nby0bbU7FT3ajyei0NmYpy5zV5N3k%2FLHjB4ALa8NbltigqvAjhtTeKPZMTyd2SS%2B2QocAJ4GZymJrv6Lc5k096oOHYkUcKhjVEpPOyLe9FPxOMALY08O6NVPhGQxtiOoFnHIWw1TwHAXnsbMSjPGhvoBxiKbG5hgrWaYt9RWAYY%2FBra80hBoDEIDXsuXrQsqDz1FvOERkRaTh5tGyALCwhe3sUbf4FWxYshmYtWPP2BnR9jOIWNsfCej657vZ2ApKBk8bKy9BWdG0PVOSDZg85f7zUmZgpVubeMMf%2Fvc4GOqUBHrV2iwzfCguCZf1xvi1zIML%2FKpL2UM%2FmM86yOeQ8W5IFSDAsyEp3pIvdyozBd38tLji6oFT%2BGk1bubiKQgpwM6tDVfpwsvp5NxxDb39CHNcjTjZxWkfNq7IHZyqUecCAKjUT175XKWU24iihASktNa96xqbHAQ6S8bEQUo%2BOgCO5ZkCmbcvthHc%2BgJIOernj8HX3XuSIaYi5m3ywkA3AdMMle6cf&X-Amz-Signature=35772c4b4b649481339937f437cc2266075be77a3acaf5ca6a0b3441d62a4f46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466534LOYEO%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGGgCKH93sNwFVntmWR621Epkw1l0JBLnCdj99UyULcpAiEA43CerLewEG%2BTil37O0Is8qkFvzCl36vNpAQ0XIeOEEEqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO0XBlh2b5VzQPKyLSrcA091%2BmqXra7dFAW6wBcLRT2A%2FlD%2Fr7yjOjLkkWu8W3UBpCi4Cr1X%2BKQaT23tIPuBYmxc3NR3j31aKCaSMZsvbI6%2BHcSVZnZ49Jl3nxJ%2BVWVIM91BYh5ICneGkcO8VLD75eB1dan9LSlnDX3sIDaYRad7d1cTe7h%2FeExhWpcJr4qFYjdGuo41KOQPH0AE3G7P57xvJL9iOao%2Bc98T5%2BPTCEfib9nl0Fl4U7i4JWW9bBNfcjLBu3dTqXNGKlTPlGkpiyXRnKqu5RuQJBhsYNYjMqOjjSPeBa2Jcipybvof7DhwPJohDymktGC%2FehlPoIDQ0K4v0%2FMPdMafhgngwk4%2FSQmpR7nby0bbU7FT3ajyei0NmYpy5zV5N3k%2FLHjB4ALa8NbltigqvAjhtTeKPZMTyd2SS%2B2QocAJ4GZymJrv6Lc5k096oOHYkUcKhjVEpPOyLe9FPxOMALY08O6NVPhGQxtiOoFnHIWw1TwHAXnsbMSjPGhvoBxiKbG5hgrWaYt9RWAYY%2FBra80hBoDEIDXsuXrQsqDz1FvOERkRaTh5tGyALCwhe3sUbf4FWxYshmYtWPP2BnR9jOIWNsfCej657vZ2ApKBk8bKy9BWdG0PVOSDZg85f7zUmZgpVubeMMf%2Fvc4GOqUBHrV2iwzfCguCZf1xvi1zIML%2FKpL2UM%2FmM86yOeQ8W5IFSDAsyEp3pIvdyozBd38tLji6oFT%2BGk1bubiKQgpwM6tDVfpwsvp5NxxDb39CHNcjTjZxWkfNq7IHZyqUecCAKjUT175XKWU24iihASktNa96xqbHAQ6S8bEQUo%2BOgCO5ZkCmbcvthHc%2BgJIOernj8HX3XuSIaYi5m3ywkA3AdMMle6cf&X-Amz-Signature=f2cff8782e5ccf005d8a5d003150989ebae0b7cf88395af3e2c9d2f32fc5be58&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRHRMG2M%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBLyxtaNbK2WrY15FzX1aXKwUkaBTEXPv%2BVpVy4o9BU2AiBswnC6ShN49mKnWJOkbaNSTRYk4M45mpYViDK%2Bfqxz6CqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLl7GI4y7tkPNUDm4KtwDjpgB0OkWcElIx8a2AUR6hWv4FoYQeJwgjbLOqaxrgAndAAnNgpaqjXbhsCfCvKrYy54p5t0GXXjaq%2FYgNBU4gOPvOaOuhjQFLClrwDRkI41dlFJXEm99IMREKtdIqPqlXvuTfEA12mHWfww4lo5gX%2FQZ1sP7sPclqngWzr7H4LrMlfNfkJXBy%2FYz97ZSP4rX%2F0i%2FpCvmKoG7n01CpJ%2FV5AGWihNpsHEPXu0XYXGm%2BcyMofzHK8VR9dnvI1%2Bmcxpv7a1iC3dGVzwkOwMml8uorxlpOnIWuzAZDa5quy3IOyS2PdJjgiSg01Sy0piGiaL59PvkpWzv2LWJJeU2GL%2BA0AMvR%2FBnny5FV1%2F%2BNvS%2FlU64OvZkXY4%2FsmkyBv9teX6CdQLgZGd%2Bhxh0mfeWIAQuEm3BnnJHx%2BGEInQo3mRxTXz%2FYvCc4ns1TLeeJuzBzyRk73MtpWSQ33JHR1WXCU8K9nJA2Z%2FrnMr27%2Bk%2FtdP0sR%2B45z6XoflaSmRbeUq%2Be2GzxFWxFD3i%2Bxiv4wUSaEWyEt2BXocvxUS0G2Imq5t2fL%2B%2FIcxe3pXj7FeySoiT1U1kCl6Y2rvxQImnaoKfQ%2BG3oI9aAoxtHlHHqYf7r7n5BOyhR6mcwFNCNfCd7Msw7f%2B9zgY6pgEEFAW%2FzR7SdDxFAULyw8icCKEFm1DjpyojdaqTVWqwgt3PH54ArMCCgmVyz4M%2BuKwTibE%2BvHritIWypbMYAbDvf1%2ByHHy%2BlNvrMDYYpkO8V9LbG%2FsWrhy4DIzzEIY1Nyd9hGJAhPdceRhAsywIP2IySn5mjmj%2FC%2BojW25d4HfttjFYx9i8c8xejNvjoBpGKgIqPWA7NoKfkRMzh0zgKRSaOT9grDNW&X-Amz-Signature=4cfaf086f4dabc7442c23721e2c5cd5e02e942952e58b327ee2e73caf9ad1b4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JVNG4KJ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCcYOshHFFIpUEyvbiIKHaymvPizWWRV9khV9eCWgGvSgIhAPQZH1P6TlrGVWJqNYtbF3p0NppiCL6qwIDX91jaR8YpKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwA17MdosSQtXnyzk4q3AM2z6jrNXsCsTrT%2B1Ru6Fir%2FdXvgdKy%2BVh8AmsuK%2BruguDwnXXUM5UlyNMoGb2aof%2FM7%2Fnc%2Fp7YBmOwAif2fIJRES%2Fi8rTqUeVEQ%2Bgepp1J6xRlvglEx9pTywocvXv1iGy8ZObrGgjnDno8wM8GiyytVP07SgTlbxEb0zmqlYympHlz0SWgMR33%2F0MexoYcGPeSdvvNBPWQaljUcHBrqXzjTy69H6B0XKKrm9PA9MtH7XHU%2BnMsZmDLa%2FZBb1qEp1gfHtrR29Ck%2BuFooT72huqE%2B9%2BnWfepIeLJe50ICTAYq61ccFKDQEzqy3e92K77Fv6htXuqzP1DUXA7sI8sFfDUHpBb%2BtjEwfIQamIYA5hHSgemK3SSvDMpFhtyKzDSeU%2BUVIDBZAcVG%2F9iBuijv7n0MbRE9fNFcMAOhJi7Tt5qsuGk5HMdNsPLo3NbptGHZiZY3764ht5dlvg93phgyK38p4gE83loHr1JGDnZ8tO8lcjqAHrh5V51ag4GPieCXqyUR9iGMYZzuc0xscE3Ky9MBCFJnjUtf36JXcrgGfLmt46ybfkuWZkQpjNVpPc0IG%2Be60a4RG97M5KXdmXgbJmp73izU8r8Pq10XgTlTPg2XyCrwO694fFj1tdanDCBgr7OBjqkAc5jG61xPQj%2FN1EaclMz%2FgjVdW6z7iV2KmvDTneh1HnM6ql%2Bk0j5ik%2BGEynZ%2BGAyslX9%2BqTOcWYR5BeeolLI5Z4Fc9KP%2Fn4K6ofY%2FNz5IwI5dnjvgjPPjFEx8LdGZcJjMXNPLzYN68Io3uxiAOvY7lt288cJh%2BFu21YkHxKpVW1uj7MwbUHtXMVOBkQi%2BgH4KMhlCEvaf4w2ahlJXrxC9ym1l%2FbP&X-Amz-Signature=882e9f4475931896e393960835eaa9a87349124869363057abd9a7755ce46c3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JVNG4KJ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCcYOshHFFIpUEyvbiIKHaymvPizWWRV9khV9eCWgGvSgIhAPQZH1P6TlrGVWJqNYtbF3p0NppiCL6qwIDX91jaR8YpKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwA17MdosSQtXnyzk4q3AM2z6jrNXsCsTrT%2B1Ru6Fir%2FdXvgdKy%2BVh8AmsuK%2BruguDwnXXUM5UlyNMoGb2aof%2FM7%2Fnc%2Fp7YBmOwAif2fIJRES%2Fi8rTqUeVEQ%2Bgepp1J6xRlvglEx9pTywocvXv1iGy8ZObrGgjnDno8wM8GiyytVP07SgTlbxEb0zmqlYympHlz0SWgMR33%2F0MexoYcGPeSdvvNBPWQaljUcHBrqXzjTy69H6B0XKKrm9PA9MtH7XHU%2BnMsZmDLa%2FZBb1qEp1gfHtrR29Ck%2BuFooT72huqE%2B9%2BnWfepIeLJe50ICTAYq61ccFKDQEzqy3e92K77Fv6htXuqzP1DUXA7sI8sFfDUHpBb%2BtjEwfIQamIYA5hHSgemK3SSvDMpFhtyKzDSeU%2BUVIDBZAcVG%2F9iBuijv7n0MbRE9fNFcMAOhJi7Tt5qsuGk5HMdNsPLo3NbptGHZiZY3764ht5dlvg93phgyK38p4gE83loHr1JGDnZ8tO8lcjqAHrh5V51ag4GPieCXqyUR9iGMYZzuc0xscE3Ky9MBCFJnjUtf36JXcrgGfLmt46ybfkuWZkQpjNVpPc0IG%2Be60a4RG97M5KXdmXgbJmp73izU8r8Pq10XgTlTPg2XyCrwO694fFj1tdanDCBgr7OBjqkAc5jG61xPQj%2FN1EaclMz%2FgjVdW6z7iV2KmvDTneh1HnM6ql%2Bk0j5ik%2BGEynZ%2BGAyslX9%2BqTOcWYR5BeeolLI5Z4Fc9KP%2Fn4K6ofY%2FNz5IwI5dnjvgjPPjFEx8LdGZcJjMXNPLzYN68Io3uxiAOvY7lt288cJh%2BFu21YkHxKpVW1uj7MwbUHtXMVOBkQi%2BgH4KMhlCEvaf4w2ahlJXrxC9ym1l%2FbP&X-Amz-Signature=882e9f4475931896e393960835eaa9a87349124869363057abd9a7755ce46c3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TBVE42U%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T094114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFcNLvtuxtuJv82cO4AcbsiiMkRnsH%2BmIGAFo8zNCFgCAiBKoqznHxUm0EHRiood1%2BYULHNul8mpc347P1nPcoqhxiqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMGZfRCYEyg%2Ba4frHBKtwDrt%2Bw%2BZXhi0xS5SPE6KldkA4e4N%2BXaVm4ZH4Uk9ccHNwy5hn3o7%2B%2F69n55EA8UYWTi5ABpDUs6iM6MOgKBWdOcqp0NCTtwdcK2GK4joS%2Bn44XAf%2FKVLMmaWBk1Flh5UkE0T0oHWKPGWDrcfVhbez48a5IIcxbRPEIZh1kQSeJvvy19S3ZTsdfvqbMKwbC5TZqpD356MivOEdDQTC6NlfMlrMa9B79XXgvbg%2Bw5%2BI9f3YRb%2BNjDScAe3SVCkV097bOKwadfpGdFs8QhrD2o0Mf%2FWfh%2BLk7BHp%2BaurufA%2BdUDNlB9wvL5gpmYM%2B7jGjDHJIDHUHymichvX7YS56iHDd6Chm1xbtapusuXTrC1sp0GyHPtPGMgGyeDSTzy5CxrkHsJ3DHc0gSFDuABoaJNSiJziyjNFtcXD98UvEKLvPuD3sh5ASyW9cNIpflnQQgm6vtXSU5X05U3kaA9h7ok7JR1R1fYSZTuNgyFJI8qJyaoxLTZSo2Elph7O3JYDtFud2l0g87QIh%2BE4uJABSKp3hDLw5c1mLJTV%2F%2FEQlrsKO%2Fcrh6ywMFBgfZlt3kwWwJ5qMqTE9K%2F4hcP8T6gUw6fHm2RyL0WrZMRzLaWsTBUg4r9EoQgtNAOOKJkFeqJ0w74G%2BzgY6pgEPTZB9H%2FADUCkmFg0s5xRllxWgoG2ohb4a8dABoExvO%2BX99E09ltgqeJMWBZNw4M%2FLx84z54VBN1S42Q1fsS90qZFWZ7KIibFAil4TCL35%2FlRBz5KPNMjgTtA0Gr5IBx%2FL2CrNe1w8IzQdV%2BS6sick4T0pKI4gQcr6lfu7ojy693Tgjmxo2%2BpYkiVzOlOoEQVhLOBtL5l90pt5%2FtkOOjsnFD%2BJyc88&X-Amz-Signature=c318d6ccd1d3e01f98fac919829fca7710b5bb758138881ff61239b20de4b801&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

