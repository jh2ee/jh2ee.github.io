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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJH5Y6Y2%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIFvmWsTlESIv%2BaAvL3MIqNR6ti5BdGNGiDCwWKFlwvpYAiA5hRbdUVc3rzz7%2FIuw%2BOCKn2u3APf%2FpQv5NPHKUFazXir%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMeVKX5MeIOE6dKKbrKtwD1rH2XaOKc3L%2F%2Bz1KHm4quJov9SpaCAbQZh8AxVRhTde0fJEpgBmxJNiq2AB6F3AjrBwuMOV%2BHeGMXqy5jjOUstJjJ2TTXFXxFiRt4def5zZ6Ibu6oZ5nxbuVUZdT0Hk3TdFXftfTKUwU%2Blga%2FHNJmoBQvfcgWXLwO2eVK4pG%2F0Ky1z77M7rbWGnLM4D%2Bdu7WwDLdeFB4rgIsA6%2BxUw3awFi4BGivAwxy3nmLrfzoeKWL449RRCIbeJlb3YplWzVTy8TmwkfKOXqBABAu0WC6Sh72nmn7grETv0GuPQrKe%2FSflXp%2F1A2yoaC3cx75ApLH5HD800iR45L3i6c5z%2BPNWHyW9%2BtxHKViNMwB%2FCBKhQSL6jce%2FbEdKKieluRagKbIMpaEov9GUA4CXGPHNEr0KLjCCU5gZ8DcDAXomrEwILwZxGQzzJAlpFbYGAffURYiHm9ZM3X4ozH5JmctdlogxGUCWK2ELsVNuSItto6AhL1650SS8rUT687V72FFVI2Nbo57FMgDZSiRVdhlMPJ3KjqrUD%2FciCkP5l%2FBGfcAtl9eqknYB7GVw4RxGHGuZ4qCvsUspfhYogqNge5CuaKysu7gFon6xj8NwMQSBDJ2zqKWrcXlR1Kih6Qd7IAw0PaRzAY6pgFN1efYzr91NIdS%2Ftlp1V7BQiJslpD4ID62RGY9d373xy7QDMHX8zgNM7QAAf4Kx2RHp6MyN1zwZMEKPo7usQDq9tSx%2Fp1qd8eww8KKyl8WJXYCH6LHZAXLDadbf5mVeAx1RnCswbD6dlRmqg6ZkUoSNYfCLuF33FrC4ZW9D1DN4hoHyMlBNpfLbqZtcMoUIujmaR3Pl%2BGackQcTj0b9oEucsEMHrFh&X-Amz-Signature=47a5e2d54ec96ffafc2d92ebe46b46172861af6ef7539fef70202c22f9fd7733&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJH5Y6Y2%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIFvmWsTlESIv%2BaAvL3MIqNR6ti5BdGNGiDCwWKFlwvpYAiA5hRbdUVc3rzz7%2FIuw%2BOCKn2u3APf%2FpQv5NPHKUFazXir%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMeVKX5MeIOE6dKKbrKtwD1rH2XaOKc3L%2F%2Bz1KHm4quJov9SpaCAbQZh8AxVRhTde0fJEpgBmxJNiq2AB6F3AjrBwuMOV%2BHeGMXqy5jjOUstJjJ2TTXFXxFiRt4def5zZ6Ibu6oZ5nxbuVUZdT0Hk3TdFXftfTKUwU%2Blga%2FHNJmoBQvfcgWXLwO2eVK4pG%2F0Ky1z77M7rbWGnLM4D%2Bdu7WwDLdeFB4rgIsA6%2BxUw3awFi4BGivAwxy3nmLrfzoeKWL449RRCIbeJlb3YplWzVTy8TmwkfKOXqBABAu0WC6Sh72nmn7grETv0GuPQrKe%2FSflXp%2F1A2yoaC3cx75ApLH5HD800iR45L3i6c5z%2BPNWHyW9%2BtxHKViNMwB%2FCBKhQSL6jce%2FbEdKKieluRagKbIMpaEov9GUA4CXGPHNEr0KLjCCU5gZ8DcDAXomrEwILwZxGQzzJAlpFbYGAffURYiHm9ZM3X4ozH5JmctdlogxGUCWK2ELsVNuSItto6AhL1650SS8rUT687V72FFVI2Nbo57FMgDZSiRVdhlMPJ3KjqrUD%2FciCkP5l%2FBGfcAtl9eqknYB7GVw4RxGHGuZ4qCvsUspfhYogqNge5CuaKysu7gFon6xj8NwMQSBDJ2zqKWrcXlR1Kih6Qd7IAw0PaRzAY6pgFN1efYzr91NIdS%2Ftlp1V7BQiJslpD4ID62RGY9d373xy7QDMHX8zgNM7QAAf4Kx2RHp6MyN1zwZMEKPo7usQDq9tSx%2Fp1qd8eww8KKyl8WJXYCH6LHZAXLDadbf5mVeAx1RnCswbD6dlRmqg6ZkUoSNYfCLuF33FrC4ZW9D1DN4hoHyMlBNpfLbqZtcMoUIujmaR3Pl%2BGackQcTj0b9oEucsEMHrFh&X-Amz-Signature=47a5e2d54ec96ffafc2d92ebe46b46172861af6ef7539fef70202c22f9fd7733&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QBWMKBK%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIBLPJAwcW74yKbTsM0Ke1KUXmoVyRSn1g9QZTk77UNh7AiBjSNwUkGAHhvQayVe1DFmjBH7Lm34NRe72Tpr8NohbACr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMFw9Ze7eivyxWWZOYKtwDXtSWF9APgAQSqhkkuX3IwHY18MzCrPfbQ57Qio%2FmeFdwBun5icZOlR8b%2Bh5%2BIMcTA26jb116e4rBatqEo14vb73zzAeyCtxG4uOHJ3OTa8TCeMxbar0JemvW%2BizvX6guXbQ0rjSqzie2Bc2cpoBQHrwGRnrqVWlFj28Gmjt8o%2BKMFNPXLXmnjQANRdFa5uCUGtVN4uANaUvmD1IUVV4C78X8PlHJPRZNlg2zDzgJ%2FVQ8Af6fDy4DDNzHjx3JPUu9kKDm2rxMO6xGF3hhWfQ%2FR0fdZRC%2FxnH2MJ9dN2YJTHRkuHC5YeiPdUeYflF7n21mJrnM49TYFbK%2F4JqVzmkvO%2BgDRtBhYNpGXy6f%2FMPzmQee1A%2FgKxRWW%2B6M%2Fq1bbayRUfCIIkNCSePalJe%2Fo654j%2BZ6PZ2DyB2KhcYLXiNwHqoju3w6Hjb4JMBjjlnkjsO%2Be8IDMz3ZjegZScBMecUoVOCS2FVoV%2BcAQHgn1e1YNXblvh4a0jiAURwGqysJzz3BoE5bBBf%2FIDWKJ6rtWYcCzyN20FlqN5czNL9RKX1H8uDMMXmwMRNZ0u6KeicKcvTuDzdGOPuHAFgtERmtYa4R0JTBbZ4WmrPSpyDCv%2BxNjzOpNM4ztFTvUvOGG6QwtveRzAY6pgGI2YRKoM%2F6LFHWnURt1JPaHz50fVRIBH2owgcBlaD9ZpGxk%2FdXnOTNcS10uZ5hKHjyvAv%2BM4EiP1ti5PDMWy03tfigqHNewiNk5oJJ1M9BhShV0sNjLtYoljwM8X7rXTsvg9yR6h%2FVT9XFfLEfhaXgye5cIx9cAoZpB8sYKF5kJ9IJrD64hRCjyWkM0QF2HDiZP%2BsIZr0ctS7GvrDUwMlHebui5NCy&X-Amz-Signature=c7d02414428ccfcf06504ae8deb7cc0633e2baaf30d4206bcf39515e530a4c13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBAQK7MG%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIAnDnIdvoKD0O1VfALDyoamhygXZOX0Ucbv3wC2gyq75AiBisMe%2BcOf%2B26NWxmefDN6VThxLnmqAhlbsU8oAS6JCwir%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMfgEQ55hqAxFzvnOlKtwDNShQo3v2N1yoEik9JZz2%2FosAp%2FAo6ejhCSvyjir5mPgAubXL5p1Luyr6%2BFgS3wusXrGdEGBl4Y6Ex4tjXrhK82WHGHfTm8SUX21mqLj1zjjnFu5R%2F753I1Uw0Hu6IPq7UHqNAN0I0GamNJ9%2FdODY7g0P5P08PP%2FoiRnXl5gTBJ7JUdoZwGhFqRHkIb4qp9nQNQN7Kfsqk98ryq8JetTqig%2BkrMy24sM1JQGnT13%2FcVNbgCQUDd%2BUhvuTLeM71B%2FKElUWAFJmswikloMa%2BdBvd9cZf0OiwWmlClsh5jFO%2Fma6HfOpvWsQxhM6cq%2BndsZOeJOp6RzKHSkCBLl5iKcxV3zxXlD9HF5vgP7i5f0lMoaVquVC3Ji4SBcNyNKMKPdkO6JpHqHqbEEZuyGjs1a9Q5BNQRx85BKt%2FylwKaDHAPlJ7BELBvyCzsq84poUKXAXN4FZ%2BBujy4lIEW6vHz%2Bo1%2BhqLjLa4VfztHQ2jAe1Z9PinnIR1Zemm5lKJxW15MurVjLIs1ZGefSSjZw3sjnpk2HLdZXyP8plkeO9uWmjl8Eu7h1XlC4WJmXBFh26TsRElNi980RklTO4xulyT3a9ObgsIkBo3Pk8KIrXMYZqHwMoo5A4tWGY7jF428MwzPeRzAY6pgFzHbLNktnxvb3aTnOC%2FOHeNAqG2aYsbovsaOtABaaLkYheV3tT4Xct3rNkSv0pK7IeFb%2B2QALLUhdQXBxWBL43pRfVUDWNv4s9nBG3UqnP6lvjelwgDgmZ%2B%2F3uKGsJysxo%2Bl0kmefRwBtsxIxQSZMfp8av%2B%2FpoKTfY%2BKWt7IRzswymunqYOJg%2Bh7d0aBl1ZnwScDW3lgsh7vCtoDGAm7fkvoB27zLO&X-Amz-Signature=e460b88a965b3c92c581d0e6d58d20fd792554a8f9095bc12ca6691ebe64eb3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBAQK7MG%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIAnDnIdvoKD0O1VfALDyoamhygXZOX0Ucbv3wC2gyq75AiBisMe%2BcOf%2B26NWxmefDN6VThxLnmqAhlbsU8oAS6JCwir%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMfgEQ55hqAxFzvnOlKtwDNShQo3v2N1yoEik9JZz2%2FosAp%2FAo6ejhCSvyjir5mPgAubXL5p1Luyr6%2BFgS3wusXrGdEGBl4Y6Ex4tjXrhK82WHGHfTm8SUX21mqLj1zjjnFu5R%2F753I1Uw0Hu6IPq7UHqNAN0I0GamNJ9%2FdODY7g0P5P08PP%2FoiRnXl5gTBJ7JUdoZwGhFqRHkIb4qp9nQNQN7Kfsqk98ryq8JetTqig%2BkrMy24sM1JQGnT13%2FcVNbgCQUDd%2BUhvuTLeM71B%2FKElUWAFJmswikloMa%2BdBvd9cZf0OiwWmlClsh5jFO%2Fma6HfOpvWsQxhM6cq%2BndsZOeJOp6RzKHSkCBLl5iKcxV3zxXlD9HF5vgP7i5f0lMoaVquVC3Ji4SBcNyNKMKPdkO6JpHqHqbEEZuyGjs1a9Q5BNQRx85BKt%2FylwKaDHAPlJ7BELBvyCzsq84poUKXAXN4FZ%2BBujy4lIEW6vHz%2Bo1%2BhqLjLa4VfztHQ2jAe1Z9PinnIR1Zemm5lKJxW15MurVjLIs1ZGefSSjZw3sjnpk2HLdZXyP8plkeO9uWmjl8Eu7h1XlC4WJmXBFh26TsRElNi980RklTO4xulyT3a9ObgsIkBo3Pk8KIrXMYZqHwMoo5A4tWGY7jF428MwzPeRzAY6pgFzHbLNktnxvb3aTnOC%2FOHeNAqG2aYsbovsaOtABaaLkYheV3tT4Xct3rNkSv0pK7IeFb%2B2QALLUhdQXBxWBL43pRfVUDWNv4s9nBG3UqnP6lvjelwgDgmZ%2B%2F3uKGsJysxo%2Bl0kmefRwBtsxIxQSZMfp8av%2B%2FpoKTfY%2BKWt7IRzswymunqYOJg%2Bh7d0aBl1ZnwScDW3lgsh7vCtoDGAm7fkvoB27zLO&X-Amz-Signature=873bdbf315d09cc2fba8ed7784ed24ad447fc96fc91bed01c5ae742319868403&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDYOYPHJ%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQD3a5xQXIisBWZi39D1I96jyMUKTGM7jEIKO%2BwwvvP6WgIgVqVM1YmMO0ApMXs9QvuFqq2J1zlt2XWgEVjbLu9Hg%2F0q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDAKK3Ub6HM%2BvZyuvaCrcA62CBBiD8vf6lZu07AiiYLoxiGI%2FvnSKCrhab0EIcL2%2FqZ2EaIDpljR%2FDZVyOYAaq9RjlTqOgfbtySY4oBUQPPa0xiKYhofh%2BWofd9OYgQnLc8FKjw%2FQQBu7lg3OduC0X%2B3dohl9sSxT%2BlMnlhtg1m5Fl4vPCmd%2Fy3bmaVvLv5YD5PPAGyIopkxPJ36jU1%2BHe5OkYhS4xItYgA00nB9Nkre0R5b3sHEy9TOtFQ1q91nSZgelv65zQxhR6LSxDmSG1DQ8LIzJNm0rw5b6q%2FNCrGeoVOmGh3BUah%2BQ7tZ%2FC%2BWLM40GvCkoamEwN2RMu1WVkUy4cOvhfkuEHW8b%2Fu121WClYJj4MzU8VIwQGqQjTWW5ysFH5ltcPix%2BBKHM2n6%2BNGW%2FSI1QB9mKUjXsojGAFq0w213c7kz9XXxJ7JLgY8NHb5mUtoeQJT7aURox2kLIMpjuOQnJQ7ZpffsCGMMK5ZrdEuvALL0gtTWY46p9l63ZT38whTVsHS%2FN4mVqe5MahAG8XI7DJXLKhNldwOsa%2Bf3Xw%2B9%2Fge%2Fx%2BywBjhwImM1GXhelOoinvvaVjLez%2F8FKrQSMMmA51qr5%2FcjC5ne8N%2Fgyny7Fq7CJNgDcawu3H2s3NFH%2BYZn0SGwhVNuNMMT3kcwGOqUBkglWyiP%2B8HxH7npI%2BLloL%2FhWmaYW7D4YJMQPV9ci2XFWC1JvSs3bg6QkVOikCj%2Fbfuxlz%2B36uAvd9hlF13QhHB1L%2BqXg73O8lh0KRNZcViM8adf%2BWLAvg6x1xrJl662PJowanzQ3aps367m%2BAVza050MpqLqZCXXSS5kQEmapbMTDFUMJZq19a0AgufW7kafituTWDib9YBu8mhcMtagUWJdO36p&X-Amz-Signature=647a7834088479fa2f4a726d1dba310bd75a950b67c01a65a0923b94ec8f0141&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUIQCEFW%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCxiiKtQk%2F46VD02ZRqf2yXaUrBVKL%2BX7ghiWcuK%2BHBmAIhALvDfhKLq5y20bG0Nx6prtAFeKGGGWppwgk6uZmI6TtGKv8DCCwQABoMNjM3NDIzMTgzODA1IgwEmwcqjTTqEQ3k1ZMq3AMQcNMQb5PbLtvX9vPug1TXQjz%2BqlOu3sJcPupQrW43hPcXJV9c%2BytMCnsgUUaldBdwI9wk%2FpZhpP2hFwD5q8FSGHvCdiuFLYpUGbetu5Dw1ATBNlp3WOH7eUYuZYyJ4jR9fupGqx6AbYRteEoX5FFpsUvrAz9drBvhL7rO61ZcdHvaDYvDaa%2FqIRMPyhHCKWXq5sjvSBnZPU8n2MLWM9h%2FxqN5S7uJjUeBQ6rY6LMEK7aDjsc5cC4ckFdjFvPcuW5q4wYiFm4b5R3co%2FfUlVH9MApD5e37LaydM0DQ6Kr%2FpiTvav5qCOAJ%2F4jYU3t3%2BlJH%2BCeTP6zI%2BlJInmWer%2BikOkKo344CyQ1gVxSV%2Fb%2Bgnl610RgGyZNFXw%2BKCAH9lN6bsITUixh8iyhywBWxv95mV6r24sDuD0cfVITzfhQm0JSPEhDjemhnHItANx%2FjSigo2KZKgJujV0WUXNmxuXtd%2FkdQs8%2BkEaRVG6n0gMT81PjD3ahXPnkvWWmKZDglJabFm6EQF5JGlLfoAu8ANIXJjwLsvHogHMzAwjh54KTAlyQ0hfF0rO1UdrEO2Z%2Bxgzt0e%2BOGEbs%2BX5cvx52RurTOYg7aL0K9jyYNrcua9BDBjP3HWGZf2BK3rvNgxDDD9pHMBjqkAbfKRlT2s%2FaHUkaNSUacYSJGowZdwIO99A37j%2FB%2BaZAjI%2B8ffC%2FXWADnz5qQHCWi9uFEgzLR8I0iaeHmunKgH4hYBohiowUSJkZ1fTLrmTyigO0rP5zmyCtjtDtBOO0LlUFmVuYU3qtggNzrigUN8%2F69anwVXB%2F0fhK4BkAcUQoMW4LMA8GJVKCddcr2RqtCWHiQ9F5s1UL%2BwhPpJaef2j3PPdTw&X-Amz-Signature=d7caa5e9f4c4d4bd3d9899ad4f9b2a8d69e9801e7bdb6e341301651aaf409cd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSFOIAZI%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIELcpm6%2BqiwPhFM1Pd8LgSKMTZXrnbknF5D5JXpuWCO3AiEAkP4GXtCy0%2F85Q1WzydsVqjdLvQ%2FB6KXyEeQjaqwzkU0q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDJ6M10pfm067q5lrgCrcA11HsSQxddUDA0sDV2T7YyHWmKLyMc2wWmtfdc%2B7gNZu3lyJ8pl2tlKxvZxZQde7GqaScpw8qWRmcpmteqhLNo%2FX6ftlnGY3Gqmfs%2BHtQ%2FqqUVHeREvXbbnzaryr%2BpQ9Sxp9NjGW5z%2FB3KZnW0STZP9yKrOIcz3sFd8paIuMhM6tDFgF2Y9n3c%2BjoEqvm31WMrUL9%2BWUVmopOkzjp5Pz4J1Fc9%2BAd%2B0lqiaxRb7Ru0ro6vGIjIH5C%2FwdAmCO%2BXR6110bkV41wXc3dRf49H14vw5iJFJRB8iqEaci25LKiUOb6F2h9zB1NA4HTGEQTcscpw1CwPNSod3UHLut3kuGfqCmAO1xk4%2F3zn8RQiSWYQmVj%2BWD4IPQ%2FKinJnFCJrxeJI8eYNEbGBmZA%2BRCdokTZwLj7eo%2FPp4RLC9LfXJwV7nWiQqFVGvpMFgE5nrcBIIMRUM%2BxE0dp1gIPMQSfeml2B9GdGxvAC5dAA8Y9QI5dRw2kuZLnO%2Bg6GgBxiZ%2BTvZMnb%2BgOfqQp7qGT3JIiksmsBYUO3knuSwAxHqRYvKnNHxuVr3Nho8sCa9SaM5vJ1o1T9ZfP0RqsngU4mViZRDjpdM4tAYjd7GTl5l7PZDmfQyoI8KQdmp4jCRut94jMN31kcwGOqUB4DTdEeaZu4G4IT4tpCwjnzpRUnDOgFx%2FslHOgjm6AtqP1dQv8B491Wk9e8UkhAFckD67mO4TJJWlLXkdqvxmeYyYIXmcCSopt%2BO9PosNy4nxiRf%2B14kMUqVxTsYag4B6%2BMApNcWvseYbLtg7a0eR0dLqNMK%2BLXEs6S%2BBH0U1gGsPaPJXrYch6cjdXMIW4sB3iwmIqMhG0baQZwRXyOOp3Q7HJ5lv&X-Amz-Signature=e90d50a0c2459d14edb0b1183dc43b7c5a1bf3cbcada233d634846c23b17172d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4MPLEK3%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDxqUqDwGb51TAebfB2piubIGJ5r1HwGvkAgJv92SuJ3AIgf24ReYEVnNENJ%2BE9Q3vwoinJCBKStriPv%2FMC7%2BbKKVIq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDFbW5IEWIdM%2B3pT%2BaCrcA4yxX27Gb7x8MY4mg9x1aZ7pIbV2n03j7zBCfdj436ME2DAQ6KDw6%2FU17ALiaxvIzXoNJJazejAMDTJMWiBOCeprahi6kLXNGJQH0YIQJ0dZmYY58799j3IpL6itW6ZSNf4A%2BjdHSBM2X2ZnvDuGhUIpqCd%2BWruHU7s2SQO7jvVprWwqUUMmpiVWhsiLmr2XRUf%2B7D1mwVGq6IgR8Sr%2B0H%2FirtYtDnzQX%2BN0U6xEa1wO3ttFbeC0HwYwkeZg0vUf2cNlDoaKji71CC%2BMtNRYMSF29C63FVRugR682AXEyFPZnfHGrZ3MjFM6r59UqIfIaM7dYmaabxV4nklVrJMgppzFhRaIXWVe8Vs5GRyBqPxtmvjrgjPXJBeTWsXiMYqln4jkFAnk%2F%2Fzp2egXBNwk8Cx4bUGyXTFt0TUCoOFGjo4GeraPoIHHiCnESrmSAda7unrN7F6jtW8lUVTDxPbGJ3pG3%2FitMbedbkQDKF5j307ViOKzxc7oclC7g6%2FzIkzJVD%2Fh9iPOHFoqfEyflIbrNoSFy%2BDcr5O2SBGchuPtX5Hh%2BmQECF1v6c7H8B%2BY77ztTFIfjyT0UBzDYyMo1UdJDOCmjLEVi21XEig4JYvd3TJNniUCHgawGHoOhSzzMKH3kcwGOqUBgtazBXezJ6ZFIkGeRvzvuWSnkgFZJWQsuCoMeGrTq8egkjjAFNUyR5R2l%2BSUvcOujAp92cPdCRATq4WXvIb2w%2FwxfD7MyEhf%2Fk%2FDYFkY3SG%2FaF6vWkFvb5aM9dWz6q32aU%2BI%2Bpp9bWZrHehJoopTS2aynNvP2x%2FAbtnQfhM4a7FNWJkARSgqU0NXIi72wWR9%2BiCgvDeMCRuBnJ3goe%2BcEssdDGur&X-Amz-Signature=6b41d78a4837be061521922bb6b578e14ba054a1b515cb39990517a8ddefd25d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4MPLEK3%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDxqUqDwGb51TAebfB2piubIGJ5r1HwGvkAgJv92SuJ3AIgf24ReYEVnNENJ%2BE9Q3vwoinJCBKStriPv%2FMC7%2BbKKVIq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDFbW5IEWIdM%2B3pT%2BaCrcA4yxX27Gb7x8MY4mg9x1aZ7pIbV2n03j7zBCfdj436ME2DAQ6KDw6%2FU17ALiaxvIzXoNJJazejAMDTJMWiBOCeprahi6kLXNGJQH0YIQJ0dZmYY58799j3IpL6itW6ZSNf4A%2BjdHSBM2X2ZnvDuGhUIpqCd%2BWruHU7s2SQO7jvVprWwqUUMmpiVWhsiLmr2XRUf%2B7D1mwVGq6IgR8Sr%2B0H%2FirtYtDnzQX%2BN0U6xEa1wO3ttFbeC0HwYwkeZg0vUf2cNlDoaKji71CC%2BMtNRYMSF29C63FVRugR682AXEyFPZnfHGrZ3MjFM6r59UqIfIaM7dYmaabxV4nklVrJMgppzFhRaIXWVe8Vs5GRyBqPxtmvjrgjPXJBeTWsXiMYqln4jkFAnk%2F%2Fzp2egXBNwk8Cx4bUGyXTFt0TUCoOFGjo4GeraPoIHHiCnESrmSAda7unrN7F6jtW8lUVTDxPbGJ3pG3%2FitMbedbkQDKF5j307ViOKzxc7oclC7g6%2FzIkzJVD%2Fh9iPOHFoqfEyflIbrNoSFy%2BDcr5O2SBGchuPtX5Hh%2BmQECF1v6c7H8B%2BY77ztTFIfjyT0UBzDYyMo1UdJDOCmjLEVi21XEig4JYvd3TJNniUCHgawGHoOhSzzMKH3kcwGOqUBgtazBXezJ6ZFIkGeRvzvuWSnkgFZJWQsuCoMeGrTq8egkjjAFNUyR5R2l%2BSUvcOujAp92cPdCRATq4WXvIb2w%2FwxfD7MyEhf%2Fk%2FDYFkY3SG%2FaF6vWkFvb5aM9dWz6q32aU%2BI%2Bpp9bWZrHehJoopTS2aynNvP2x%2FAbtnQfhM4a7FNWJkARSgqU0NXIi72wWR9%2BiCgvDeMCRuBnJ3goe%2BcEssdDGur&X-Amz-Signature=4dad416fe89077b1aaeecbb1d475df7077cd76cb3a6a72e8cc6185cf58e7799d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y66Q6O66%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQCRubcEhAD7nNas%2F8YT%2Fr3anfW3JumYpMYcZQLI9izOlgIgWcQH%2BJS0mOQt9FyYMZEDTSd2rv4jkJpDjz%2BPoySz9oUq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDLviexjTOf77c1p%2BSyrcA92traNWgGC6UvjABC9%2BRDCk%2F8bKGGGRCeZmiFawV%2FdknMxmyv0UdZs7tyysJ8A8GPNMtcPGUYpIJHKAPfkB3vBLxEuAdPqO9B3A76FyeiH6ycxFl2CfaSipYKIHNL7aOhAS%2FM%2BzCGHDP1rucoeyFPndatn6vlllbbpGI9BAYWS2G180NOmdosmI6CQLkIiN5XgCW5TQgdFiLUhooVK5Ag8o%2FyyTQL9Dd9F8QpG1Ty1roMtFeGl5wpxWL0weHNkLJJTfEwkrW%2BADOKfXo4KtdcdMXiHyfTIWFVwY%2FgScQ5kWPAdkWCy%2BXa4gVQGYAwLRS5%2Bp0htkE7Ri5NYWxlOBQQO9OLRVUDp7T7QlynS%2B6OJDm0j%2FBgbOaMQ0qttCN29Arn%2FSjSreWMH0obaFd7%2BC5tt%2BylLqrBA%2FakmQMWVHwejG%2FQhmrlaNgK5JZbBgFQ7u7HOx6Pp4BMrA0swK%2BW%2BMb7EG2O6wIfRCFSbcffljDhrGm00UuIjVJZPgdizmj8RGz%2BFGsBzVhU6P8aZvCqqom2tXVMvP4RG4fYhsmFjGSHLRx%2FPr%2BHmoKlka0w5O1suV34kJ67U%2Be7Xu9xsybGVAax0lGmW1afzbgoN0bjvnmhOso2mohGxzjzHpcsE7MLr3kcwGOqUBaHNAaBwmc6OTcrm7PCP3HBesaPq3zQvyFpbYlFtbp5ASarfJH3Keq8ALo8JCyaTeHEEZEJfVkNObfWfOZkz88c%2FgAVjBhmhPt9EHsvmh1YFBz1FohSabvBmawn6GXcWAmh41FZtvShDh%2FIhdiG8R%2FtUAEQF5AcEHopOQRusZgaUj2KmFSvsuQznmK5VV%2By%2FAtt0aARKZD%2BjA5jcuMYeZyFav3um5&X-Amz-Signature=75fb7a4648315f24f7d1bf4470e9e3dfc86e3d1f6b20853ad5e9b274729d2d19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667B5FRUS%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDWR3AFc3j14z19mjvc0K8wVpv3tGDPJONego0zYwUE5gIhAIKOQKlHF5Zru1Bk1LOMsvBnWtwOAvs%2B21DAjwCfUdboKv8DCCwQABoMNjM3NDIzMTgzODA1IgyoVtrQCF%2BVUgBvCIsq3AOgANXBMS1op%2FFj%2FWUXp8jI9OlDGts16SD5UNFjl72igRKF%2BKTv%2FJfjnoOpjaPFLg46sp0Ln3ubVImF29eKyG0GpAhiy7JeY%2BsMBjXCmQI7SET4KWNokiw9XXHc3J6xkWR4%2B3jJm79adJBSWXZqjyIFwiMwG737bHT2nuFjGUFH7OlltA6VEDpXVofHafH%2FLdfHbjRFd7X5WNYImyyglDxBEYhVpMrpbRgRSoxIvarTxNeYTQSeA4t2ab%2BKdUa1e7RrhpZOLkbyiB5EfLcjHkES3xfOeuzemJBNgW7XQKuqfxpnyGsb6Eyrxe0ua7g659uQkOf%2Ftn6%2Bl3%2FkXGrCwa4xgSqegfUR9wQWnBInenpercuTAz19Mt07h3I8mNwCBl0oGlkcocvSXH3NZiiSFYWMp3D2%2FV2mwV2s4ATfJjCBnpaPmImXM2EQAw4R%2BjcJQpMp3f9mQAheEL%2FU9Izjh%2BmLxVfAB90Gj%2FMsaH%2FhX97Z2wS50HlSO40B%2F%2FbUKgTRESm1KzcQghp0wiFBRWB1fCzd5QdZ7rEjcMqPQCafzm1YWmQyswG%2FEDZXpFduSKSkc3nAALr%2BxP5Lk3%2FSbmXUsYoqiiWjGTSU9YyVaeHaclJfYAWo33yrnSXK%2BAYHCDCU95HMBjqkAYDlSJJkuVRb3moVCoql2uTLBwnwxSRUZkHGQxeBgxK9cIwhcq%2BAXoWOFSM%2Bp1wKoOGJOa9nG0eh4%2BIliEsrvnNHl%2F0ztmEnYxlBt5qWR%2BQkyrX5lqerMxRHp0JJhsJGaTPFN16H%2B9bIGFa3ZPE0Cd%2BVarxdmrirJ4eZRW7qMaHCIlLPKa6ZDOBhyRfxljQgeaHQo2M3DSW%2B5YW%2B948NHahnVMxk&X-Amz-Signature=1a70e2c588d2130d4672ecac379db7cf2eb7af7e96b8e8e268f4ee3884190c78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667B5FRUS%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDWR3AFc3j14z19mjvc0K8wVpv3tGDPJONego0zYwUE5gIhAIKOQKlHF5Zru1Bk1LOMsvBnWtwOAvs%2B21DAjwCfUdboKv8DCCwQABoMNjM3NDIzMTgzODA1IgyoVtrQCF%2BVUgBvCIsq3AOgANXBMS1op%2FFj%2FWUXp8jI9OlDGts16SD5UNFjl72igRKF%2BKTv%2FJfjnoOpjaPFLg46sp0Ln3ubVImF29eKyG0GpAhiy7JeY%2BsMBjXCmQI7SET4KWNokiw9XXHc3J6xkWR4%2B3jJm79adJBSWXZqjyIFwiMwG737bHT2nuFjGUFH7OlltA6VEDpXVofHafH%2FLdfHbjRFd7X5WNYImyyglDxBEYhVpMrpbRgRSoxIvarTxNeYTQSeA4t2ab%2BKdUa1e7RrhpZOLkbyiB5EfLcjHkES3xfOeuzemJBNgW7XQKuqfxpnyGsb6Eyrxe0ua7g659uQkOf%2Ftn6%2Bl3%2FkXGrCwa4xgSqegfUR9wQWnBInenpercuTAz19Mt07h3I8mNwCBl0oGlkcocvSXH3NZiiSFYWMp3D2%2FV2mwV2s4ATfJjCBnpaPmImXM2EQAw4R%2BjcJQpMp3f9mQAheEL%2FU9Izjh%2BmLxVfAB90Gj%2FMsaH%2FhX97Z2wS50HlSO40B%2F%2FbUKgTRESm1KzcQghp0wiFBRWB1fCzd5QdZ7rEjcMqPQCafzm1YWmQyswG%2FEDZXpFduSKSkc3nAALr%2BxP5Lk3%2FSbmXUsYoqiiWjGTSU9YyVaeHaclJfYAWo33yrnSXK%2BAYHCDCU95HMBjqkAYDlSJJkuVRb3moVCoql2uTLBwnwxSRUZkHGQxeBgxK9cIwhcq%2BAXoWOFSM%2Bp1wKoOGJOa9nG0eh4%2BIliEsrvnNHl%2F0ztmEnYxlBt5qWR%2BQkyrX5lqerMxRHp0JJhsJGaTPFN16H%2B9bIGFa3ZPE0Cd%2BVarxdmrirJ4eZRW7qMaHCIlLPKa6ZDOBhyRfxljQgeaHQo2M3DSW%2B5YW%2B948NHahnVMxk&X-Amz-Signature=1a70e2c588d2130d4672ecac379db7cf2eb7af7e96b8e8e268f4ee3884190c78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNKHNWPR%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T112528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCICxED8StGnNZUSWBtwVyida5h1fiRbBWT5Fef7l4YUEtAiBZgToDnxVVp%2F%2FHM%2Bm0ZERWvVZnT9b7ZcaEeWNmQ%2FF8KCr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMdXCd3tadwYGo8xtaKtwDSJOJXBBPs0PSMvve%2FYSsKU824ZFQ7OsZS2zdOB66l3PEm0XOlv76vgOBFLuo%2Bq8NCtHZN5yChz3rF6jKRwvklpmY4pri8212dgBcDP02wTvgOVooqjbuSw4%2BVKBLzA2vEKfPFjg4bca7RrqN8GVB9oThtmf19z18BYRFgn%2FOaDqNP3Qp2Q055wSH2G4zg%2FNe49Jythaiqyf0SSzK%2BzodojHr08BlgQ%2B5AV4U1fX9zYE8V%2B6cMNRVgv2j4Z9dHKKjHY%2F790YedGA5vB%2FIGnheREdkIrE4h8IdQD2tlTxK%2BhzqJVn2GzOOPB4cOZ26TGGWvtaMgcLJo2Q2HysouUe%2FlWgtw8EnjcdJ%2FE9xmsbug3IB5TUMq0MYlJuy2ZpYUlAFKr2lSWkRQXpVA91boogHZB1vbAvDm0%2B%2BqmOK1m0rxuW30lcf37g3%2FfGZROkzaUHpfbI3dcTmCeX8UbjRqTDb3vBCR3F1PSxtMM%2Bfuw0YD1HNlGICAIG9uH7XqRAe30UM%2Fk84YA%2FIed52NIxXqRb71ztsptXH1R679vh4MmVRJb8TdPwxFF6bNgZlSaRhU0f6T6s3koN8c1k9CWRiGYgwDJF2TUyM7IX8BboY0D6941ydTsCNUUMFzgE3USwwr%2FaRzAY6pgHRWuyuC3usoeIQbJkc%2Fz83KQfI0v8IaO2thjO8ZQF4DOo4Mn2hrEQqYGsNExbCxRumWMuagHe9mRQ0IjiyNAphdwuMpgYu0B1RUtO9AxqwSDEMAPH1T%2Bw0KMjmOUInU6XTcdukMggIGc3irioNMW0sqqqR6ycUVQlsQYTbTBNrIIN2R504kF%2BO8986AHUImm5LNagJQeYuQmWpFSXs%2FzzXl0EcqdWr&X-Amz-Signature=d5816d67ecdc50962a2f3af07d6465fa29d78bbd5d9d03ef320e1bb85a9188c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

