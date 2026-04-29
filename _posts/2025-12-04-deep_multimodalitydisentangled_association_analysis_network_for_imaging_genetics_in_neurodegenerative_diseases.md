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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDEW3BVN%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQCKPJ3qMwD1r%2Fxnal9hTqTOoRhOsm3fjRcu6ni7rUw2ZwIhAKNlmeT9hokNfenJFamb0uns49%2BflJxpPflcSAru9OJyKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxa4Qlljl0%2Bhy476T4q3ANJV9vIvewIsQUDuXT%2Fi%2F23Boqb8K1c23FidoobAaOJfVnywjRAVZYM8Fj5z269VmDdE%2Fb3sNUnTBQPxLK2%2FYmynka9WYl0rsvHMRR5BIVXnOeuHJFcEpBXCMtr%2FZJl6nBbNTn4yk1n1pAkT6ckuZ1BIo8e8ZowuOMiSeS9CtGlCrRs944jb7nun8NGc8Ybr8ruYcelRO9aTZFZKM1bi7RyGpvD8Tqe0eciic9metFLcDUAKeSNV0oq7ivHAe4TwIQlJSAboeOKj%2BtroI%2BoOj4RIr3rp9sRgkyarqrs2Ew026xDCVWnwbDdVSBTqcK0QDUqPM4eW2dDjD12fE9M8Xa5H7sVO5cPuWgLTZwvuJHN1e9Hzd8KmaczleaXqlHSuOixgF02K4OBe5Orkq8aGXolgbFI8uFGlpt27fCPZX49C3YgxCuHRK4ztxYX8oKca4beqPII7kP%2FeIE3i%2BktD3U6AjRNaUb%2B9wIUdvdJgV%2BcVHmMOyC5CrLQunxh4PMZnKtkA2VE5A5uXrV3t4TWycw%2FtAMyyLLOglQjun7lM1D3r60%2BCQb1APINj5r%2FT0gaMvoudQ0PykyHigVYKTP4hMqyO0W653jt76QpsYs6%2FcX5qADDsr8WHdtRfztXSDC%2Fn8nPBjqkAchD37oDiHbyPx1wxT9L1D%2Fm7XYXSpBV0QC32ZPT5K34liWhVKJo9UMoz80UuoAXwNB%2FWkHMi8K0F0Vl%2B%2BAGJ90UETh7ZUbYuljCbMKvZDf8Med7mGfVlBmeZUojYF%2BsvEsY3mScMpFgIUx0O8C5X0t6HYzoPyvyYOuUOwR4oJamwSxSzUfzrCA%2F%2B9KRssGpqQdcIfXY2jLkQoTUXUIs79AZxzTS&X-Amz-Signature=937cbc36081f599d144c9b9fae943964607d4aeb178b88a1fb4748e1654ed4db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDEW3BVN%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQCKPJ3qMwD1r%2Fxnal9hTqTOoRhOsm3fjRcu6ni7rUw2ZwIhAKNlmeT9hokNfenJFamb0uns49%2BflJxpPflcSAru9OJyKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxa4Qlljl0%2Bhy476T4q3ANJV9vIvewIsQUDuXT%2Fi%2F23Boqb8K1c23FidoobAaOJfVnywjRAVZYM8Fj5z269VmDdE%2Fb3sNUnTBQPxLK2%2FYmynka9WYl0rsvHMRR5BIVXnOeuHJFcEpBXCMtr%2FZJl6nBbNTn4yk1n1pAkT6ckuZ1BIo8e8ZowuOMiSeS9CtGlCrRs944jb7nun8NGc8Ybr8ruYcelRO9aTZFZKM1bi7RyGpvD8Tqe0eciic9metFLcDUAKeSNV0oq7ivHAe4TwIQlJSAboeOKj%2BtroI%2BoOj4RIr3rp9sRgkyarqrs2Ew026xDCVWnwbDdVSBTqcK0QDUqPM4eW2dDjD12fE9M8Xa5H7sVO5cPuWgLTZwvuJHN1e9Hzd8KmaczleaXqlHSuOixgF02K4OBe5Orkq8aGXolgbFI8uFGlpt27fCPZX49C3YgxCuHRK4ztxYX8oKca4beqPII7kP%2FeIE3i%2BktD3U6AjRNaUb%2B9wIUdvdJgV%2BcVHmMOyC5CrLQunxh4PMZnKtkA2VE5A5uXrV3t4TWycw%2FtAMyyLLOglQjun7lM1D3r60%2BCQb1APINj5r%2FT0gaMvoudQ0PykyHigVYKTP4hMqyO0W653jt76QpsYs6%2FcX5qADDsr8WHdtRfztXSDC%2Fn8nPBjqkAchD37oDiHbyPx1wxT9L1D%2Fm7XYXSpBV0QC32ZPT5K34liWhVKJo9UMoz80UuoAXwNB%2FWkHMi8K0F0Vl%2B%2BAGJ90UETh7ZUbYuljCbMKvZDf8Med7mGfVlBmeZUojYF%2BsvEsY3mScMpFgIUx0O8C5X0t6HYzoPyvyYOuUOwR4oJamwSxSzUfzrCA%2F%2B9KRssGpqQdcIfXY2jLkQoTUXUIs79AZxzTS&X-Amz-Signature=937cbc36081f599d144c9b9fae943964607d4aeb178b88a1fb4748e1654ed4db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUFPUJBW%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJGMEQCIGChkhDNMGuN4eFWCuwVqcDNGiyHhsUMti91jIwR%2F%2FxSAiBDu%2Bbp2I5%2Fvp3HRhq64fWkAi6PEilgabx3XiYUtXUAQSqIBAj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLmx1F%2FHPZ0gqTUizKtwDvwlRf1RhPfR5iC%2BIjzl48K%2BikUdHxHl%2F65munDtLDs27EqLMOLXn5hOjlj94KjF%2F9vM5HmDAy7I3LfJ%2F1WGOjlLWDWwOllUN86k17o0rEzEOXTRqoiGWEiR2LuwswC5V6sueB6BnrOqExALhWu5P%2FxHRXSou6lK2eKBGvdAJN3IjHAgv24gZ%2FanOw6kPGe4U%2BPFisOJIOSadDHRKyjPSc5V%2BRPcskttLdtprQCkJFktVPutN6WkYTBkTgDQ%2Bba%2B8wYnNzaiKsabDbO5UZT2tJv5rbtcsY%2FLxITT8DEJyqJkPO%2F1%2BtCEWETv2%2F9zb5AiII6hmaP6iZdv4d35%2FAvvFClUZoV0oRKiQecQg8lzbiOBbymrRVm5Ry0JTJlnZFypMXqGPR9vydQBEdiuToyPyoaP6xXC8jzIMgT2t%2BhKjJUl%2F0HveFiMXJ4QJb4mTL5aqTf22O692xwpQHEUtLHP4QiAJ9%2BhMzY4vhArslWoVY6WnALDp9dxjLzjdnniCK7%2FZp4mt2gECnKm1LgTxvqBf8kk29nW7I1nxRCkjFAOj6gUEKnHWpDp9oF498QKq2LySya7oCCAgU0VeWRTDh%2F%2FSPsm59jFoWqyRJzmXCKET2Fo92GoJZgpJGPjHo5gw1p%2FJzwY6pgH0FWTCKatis%2FIfhiLV5%2BA3L230q9UuWqg0SE7Gtqj6utmjy7K6dEcPIgyg25Pi2VNtLijh3Ti%2BQbFFUJy4mj9TGljMhTipidXx0fvvriLJUhF0POGQ4hovFQmFt%2BT77Pt1%2Fba0WoFmv7cg%2BFhIdPEyTjP1XeMG3I6rf3M%2Bsc18ifX%2F%2FOZOh4U0IPPXCrbLj0mLtFIUeKgQLvTpCC%2Fr2CB2YBOFk%2Bcp&X-Amz-Signature=ffadb376b27377b0e4853e2f841eb97813d6e04ddc8b07e55369c01d769740a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666UWLLOS%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQDM0ocl9qJ0oTZo2g1qleQZ8TqRtt7LSecfI4cripvozgIhAJriFGJK54Xd9u3JC1rcP1UjXY97DfoHVrE8%2FM926LVtKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyVFR9bUWl6yKJ8yGAq3ANpH8GuTqSFh0z6EtA29t%2B%2Fao0PiHmUH65izSPE7Ba65pz1L20mmdQPdJ%2BsIN0wj%2FOoBV2CNseICKJXC3sUBR7Bna5vLb1hU9J9VE7Lp2xg0%2BCkZhifDNsuD%2FgGYz%2F%2FQQMBYmbjDaUVxhL50FowyY9YFTKgKBHnhf7IbFVr7feC5ft5AR8DQ3UOBIINK%2FVVlDrMaWiBRZjugeIzvFLwzE0YCKOw64vM%2BSrrDUwaL%2FCShub1mEGSDINUvaKHyFhPr6KjOnSzkdltFzhttKsHIYGAiMmOSe%2FoQaJoluL9PvAIdx9BPtjPLLxPSfLpfTDgg3DdvIjDZgbkAnwpr1SIVTBWvan9X1P%2B4I0v2kOstq4xXXq189cMIlwgyXYxiCpfNbtbYIWKIDt%2FgAidUPotq22Loz4aHwPWTM8fak2n%2FzjSg8XLiGMYvT9rBOtoEbujGB0qOYuFmLPfvshBSe06S1hhQJ9VaU50DIgSnRFBgPAReuCkYFK4vU7hijHew6nXV0rIhXSfeX3WLwFG%2Bs3wj3BIyF2ZzhcNECvdrzt1CweP%2FGyZwnbKw476EAASLGc9YyjpEnyTj6A5inkaWF30sIq4fOKg8xl7hgtR8jeS4e3t9LetRNGxgpo1%2Bck3kDDmnsnPBjqkAeQ1angFVkaQ5FnjKeDOGWjg7iOayJWw%2FNbZcBM3wRb%2FGITg4xg7LyWn1j4V7iQFsOX0sAe7ArMe5kMiyWAgWwQjrcshPWq20QHESgzUXJ14qMqczA49kUqvwkh8nd2FWu5IKXKPzIRuRliigCkGNxpJB0%2Bru577Z56jamULtKjUMVhfYwzr0djeXLJeDVob0CLI9NmIDG1zF1xTo2EcN0TUVCyE&X-Amz-Signature=eef0c468b76bb210e7a029cdbb85a3124703b0fdd9b8fb345d9b5e6152bca52a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666UWLLOS%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQDM0ocl9qJ0oTZo2g1qleQZ8TqRtt7LSecfI4cripvozgIhAJriFGJK54Xd9u3JC1rcP1UjXY97DfoHVrE8%2FM926LVtKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyVFR9bUWl6yKJ8yGAq3ANpH8GuTqSFh0z6EtA29t%2B%2Fao0PiHmUH65izSPE7Ba65pz1L20mmdQPdJ%2BsIN0wj%2FOoBV2CNseICKJXC3sUBR7Bna5vLb1hU9J9VE7Lp2xg0%2BCkZhifDNsuD%2FgGYz%2F%2FQQMBYmbjDaUVxhL50FowyY9YFTKgKBHnhf7IbFVr7feC5ft5AR8DQ3UOBIINK%2FVVlDrMaWiBRZjugeIzvFLwzE0YCKOw64vM%2BSrrDUwaL%2FCShub1mEGSDINUvaKHyFhPr6KjOnSzkdltFzhttKsHIYGAiMmOSe%2FoQaJoluL9PvAIdx9BPtjPLLxPSfLpfTDgg3DdvIjDZgbkAnwpr1SIVTBWvan9X1P%2B4I0v2kOstq4xXXq189cMIlwgyXYxiCpfNbtbYIWKIDt%2FgAidUPotq22Loz4aHwPWTM8fak2n%2FzjSg8XLiGMYvT9rBOtoEbujGB0qOYuFmLPfvshBSe06S1hhQJ9VaU50DIgSnRFBgPAReuCkYFK4vU7hijHew6nXV0rIhXSfeX3WLwFG%2Bs3wj3BIyF2ZzhcNECvdrzt1CweP%2FGyZwnbKw476EAASLGc9YyjpEnyTj6A5inkaWF30sIq4fOKg8xl7hgtR8jeS4e3t9LetRNGxgpo1%2Bck3kDDmnsnPBjqkAeQ1angFVkaQ5FnjKeDOGWjg7iOayJWw%2FNbZcBM3wRb%2FGITg4xg7LyWn1j4V7iQFsOX0sAe7ArMe5kMiyWAgWwQjrcshPWq20QHESgzUXJ14qMqczA49kUqvwkh8nd2FWu5IKXKPzIRuRliigCkGNxpJB0%2Bru577Z56jamULtKjUMVhfYwzr0djeXLJeDVob0CLI9NmIDG1zF1xTo2EcN0TUVCyE&X-Amz-Signature=cbbf70e164fd40bdc8a96b522bd115ca87fe8bd8a866f26e7aa1fbda7814cbe2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCEBJCXK%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIBQUP5lrnw9u4wYZ77Unfci4CQzsOgb5Gr%2FlkhtoQq1eAiEAh1EVMf4xLZiNuoxLS2bhpHlVQ3yG%2BJzuKCBGJL%2BnHV4qiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDrNX4eAR%2F28MVoGNyrcAxHTpH0Ynmggd6Iex75ZuIRGkGRn7Ps63y4r0HTv3lzVvPV7UyILiJZSxoEsqYRtvjISBY5BZfy21LIV4AJHg1pmTih2e4khN9p5QohguRAM2LlHUPxcemPT4GwnZto3T8xQZlykYv6cMNtS1XdOCSpk30vimqgjy0Pxxx8EEh3RpEbe43oXTMHFo51x2d9LMmMx6Q46AWhPtFSbdhw8kMH%2FhijwOvx9LkGKttnrvpo07jU3CWe%2FZOuZB78rabU8IGuub2YHmnXpF9c7E8eGP1en0esqWyOy9YiV%2FHg%2BEA9q3UJQA%2BwJNOioHf5JOjeP1IPHoqgXjKoTGKRgaxceS94KI3XwEq99D4%2F4AoeVCBAHramBj7fibvjyqdu2%2FLTNMTXVek4Yrqq4KrAyJUFTpQ8BjfjKf%2F%2FU88qX9rozokAts2Ix1k98n5bEmXp6BjqYhm3Ujp7C5zwE81DUf3aYoO94WYOSBjRQ6oiPk3LIZlfQuIwb%2FvPsIEae2DGxHYcfPs1s2c6UaORYmSXIusZw6uohDnJo0NMnrBJJV4K7dRf12lv3uHQLHM6ORwiz4oYf%2FAEGkPrWHEZYJYm8m%2F9GMYmDfreFnraEjHPCn0Eo5o0MJLLZC6pH%2BLh2ho05ML%2Bfyc8GOqUBmaNl%2FBTsbY2IZ2NvGBKfwrWv61fCqZxgVB%2BnO9Dfcp0%2BEWP1G2YQ0Dc5FVK52dpHrWScCK4EsClJoY%2Fg143dfXeUtVEx8VMSV3iAxGHDisrN0E1FGgdPA3QyBI07eZkk4Van6m5PUDGGAR7qDGANRgCimeGZC2hDxjY7ArJ%2FP8n8Eti04fJmIyzxVi7uE8rrtd5w52n9wUdIjncwcNnhjM7G45Hp&X-Amz-Signature=4fd567b99a67f3fcc3445d49895687227496b5b2ca7c9960d9e0c692a4a0dff9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXWQU4DL%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIQCJOhsmEzZJWiF5j3sXjT%2BQnTR6%2Bv4rAXf2SafVjDECXQIgCja3NwlOhnapTgPGQM3yei5H%2Fomoq5MFxKlXAT0AIOQqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPDwbEHSmj%2B7y7LYiSrcAzItqQTAg4H7XN6JMYSZuO67ClV3g4HfOI95Gfi3FJ81qS%2F9P38ipnJlk9RhrCm4jmGF6PS4qNtu%2FsxttEuB7RQQ5SbuZ9bMU7t5GtDEH3LmsREm167xkoQXV58kvZ4Cy9jEp4pPSGDRQXzz06eefC2R2qQaPk7tUVrUgW8KKYQXtnzW7GYPnE3N7KAL8HJqolj128e6cgKSDw0N5PyummkmOZWtTFgsUHOX69eQMPxMSgcDyaM7hqIr09%2BKAvGXko7uH1qycYCb4MUFRkoxhJ%2Bm9VPwSBrV9Z7YM1veKRhTC7%2BbDQ73vRlE8VS%2F2ERXYpzxbKtPbfWkD9xeR0FM6DiBrLB%2FEWdSVjkqDE1lRf4AgAOpEMR2bSRRjm%2BasgQWW4Ngu5uPNHI44uMQEoaMSsz2LPJ5iFy9Aflg6Oc0dBUCwZG1c1liUggxQK9z04CSEN271LyirbQdK7gFYycTnBz0SwntB4RdSl7Mvpu0mUsk9txQYOAEWTtGf1iWM88ducTvOhXmIvJ3xpHz06vMraGfxbY2Gs3OLH0txpsZrXrsAtVNuCoO9%2FtYH46ADMD1tzBrE%2FYKvYHsI07yp3Zx4xaYTFA5vCMWWe0pskZ%2BhjK7wMFUtdifmSZZC%2FrtMKifyc8GOqUBakrhev9xJ2ahmi0fH3DMtAhzl8xhofq7NIkc9WzIwYYiJV7VYIUvCTbgsb9%2BZRLMNbx%2Fh6z6dKim9O70DeCHqKazTKmaI1Ms4oltrLKaj03lBwrvFamVOVZWiUP7i7WwKmU64a5Nft7XHxWPq4dp6L1lSYkWiTSF8vOxu0aPK7iZXvoxV6C5PmSmXHJrPN9GGiBmEGc2OhuG4%2B0NR98N2ZPVJJDl&X-Amz-Signature=6369f2b902aaec20a35153f3371b6161653289519d0c53c1385c4c71f23e8e0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KBJPY6X%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIQDh5o%2Fqb4s3sJZRlXDtrn2TXvoxd%2Frt6FRZAs88mMXEkwIgaMSt9JgrGNyrXfItcc25ufKFroLs4umQHmBpXMqrnigqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOgXyh%2FCXSJguNhjyCrcA2fy6%2F1kdcka2RoXK9TDaGbmbEW09zgplrRDpMZCn5Yf7L4qV1lbCxaP7ooNtJ1%2BsZdPJQAgjMY19wVNRprdadW71bKZToUiG6aZCbxmuqT7njVKwJVVBwBQbz5EE6X71ZkE3%2B69bVqXlC3AQi0%2BdunvhvMqP6o8yc9IvYmgjlLZLTRFYleiVSrMqcaBuOuGel6Byxjx%2BuBlzTCO%2FaPcrNIHsFqi70RuhR2AXvhs%2FKJTvpW63fvT9OLeoU58JB9T2N7q4L4Gh5ifLuaD1hJm9VfZbYD2lVCWGrmfnph1KDkUOZZ1dU7LXtVhgSusV8iMAschC6t8Ivobmut8mwK0551vNyu4o40LbV4gkIH4KxOiHQOr35aXKa92pTy%2BC0ZHyuS6q%2FCSxPCRcLo75o7yCI9HsPxg76XDBSykFg6wBhzlvgLfS%2FHH4VS3wHtLW6FmS%2BAKuZyrA%2Bdtlsr5uvUgvwt%2FNEi5pXRitCf%2FNg71L%2F5QXsLWK7DTtUXW3ceYZzbGfQ3HgwS%2BWBquAs48AAFQPoYeJEH6GrifmultIovGtWnEKg2kFb9Gn0EJlc%2FUd7Vz7qnmMYTSpe51wuK%2BTzwSvoogzgYNZkXh9IftSHdVvLAwd%2Bh0VRouG8W7GpAMMKegyc8GOqUBcs%2B2Cn3xvXJkaYPJTr8MLuTUZz3hvZ8mvt11TxafEBjP20oBGnAwYrkIBOabbmW90CxtGaWfa0N7WTZDEgk%2BCrJeVE3JnTo4esXYoLHwKft1sreelI5DcnXWcxsywyD%2F0ux0%2BNCXghUBVA0mVsucf%2Bj4MMsiHnR%2FLCAbcOqRsatGxST%2FybajKVjnIvEvPxI4QmltQstvHnGhpCYG4Irl%2BDfyRJJE&X-Amz-Signature=a3138a7a1580c8f539a30e40b5b60c24acfa284644ce0957b04871a7bec31d41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBHNEUYK%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIDB2aS%2FWIMYBGznK9z6GP63xcqeVWJ%2FwCb0PbHVAVcZHAiEAokwIdxrmDWoa0vIMkkYz1QycGFsM6PcQiuq21uJF%2BbAqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNj5QxbZYR1vqTWzdircAw3c9XWDl51ZCjsYWBXYTLRO2olFLOLMnoloJ2ptiuoambsbXPQigpzCp0rYfbh%2BuQ71oye5WyXnszgRGcPHLVIWsfOcw4QLzMqce5awznSlu6LdBWXOE7Ek8c53ob%2B9yqBApzOM1kCPBrCAa%2F46wst0fDbrDeR6zrrOHXnPhFl%2FPjPc1ifXqMdD7MTYAad8DQq4raBbynvIZ6zLkGUvuvozALR93FiSZuSqeiSZ0V732pP8J7mKBoETGcQdmo%2B%2FSFMtoxakUIC%2BssD4Jm7DaWOZXS5H6IZtlrzuqzqWJLF%2BHw8oGWbErlpXv1ffUOtoEKaIl5KZ4e%2FNDw3RQITZrl7%2Bq7Oub4DDnCwKlSPW3VJrxRdgyj6nEyPumYSSSEl0H%2FGTn%2FqU5LiM3gRpQAMg%2B6i22HSL2OiMjCNWEY60j7G79UiialoPZZQwcCP4zvirrsVsffUGqoJC1nhalL0oXCNT45n2eDN0z%2BvzaCqrW%2F4QUDDF24btGP%2Fj7GbqI%2FXr9I0nZtJSqJQ5kV1ulq5%2FhRg41hUOTEHOgFZ4c2qmGDrEQviBrR6%2BEpla0%2FUTTL4M5aplsBKCqmkRF1PgUBQYohLx1XKccIgcULDv6Rv7kYe9EK48H7Mrk3HRXufzMOqeyc8GOqUBaAWOCUhcrt3lQY%2F9JINXtmIAGWjSodiB1ugVb3nglNlrp7DY%2BYIaH8750NED2uQd0SA95c9ep58Ne%2BhLH6qc4NRb2pW24g%2BvZNjWo9HbWKPSToAAILxwFwZSS3f5edt7%2FSFIOqhWSJZgnIVOAVLzE6sXofp7ypVcR6CU9XpxcAqhXAVyZtK1PP9n%2Fy3FcaRBnBs8hoyLFYRytbzSsTMkDV8PJuTO&X-Amz-Signature=25e1baa495bc6bc6a5736fc0f4774a699cd638a7160714e0fd2aba751b26b187&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBHNEUYK%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIDB2aS%2FWIMYBGznK9z6GP63xcqeVWJ%2FwCb0PbHVAVcZHAiEAokwIdxrmDWoa0vIMkkYz1QycGFsM6PcQiuq21uJF%2BbAqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNj5QxbZYR1vqTWzdircAw3c9XWDl51ZCjsYWBXYTLRO2olFLOLMnoloJ2ptiuoambsbXPQigpzCp0rYfbh%2BuQ71oye5WyXnszgRGcPHLVIWsfOcw4QLzMqce5awznSlu6LdBWXOE7Ek8c53ob%2B9yqBApzOM1kCPBrCAa%2F46wst0fDbrDeR6zrrOHXnPhFl%2FPjPc1ifXqMdD7MTYAad8DQq4raBbynvIZ6zLkGUvuvozALR93FiSZuSqeiSZ0V732pP8J7mKBoETGcQdmo%2B%2FSFMtoxakUIC%2BssD4Jm7DaWOZXS5H6IZtlrzuqzqWJLF%2BHw8oGWbErlpXv1ffUOtoEKaIl5KZ4e%2FNDw3RQITZrl7%2Bq7Oub4DDnCwKlSPW3VJrxRdgyj6nEyPumYSSSEl0H%2FGTn%2FqU5LiM3gRpQAMg%2B6i22HSL2OiMjCNWEY60j7G79UiialoPZZQwcCP4zvirrsVsffUGqoJC1nhalL0oXCNT45n2eDN0z%2BvzaCqrW%2F4QUDDF24btGP%2Fj7GbqI%2FXr9I0nZtJSqJQ5kV1ulq5%2FhRg41hUOTEHOgFZ4c2qmGDrEQviBrR6%2BEpla0%2FUTTL4M5aplsBKCqmkRF1PgUBQYohLx1XKccIgcULDv6Rv7kYe9EK48H7Mrk3HRXufzMOqeyc8GOqUBaAWOCUhcrt3lQY%2F9JINXtmIAGWjSodiB1ugVb3nglNlrp7DY%2BYIaH8750NED2uQd0SA95c9ep58Ne%2BhLH6qc4NRb2pW24g%2BvZNjWo9HbWKPSToAAILxwFwZSS3f5edt7%2FSFIOqhWSJZgnIVOAVLzE6sXofp7ypVcR6CU9XpxcAqhXAVyZtK1PP9n%2Fy3FcaRBnBs8hoyLFYRytbzSsTMkDV8PJuTO&X-Amz-Signature=ee4eae49ede733c1bcebc8dbae925f233f9aebb3500fd804a3c03cbf59967482&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T63AIPYW%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJGMEQCIHEFDhguJUbFB%2BRMdxNFBBCjZ5In%2BYfTCHnj9k4GAMclAiAOc1nnlEIQH6Z5WzHhNdR0jhwjVk%2FcGItuvlRYA5p%2B5SqIBAj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvG511ZrKv5%2FNUOlwKtwDjWaLM8wH2yc03Ht4oaJPOw5D5qWVpFjZAS9D%2F2mkd6PxxxkWuDEuUPcsa2DAa5Mtx04dKVuEx7KUg56lr1C2tUels1yogJhkdr79kaExoeV0NvtrMC3yp31nofNMyZ3j3NTRhsTMeLmwYKzj3kCBYgPTUSBPH3Cc3RUlSGUGmzHOBvJ7uxsUcafkj%2FlSOCEbBh9D0sjDSoVSnjCduXJZHKzBg7hsdAa8VYXoOuNWJbRvpDGHgPS%2BY4YizzRvAeOOklSIMCk7AsOXL%2BcsnhEAI7Uoo0%2BaywnFckLODrWetbpllaBMCWDZkoNtjAxgY5stL5nFZWu5jwr9I%2B472YVUJNl5ZrXZVHhK7NV3Z3SN4yKoZy%2BNYore1BNVywF7Iu1DaDsFEr9is9L20LdhYWS72wIHXUKuFf9cY0iPw8gnG8a9tO6Q8FZ6iGtELs8z7%2BWJPUUDI7wS20GrUAdyIaPM0cZiaQZuTJTiAGm%2B4qYntFQE2%2Br0eduCwiUmqEg0ML4wpYRVYTMV6banPWYZDG5Q0pUO1a0vGLfg%2B9cIDCPl5Fny1qwsLkWjhC1%2BabKhoydh5BMYiflviy%2FFv0hFb4fubO0rdm9Nstw4n9Wo%2BD88ooRZ26dNP757hp%2FBBYgwqaHJzwY6pgExHa7v%2FRH%2FBiWJRfVWSp2fyv%2Fll%2FoxBmm1tqb%2BhPWKDXS%2Bx1MU1Pqrp6Fn5RBOwepeu5Ca6VIbrh0hsJI8NwJHuyKKOFSTrXMMoJpW0AZ%2FZfa5GoUuCjrSBUtMPQ6A7adaJYlso2TVDtRNk%2BVQ2CtJkcSI%2Fxt90MU89o95dSy71ldsxUGINva7f08%2BalabTe7sDUly7fDQpD6S90ZZ7DB1imWKFnHW&X-Amz-Signature=bdb060c2c2fbd8ce6f0d9bd78b24ac0f5617bd40e794e6607c847da7c6d4653c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2XCTNMO%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCICQwKoTkOr6%2B4RI78Lltqf17t0ImY64qlqm9F5IEUtX5AiEA6ud3o%2Bv6yeT9HFCDOBGQXk2HuGKI3a6boPeJH%2BgmVL0qiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKkl5stWtqOqUTMvOSrcA2lbsLyzvpxv8og3ldcZ0SAzopVoeGbLulu66zKma0Ui0ZxDippnw1ARIIkS96qZ%2BUMG7rsZkV8hykqfgTZEEY6ipN1XStOe7TuIaFJixUgp95DLCFzUwWD6kFLMNnIjOiG6BvArtU8cjOIvKFY9fvScB0fwA9xjU28URbyafunZ6cQ4MtpM%2F23HpryFrr1LuRDiVBDlnqrzPcPrzjFCvc%2Fe2PgZ6IMFd8H0i0aMS66VOJJN4WB9KUKFpOe0ERfjVIH7BWb9wg9boAfSO29c15aHDBRVuQuR0thv%2FfgUAc5e97WrTIfvq5EHkbmeNy6NV1ac4HnZCPPBNc85%2Fwi7x10Y%2BoPy47O1cESUNIOCMQbgmzTnuLXEqXgQsdWzf47xk1kcfuQ6RgAYbY8AFSjNooAHiDigqcOoK55mtnMyMSvtR2ZOxw08QGwK4KCXmiEtJP2F7O8K%2BvBK1aokF12PmTiHZwyhVkvszuAhodiNxnAm5RmYC9dKRqDBioaEXmr4qn4WcV8z0LqOsDmouXYHlZ2njrPZFUH3OnvEBjsgR8kcIEtaHSfXGUMXv2VtRwZ87vf8142rcZE3Qlv%2BT%2BTH3DICC0w7KU1JLk%2F2S%2FBKE5c%2F7BmvQMK00cMLHANXMJegyc8GOqUBTzV9owPGbzl44BD%2BUCWPrT%2FckVJVb1jnLu3EfFIIgXdCBRVpIaSmU6hutR1aWtfIwUix32fN7chZ711i5GEc7tPG9GgnfjJsiZxE4Jz%2BEIi60sycCLf6MpevV0c1%2BFIW1rece4dNed%2BnZ3%2FMQKfNhvyDzhaER6VOQURAOCWMB3%2B8Hq4ZNIhOX9dDujSAnbPoMNiHUvk%2Fl%2B2zQ5%2BFwTz0xufWFyTS&X-Amz-Signature=5c57fddbac10a3ad32c4bb974f031f9685c48799d3c55a6a77d49d2097974753&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2XCTNMO%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCICQwKoTkOr6%2B4RI78Lltqf17t0ImY64qlqm9F5IEUtX5AiEA6ud3o%2Bv6yeT9HFCDOBGQXk2HuGKI3a6boPeJH%2BgmVL0qiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKkl5stWtqOqUTMvOSrcA2lbsLyzvpxv8og3ldcZ0SAzopVoeGbLulu66zKma0Ui0ZxDippnw1ARIIkS96qZ%2BUMG7rsZkV8hykqfgTZEEY6ipN1XStOe7TuIaFJixUgp95DLCFzUwWD6kFLMNnIjOiG6BvArtU8cjOIvKFY9fvScB0fwA9xjU28URbyafunZ6cQ4MtpM%2F23HpryFrr1LuRDiVBDlnqrzPcPrzjFCvc%2Fe2PgZ6IMFd8H0i0aMS66VOJJN4WB9KUKFpOe0ERfjVIH7BWb9wg9boAfSO29c15aHDBRVuQuR0thv%2FfgUAc5e97WrTIfvq5EHkbmeNy6NV1ac4HnZCPPBNc85%2Fwi7x10Y%2BoPy47O1cESUNIOCMQbgmzTnuLXEqXgQsdWzf47xk1kcfuQ6RgAYbY8AFSjNooAHiDigqcOoK55mtnMyMSvtR2ZOxw08QGwK4KCXmiEtJP2F7O8K%2BvBK1aokF12PmTiHZwyhVkvszuAhodiNxnAm5RmYC9dKRqDBioaEXmr4qn4WcV8z0LqOsDmouXYHlZ2njrPZFUH3OnvEBjsgR8kcIEtaHSfXGUMXv2VtRwZ87vf8142rcZE3Qlv%2BT%2BTH3DICC0w7KU1JLk%2F2S%2FBKE5c%2F7BmvQMK00cMLHANXMJegyc8GOqUBTzV9owPGbzl44BD%2BUCWPrT%2FckVJVb1jnLu3EfFIIgXdCBRVpIaSmU6hutR1aWtfIwUix32fN7chZ711i5GEc7tPG9GgnfjJsiZxE4Jz%2BEIi60sycCLf6MpevV0c1%2BFIW1rece4dNed%2BnZ3%2FMQKfNhvyDzhaER6VOQURAOCWMB3%2B8Hq4ZNIhOX9dDujSAnbPoMNiHUvk%2Fl%2B2zQ5%2BFwTz0xufWFyTS&X-Amz-Signature=5c57fddbac10a3ad32c4bb974f031f9685c48799d3c55a6a77d49d2097974753&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XU6GVRBJ%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T190232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQCS6w6BUmrS9LxcHHxu0sqzhkw5Ly%2FdvSyngZhVCI7eugIhAOYLaZx5T1I10Y6Xh%2FJbGoxNvqkm1Gx0b%2FmyVvcq%2FIg7KogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxSKhu4lNodsMf%2FH4Qq3AOOhJo3Ly34qrpp9TECRvW%2FuS5c82dnpR40gqY6j5IYizwFzn8a%2BpVIKj8udATAEthEaa5ajmQWYavrFIgylJPjXGWgBd2ceUYEUwvr5yjaSy0O5tPNXB8g5FrkpPabeSlDXDREaCzxtqACaONbarpeINmO5PJZ1170bEQixkgA2GKUDXYuO3snvsy9136w%2BTgJ2r9gNRfUIcEBcBxIhx8koFyV%2B7vaMFeRncw7%2F8SdhKFsLz1pjPfhW9lQ6QBZF86kheHdji2FzM9lhqvkYLd3v6lZujWX4ybLsFeOvxFfBnUITQlvLp8oLRDWgEMK12ERmNAfcvLqIpU44yIHv1kiQ5VqKxndwGS4pTu9dNNDMEAuGVmE%2FBu95%2Ber5Mv%2FuY7%2FkOPoqhgS5dG%2FCNY5QER5pE8ADOGLnVb2tIaqleYUYhMLq4u8CO8rvA8TDwgoshR%2ByhcLuOlfFI1LszieuJW6XqMdM59wRLCUp%2F%2BmMkSZrWl3wpOn%2FUI69RopBg1PaWot4sK8M%2BIBMbeBGFTRn6SU4fNtTGiYhXiqTWSK3TnodYfOyu7BJ9x19K95hMld9kABVC9zTj%2BxHfCunu2hRGMcWm2MqIap4YAJO4k1sKa0QSVIX4wwGufAlqloYTCcn8nPBjqkAQUzb93DVNP7tL0r6OjXuA7AFAmPeVtO027COgYkBwhZjYekY%2FiyhRCg1FpOLi8fpoBGb4eWZvcW%2BIwz0sEIDbj3RDcmkWnNnaStOBHmARKY0KoO85OqF2FJv1fZzLteF4SGt%2FxY81TSEH08qquhXbuqvtYkBn6EaO1mctRbFj3r3Eo0DwKaRJed1PdUPgpX%2FeG2vdWHPtdUiMsjHhIUJyhyjCee&X-Amz-Signature=ffc82911e2b4f7faaeceb0502eec56d3357dd069d5a9c4e7d6cc81c8c284e84a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

