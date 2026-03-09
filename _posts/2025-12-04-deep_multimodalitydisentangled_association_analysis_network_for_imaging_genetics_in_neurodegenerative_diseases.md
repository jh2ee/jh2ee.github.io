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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5PG4TEL%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T143955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDbFwSFu14Q19HVX84CQqUvS6W61%2FJG3igP3jLFoZWvHQIgK4jnC5eQeRWe0ptG9NprUsiq0ODtPhZU7NNg09trqu8q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDEKA0vVEwU88WB3ZVCrcAxjOZo1Z3CCYj%2B4STJisNVRk%2Fsl8ZJR4caHUDpxc0cMmfzs6aYBq6KGdDqBytNDTt3ux1wVAN8i11N6OjC%2FAVIXxh8M479H8SbhPRBj9cRy0MVzkM5%2B%2B1CteiMRU2bQrfdKH0zEz%2Fo8dW7Jm9gyVqYVLvKEtcxVJRVFJd7Z%2FSu03QwrJMcnjbZNvDr1msDfZtM4YSqoUJP148EDwMRY8jXT5vcBxdS6QO1yYVHDB6SPVAfC%2BU0cTxVegW4VDxtAg61dptKiph%2BQnMjVFVAjZwC28DOpSnTq2lzsCaf%2FYo%2F%2Bn7%2BYNokuf07tWZBlB5rxgIvYHSfmAUnWlaT5%2FDGoPqYZBEqTcMC6yRZxigElz6V1Ue%2FvM0wWIyjt%2Ft41NbyQeurTEZQyx3dJc46yZHwFYAiXpjNl29vbmAiFlw8bnqjZ2IYRa3RAlFNngpob4lzXVjhuOORE0SB2ypSt8lebFV8v6Boa4nZXwhEiOa5W3oEpgWTbhtFkFToKRvb1olWtHxSBTef3wI20F0yCHMtNT5UB80%2BzTgXj%2Bmr74pYg9vwFGZINgB4f16f1xn8JNWwL%2Ff4nb66e%2BvhiZg930pzSe5JNdjBvs8NcGD6KfvGhySM6diUuV0iq8UtzFdDxNMIOhu80GOqUBd52PV333gzBuVVRrmA%2BsHVJzz6haCt9%2FOmByvAhHqrQxeQQV0OesJGhNYJxcX5a0aAW0P4KuTSXL9pk0vhfcdxV8VjBjUczrQMzVgaABMDmkr6yiBshFIqNpR4ONdDuDDKkW%2BjABefiSVSXlKzLXIXDDFUV90cqH%2FLo%2FRtQNiOMYmExhF601S1BJOokV4LIy6OVfSLflyV5rei2GqclacoJ0pcy5&X-Amz-Signature=28f89aed769c116856636e896e9d761553dbc499564d96555ae956835330bba6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5PG4TEL%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T143955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDbFwSFu14Q19HVX84CQqUvS6W61%2FJG3igP3jLFoZWvHQIgK4jnC5eQeRWe0ptG9NprUsiq0ODtPhZU7NNg09trqu8q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDEKA0vVEwU88WB3ZVCrcAxjOZo1Z3CCYj%2B4STJisNVRk%2Fsl8ZJR4caHUDpxc0cMmfzs6aYBq6KGdDqBytNDTt3ux1wVAN8i11N6OjC%2FAVIXxh8M479H8SbhPRBj9cRy0MVzkM5%2B%2B1CteiMRU2bQrfdKH0zEz%2Fo8dW7Jm9gyVqYVLvKEtcxVJRVFJd7Z%2FSu03QwrJMcnjbZNvDr1msDfZtM4YSqoUJP148EDwMRY8jXT5vcBxdS6QO1yYVHDB6SPVAfC%2BU0cTxVegW4VDxtAg61dptKiph%2BQnMjVFVAjZwC28DOpSnTq2lzsCaf%2FYo%2F%2Bn7%2BYNokuf07tWZBlB5rxgIvYHSfmAUnWlaT5%2FDGoPqYZBEqTcMC6yRZxigElz6V1Ue%2FvM0wWIyjt%2Ft41NbyQeurTEZQyx3dJc46yZHwFYAiXpjNl29vbmAiFlw8bnqjZ2IYRa3RAlFNngpob4lzXVjhuOORE0SB2ypSt8lebFV8v6Boa4nZXwhEiOa5W3oEpgWTbhtFkFToKRvb1olWtHxSBTef3wI20F0yCHMtNT5UB80%2BzTgXj%2Bmr74pYg9vwFGZINgB4f16f1xn8JNWwL%2Ff4nb66e%2BvhiZg930pzSe5JNdjBvs8NcGD6KfvGhySM6diUuV0iq8UtzFdDxNMIOhu80GOqUBd52PV333gzBuVVRrmA%2BsHVJzz6haCt9%2FOmByvAhHqrQxeQQV0OesJGhNYJxcX5a0aAW0P4KuTSXL9pk0vhfcdxV8VjBjUczrQMzVgaABMDmkr6yiBshFIqNpR4ONdDuDDKkW%2BjABefiSVSXlKzLXIXDDFUV90cqH%2FLo%2FRtQNiOMYmExhF601S1BJOokV4LIy6OVfSLflyV5rei2GqclacoJ0pcy5&X-Amz-Signature=28f89aed769c116856636e896e9d761553dbc499564d96555ae956835330bba6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634ATK3AL%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T143955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQCoUWV2YQmT5wI2jAosTnEgce%2FKuX2zEpXAT15b1RKODAIgW62c6Nh18%2FeNjJXKmObOPxvRR7iF%2Frvf4opfDkfzf7Eq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDFzj2P9%2BMrTnwrwnIyrcA4NKdfzacgVxGkZi5Px9%2BHkIBOQJHXYMOKJvT%2BYsSFTD%2BFGYHNGSmdog3RuWii40mAyraik3FzzJswNnIuyd7%2FYLK83nT%2BEzOl5h7%2BgjNUM%2B7JUBB7DyQ6uAp869KqR0JfkRWX1PpkfbnrEL4KFNfqOhcSfY%2FZR6zg%2FFD%2BvyIDY9RkFXpo7TqG%2BSmfIUPSM0nn%2F97qIZ55KbkFhjKUBz2cC41iELiUKl%2F9MxejNMz8fFy7wQmTHI44J4GlVi1DerwszY77391%2FMNS5G5vwsxBMl8aXHF8hIjxarh1hLgNiw%2FXN6k6er7xVUMEaB40r3wvPH%2F50WxoH6WOKOfFo%2F19MR9DXfdd2NfFGz4vaY5POZ26bsebNh1itSGmgBjvvaqHJzAfzs5Fk9pbj8eikCHGGLhTF73qeo15W8JB4C44kPylAeOw1MHruP2LdqH1OKw5%2Be5H9EQsos0xBELQ1Qww13Hog7WKjEO2DMLD%2BAoX53mVwZdJ%2BlwdXmnOpR0IV4HFEZDzfUmR0x5KM2CxBBgHx7XEsqAyhhrWHIdI2ELtRPiapGNEnkmThhr1AQX1m4zQ4t%2BOlvrT2dTYthVzS9LOWt%2Fk4IPWeZAcpMwN%2B2KDkwLsK4lVIxy01V5lB%2BgMMKhu80GOqUBbKPZFeToTcS%2BhV%2FlbSS88toBOMuJKgbHS5njscjB1JhkyksatKK4El3O44lgqEtO4wH%2BS7i9wahBE07BoqTbraAu13gvGDtZDwfZEFHAWkhAlGtDDHKkrb5QiauBrAjYG0JrWwHSN0xDk212FLFnILcAAEY4aPHR%2B0HgCEh3M5mgIWY9z7KHRiVyKQgAETmETia1umY7HPjIh8f5icYAD1dkiNds&X-Amz-Signature=db646b5d56248a6ec738c87730e76b3da1613f1524b47b60f50bf38b275a7225&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPEJCRYT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T143958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDvMSL5CEc4O9A2xOJ68sZxAfHHXn38HiSPU03QMjO6pwIhALO00pUs1J0hRgA1UXC%2Bjo1A8NIrK6qJQWxR09fNwi%2BQKv8DCC8QABoMNjM3NDIzMTgzODA1IgyKSnvRtqn5rOWCpKMq3AMkySHKCu4K6SsgTuk6Y2Z7n9GqLw9twSff5fAXSqb8QfwlfS9cqM5zWjuAacXJEeWlddFCCPE3e2uZ7PXcHM7jtt3R%2BGSsvBE9WC12cFLR0jQ5taK4ey%2FtQ9gMbYb%2FwVVhTIRsJpRggmZT2HGHgYrZtobg9UKzFYmMsLyz9gMsrpVEEeqP9NKMxDaW3pAbYNGWN86wDxEjCfR4dcEVGgWEJoLw7bFrkJnErd46n9nsf5K71hmW0DeW65PoUpO5BTMgUKs7wHsP5ImNcRzlUEGpL%2Fgfsbs4Gnw4jl%2B5OJX5ah8aHpdkIu9CJT88VjnDTVK%2FJLIzrpslhWPv6listeney5xs%2F3YciwDlNM6afKGeB833FabwyJK3AdXudGu0IG7sfnkyjBvPsEidsirXoST57t1rnq3SR%2B%2B89sOI0YVKSDOAzY8QY3wxkHEMt4nOfEwBNbOnOXvXzytqsH9r9EopGLeKDdVO4wNGIgIu4uSqcVHnXluig1eXflBsMfRpMMg0dRoist1d4zi1xRGJZgUfaKZbXuoEhFE8V5OhrRAvrcjpATbHpsuCHNauH9AD28ft0VIijEsRBNXGe9iO%2Bk3dasvROIUIQsdyW3yFC5Ga08%2B9tNgavzemRQ4uuzCPobvNBjqkAS00XYpJF7hRj%2BKdsvVYE05tbQ5qUBs5biFoyGeQzZBnbWOHKpExNqNMHkowXKsHiorl134auRkiIxZ5FJR0ii7z2bpFKfViTR0FbhKhBWVs72bABuzDzR%2FsVLtzLyESuQy4nUduDd%2FzTmMz3071lcpcUS8d05A3wKcPnK48H5nLc3QI4NTS5%2FcRrBBam2OoANgNrpOe0TMBn5PpRzcFlw3qiDv%2F&X-Amz-Signature=928eb244ff88447090490b6f69ce8159c2056ff90dc247b82d606147db3e5bd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPEJCRYT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T143958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDvMSL5CEc4O9A2xOJ68sZxAfHHXn38HiSPU03QMjO6pwIhALO00pUs1J0hRgA1UXC%2Bjo1A8NIrK6qJQWxR09fNwi%2BQKv8DCC8QABoMNjM3NDIzMTgzODA1IgyKSnvRtqn5rOWCpKMq3AMkySHKCu4K6SsgTuk6Y2Z7n9GqLw9twSff5fAXSqb8QfwlfS9cqM5zWjuAacXJEeWlddFCCPE3e2uZ7PXcHM7jtt3R%2BGSsvBE9WC12cFLR0jQ5taK4ey%2FtQ9gMbYb%2FwVVhTIRsJpRggmZT2HGHgYrZtobg9UKzFYmMsLyz9gMsrpVEEeqP9NKMxDaW3pAbYNGWN86wDxEjCfR4dcEVGgWEJoLw7bFrkJnErd46n9nsf5K71hmW0DeW65PoUpO5BTMgUKs7wHsP5ImNcRzlUEGpL%2Fgfsbs4Gnw4jl%2B5OJX5ah8aHpdkIu9CJT88VjnDTVK%2FJLIzrpslhWPv6listeney5xs%2F3YciwDlNM6afKGeB833FabwyJK3AdXudGu0IG7sfnkyjBvPsEidsirXoST57t1rnq3SR%2B%2B89sOI0YVKSDOAzY8QY3wxkHEMt4nOfEwBNbOnOXvXzytqsH9r9EopGLeKDdVO4wNGIgIu4uSqcVHnXluig1eXflBsMfRpMMg0dRoist1d4zi1xRGJZgUfaKZbXuoEhFE8V5OhrRAvrcjpATbHpsuCHNauH9AD28ft0VIijEsRBNXGe9iO%2Bk3dasvROIUIQsdyW3yFC5Ga08%2B9tNgavzemRQ4uuzCPobvNBjqkAS00XYpJF7hRj%2BKdsvVYE05tbQ5qUBs5biFoyGeQzZBnbWOHKpExNqNMHkowXKsHiorl134auRkiIxZ5FJR0ii7z2bpFKfViTR0FbhKhBWVs72bABuzDzR%2FsVLtzLyESuQy4nUduDd%2FzTmMz3071lcpcUS8d05A3wKcPnK48H5nLc3QI4NTS5%2FcRrBBam2OoANgNrpOe0TMBn5PpRzcFlw3qiDv%2F&X-Amz-Signature=71d84e59be752ebfc5cd1e69dcf18f06fd9b8546b6b8148685d48995ba75235a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666R4NJ7E7%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T143958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDBYiEgxolJj0x4Rh4GIHSUsfNay%2Fk%2BgQ86q%2F87DLOb2gIhAN6cxwKpjrZLa89Ept39HxkE7xm9TpRqNKMYtKG8eP9gKv8DCC8QABoMNjM3NDIzMTgzODA1IgyBsAurOJ3128PnpNEq3ANV6%2F3ga2ClK2trymy2QnEMM4ue8KYi4IYPrQi%2F9jJ%2BEzNOMYM1nXJF09ROrITuSE7Z8P1XqVfM9BWU828SjiIJTNSqh69PIqNiVVebCD601zETYMkf%2FImQmr%2FO9mHgsj0LdBv8Ol9kLjshRZQpkDQvCWoOhc8DN3bd4oN4ZecaIEl0DD5skZB%2FcANKfAgSNGauOyhLSPdAVUWHtZuB2%2Fhu9DytRGaEOS%2BuAtwwSZkKutUNqvbYfde1c%2FOkUjXEx7q9r%2Bnl6VzQduC3SnAWwTu38x3WJi7fvocXoNoD20ZDwVIZkyb4XbQmFCDY2wdsO4OmIJYLNze0oGU16xzqAARz%2Bp3Y%2FWEMH7h4Q%2Fc7jzb7cVWww0isKdoALwgSBKWl8WMpgy%2BiIuoCxSmKtwzS0HSp7f7%2Bu%2ByXuhu4rjijaZ7s58CsqAWPVXhoDMnFRoL1fqJgDs19kyisdyy%2Ba8DWG4W3RJJvokQIpN21vMll0pc1Roa5uW3EkR7hZPybr42F4J6sVJL7g7LCXRbcP5NsMCNYQtg2tg4fooU4K8laaTWjaoIMZH661UAHAjkZBQZD3u1U60o3%2BjGMZrBftO79jtPb5syTHyAxYX0Gz8%2FA%2FHuUHnhSWTAep2sYupJKtzCIorvNBjqkATSBsR3i%2FNJfB3kVsmi%2BVRVYMZOidWfKya2UiZ79jHOFF2YDvn4GwLDc4jtvBeGF64duNTDdkKIrfxgOIGaPHrt%2Bof2c0Y41L7wRliXd%2BN%2Fu0YMgZGgwvMkddZgo49TyVDXMv30KbZkasdVRAExMnJfdIu7S9oKlCvTAnfbLEGSXtfGX%2FLJKHaHNlGdRMf%2BHYuBjKnVns%2BOxxnuGg3%2FBLBI%2FFguC&X-Amz-Signature=777f779b02cd87b894b1ff03c798d349da30f60426112fd5b4ef8f79a260c519&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XIJGDHT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T143958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIHC74VM%2BTZhp7T8siFlGJCoBcEl%2BRuohvRcIOn%2FqL%2FxwAiBvS8V9Bkv%2FowZYhapJq%2B3CkqjZWoZuBMeCNV5t%2Fkx7Cyr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMNvtmd%2Fk6nw9TKhnEKtwD2erT2lQliX4x2%2BozhU7dmCxPLwuV2wHDJbAmbPqvDRXEongEeX01c534OQvwFkQXh7GxBnDtAtCKQ6nDevnrCcslA%2FNVS6AujP3fAg9h0fKlbhc5gtwIkIUV3rERWt%2F30f%2FcSxQd9R%2F9OE7ClYsBOnNNHRuwxxh8Sh%2Fx2ATZYCrrAumzX5huoo2yIOmCteGsG8UnyLDG86P7qsKZnXbYnwQsGepuB3KS1Dr2mmJlz%2FoItTBM%2F62%2BmiH89GP7QhoDSfrYJe94%2Bembi65g3g3oqX8LOXxRBdd7bHUoRCqJTQUfmmsa9NPbQbb%2B9S0ywZH2r%2FdCvpiBk1eRnmC5T8oh1JPn%2FPcYH6vz5CpLGw8TUpTCwVu8KCrAaYo3arhfE2KaGV0UERaBkZRcFW6MTyVdXqSO%2B2RFWVWaGD9I7PzsqJ6rTiyIz5DF2bMDIhIp8oI1Gnu3J6LiRHz7kvcdW0YaV6qHBwlFASCZsL%2Fzk6UOuCW5g7ktYYEvN7MC8KeuCjxuQXJaKggJ2m8%2B4o9IKkMiGLdjWNZq5oW3w2E%2BlkMcYmD18hG3aGlTOH4LrwYwmPoNQvUj%2BJM72sp1ZJ3h4DmQlTGXJxqAZAthuIJBdvfxDN0WDDeeeKnVM14D8vUw5KC7zQY6pgES4qRCHxaDpJThAt4Hj%2FWVk6BsG7mbIlnvFlngK7UOLKWM4SVT5EBVQI00VTrcO%2BuBHslD8EdZ2XtPlexFxn%2B2OinBHzKrfX9UMwWbsS5wUUvwTi1HoeFteTGPByGiRLneCkLHvelQA%2BRs1erIXvdFGrQ3wUChbu%2BaoFyoYFWDQAb%2FxYJV%2BgqO%2Fk6CaDRYCI%2B2kYNCfEV%2BChjZRGqsXzeEweJ0SKn2&X-Amz-Signature=0247179526905cb1c526ca67f1a09cfbf3c29739b4a294da914abfefe69949ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXAP3QRQ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T143959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQCRgrxsyj%2BdljMur7UlSEhfJuQRFylGoJNuKCNYZf9jcwIgALkcDQOrDPZ%2B%2F89ubGPKP7hJirgsm%2BtmWw%2FjyuHAEpQq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDEKRaonsPlGeLTMBGCrcA3PLqf5cMnr097gjLx4PlSiJcmQPMgP7PwsAhc7qDkevEoWwRHLn5077LwZ64vtdJ0aCSM%2FB6hipi2T0y09S6lM5qymv4wNb2iBspLJisgnl5PH543jvsjJNwdY2F2c2d2IxkoqZnVqXKVJ1C4Jy2Q8IZ2rCsrxrb1EAQ1g9oyT%2FGlgi%2ByJMfP279AwO9383hCEfc%2BrEY7k0FvqFhHqFFHKy%2FF9MQj3qBfIHtHLNOleNebuhRZe5HeMpcaxnLSDBukfv5OBAgjqcnTu30kZcpiaVbNEJwIPAPG0tuOdg%2FxdpMPVIjDhI9eevJdKJAJH%2FAfLesSDcEduZInEcMXuq5RlMyIMAaFm6hdIOUpKvvHeD%2FkotPJcXSJlgN%2BDSt1scbai0PGTdvBMoHoSugnlkIoWd5XSKfgCOV8TAaihzRFMEAV6lbOk%2FkXZ3KiD0ueKktn3uj8IDxhut5yUlh6SScUwnsKJ%2FLBqvjt0TuTj0GdOcWSk0nXOmoXvr8pbfF%2BXpFBCv6bdRMHnBpjZOEVxQWDS6nt4uteRIbml1QOx4fFsLBJOvOWYlgPVCkzUFAfOQ5JKAkGCLYc3R5EM2L4h3VRZ1Lb0q5nay946ff2%2BtWXS6CcXPpsEkBK%2FjXcbvMIiiu80GOqUBVCK4VUghj6sNUSHJV%2BcWBZaU76g%2F%2FlmlUn07rB%2BW5Y9XNi9zbCYzYJvMUP3y4Kw4wGny7neToHmXpqE9a8PJpf7BLMtG9BqTwS271L2JP22W33e5YIV8U7plVfbiVOj2Cr3EyIggnl8cmR1tqtdN0QggeNZ0KkXy0VNJjle7sQeJn1Zf8kJ1swpGPizmEFQCCqgitWbhVjc8RAIRpJ6ugWCNNW8w&X-Amz-Signature=b53b833bf51693ab54b6ce814cd945366faee5ed9448af3831e81958ac6cbfa4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSOJADQN%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T144000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCwRgWOLpD%2BtUV10jYmcWHox1A9mTS5mlV%2Fz0WnqRkqTQIhAN8%2BJ4qd1CAUOsh8TS9mX2XpFWueb3UzHVMhpdzMzEIzKv8DCC8QABoMNjM3NDIzMTgzODA1IgxCyRiiwEdkTjRHNikq3AMLno3ovcxakTPmbC9%2B4%2F3MiDeqCOwbd51eCeePgFJteAvYutMr3ziDadArYK2LMV7v7d4kDptsqqv5o76JHh17WUoT9yczdvJgK6RuDuY8rHutcag2vZmFZkCoQ9fFh7BhKrEU4nrxkSEPt23BirvkULEqUXrBmpBX7nGKdbOcM8ydqLLLN59OMtmXckpUUQVOevaXxJkg%2BfVIw7pCt2OLqvwKf6HJ7iT798JMV5ABRyVF%2BM4Nbwcyg9Iezr5%2BUt4tMFOfqxu9E%2FcM1S9pGqS2F41xKkF1F3soLCuuFIZM0iTx24kEVWA9F0DkqLT%2BFpe5oXmgKe263kOJMsMCdDUPNcWfLWGtohA8kzL6AabodSCFJBddZRytPgeXxs%2BLcobMA6yzksZtB9QmPErEAJ6vOWQvIVx4MFvBOzUPASlu36KORuoGOfytXQWy%2Bong8oVJ0UtvH4%2Furao21sCbN8CqJwyBcVpyiugqVNHZ92STJnlBPTyQyLVp3JMnANBo6ecZD%2B0BCqjRPS5YebcBrz%2B25RCD3UoPppqVdqZfwMOz8eBTetG7SUVk0kOsx6hbDfVXtvl%2BTtNhJb6Z%2BlPs5O44CZOk34NPp%2BwDA%2BLGT1RpD8qg2hhE34vjBMfAuDD6obvNBjqkAV9%2F0Oq1S5lcZHGyYUuiaWkTBuTYKQCJ6nGENIzAFYVua8cWq%2Bc24cQH6GUIV7jZGv%2FZe1uTppFcsGGvI7jJjPIomnPFrCv0QjtFVfUp79NCIJ9BJSeLbvpe%2BCk0DqI4l2tLGne6uZ5skQ0oW486xMZKn1KhM87v75oBb%2FkDgw7a3D25q4CVoC%2Fzl4%2B4V3Z7VUKa1NbbVe4X%2F2xyENjOL2rvkkGL&X-Amz-Signature=085461e3881b627f11b62ad39dd676f348e7e28ad8f5b08ef7f79fc541064ce3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSOJADQN%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T144000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCwRgWOLpD%2BtUV10jYmcWHox1A9mTS5mlV%2Fz0WnqRkqTQIhAN8%2BJ4qd1CAUOsh8TS9mX2XpFWueb3UzHVMhpdzMzEIzKv8DCC8QABoMNjM3NDIzMTgzODA1IgxCyRiiwEdkTjRHNikq3AMLno3ovcxakTPmbC9%2B4%2F3MiDeqCOwbd51eCeePgFJteAvYutMr3ziDadArYK2LMV7v7d4kDptsqqv5o76JHh17WUoT9yczdvJgK6RuDuY8rHutcag2vZmFZkCoQ9fFh7BhKrEU4nrxkSEPt23BirvkULEqUXrBmpBX7nGKdbOcM8ydqLLLN59OMtmXckpUUQVOevaXxJkg%2BfVIw7pCt2OLqvwKf6HJ7iT798JMV5ABRyVF%2BM4Nbwcyg9Iezr5%2BUt4tMFOfqxu9E%2FcM1S9pGqS2F41xKkF1F3soLCuuFIZM0iTx24kEVWA9F0DkqLT%2BFpe5oXmgKe263kOJMsMCdDUPNcWfLWGtohA8kzL6AabodSCFJBddZRytPgeXxs%2BLcobMA6yzksZtB9QmPErEAJ6vOWQvIVx4MFvBOzUPASlu36KORuoGOfytXQWy%2Bong8oVJ0UtvH4%2Furao21sCbN8CqJwyBcVpyiugqVNHZ92STJnlBPTyQyLVp3JMnANBo6ecZD%2B0BCqjRPS5YebcBrz%2B25RCD3UoPppqVdqZfwMOz8eBTetG7SUVk0kOsx6hbDfVXtvl%2BTtNhJb6Z%2BlPs5O44CZOk34NPp%2BwDA%2BLGT1RpD8qg2hhE34vjBMfAuDD6obvNBjqkAV9%2F0Oq1S5lcZHGyYUuiaWkTBuTYKQCJ6nGENIzAFYVua8cWq%2Bc24cQH6GUIV7jZGv%2FZe1uTppFcsGGvI7jJjPIomnPFrCv0QjtFVfUp79NCIJ9BJSeLbvpe%2BCk0DqI4l2tLGne6uZ5skQ0oW486xMZKn1KhM87v75oBb%2FkDgw7a3D25q4CVoC%2Fzl4%2B4V3Z7VUKa1NbbVe4X%2F2xyENjOL2rvkkGL&X-Amz-Signature=e9167a9992a68dbf870f325d60fcb48a6b536b82815a99326ce444f8ff699ffb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGLSIOPO%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T143951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQCqDsHEC50O%2BBPL%2Fa%2FM9UbixB7NPQd6tmFqPW4rS7nx5QIgRxRE7RHrQ5AtCXZbSj%2BHxLNj8Bo%2BbLxbDSSYzLEFGaoq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDAkxLglvcsL3Ga%2FjhSrcA2k2Glt9NO6vG1EHpnP0BNM6tQ5m%2BlinM5IT%2FrdV1naxT7RjZmWpf%2BBWUYGvK4Ja4Kqc6GrReVBWyf6zVL0FGKwIUqdt8LTsD5brB9u2hZxjgH%2FH9IopPI3bXqc%2FWD6iWkEG20G0dbPMbiLDpP0zuVfa9wwOGj8G3xHNyQMPAZb%2BcxHd1m2L8dsBVDwRTEPWXK6f3d101HNyRC01q7oPS%2FHLUaVxz%2FzRKya6JRr9u9%2F7fbiSD9K1SRuCb8JsIkh%2BnGBRJ2WWpudZkzKR7EJ9JddTfP%2BymlfoWEmS%2B5q8RSGjuGrv5GfRiFgx7kMkN%2F6cRMoKeHoe5UAiTCiVGZMoDGCcKoxhkw%2F2eS6fDM3BJD6CPj1BLqAU%2BNflfN7BIKAPxeOpgFk6m4%2F3VLQ11zCqPQaQvrbqVpe%2B4AD2vnYXNSrKjnwROqkDO4HWspdetgIPg2TzdjG9YFY4D44KeaTIlzFI6l4qb2xvwkA2mVE2dYknDgPJ6HJ1WvxPyBWuazCPDYFu2nHCLigfjTk07HcjwXbOFIH3Fg9pP3E%2FSiVpVorxv2zba05LsWrDRRtC21KOlPbQgkg2Q%2BHDCGrKak3VJbLK8nA3xUqU18WO41lcWAgIK6C9doUrgRYv8CGlMP6gu80GOqUBs7EhwMXNwLP0RrfJswJhLH%2Fr83Hx3ZzRgBuY3E7NxUXdtC3LKfkN6MEx6ZMD%2B2iHisls8XugGIc6Smg3m%2FNJNGH5cdjKCeC%2Fm61wHtAiCdZyd0pKrDhaDgEDcxvp6BpDjvMl6kEkWXQH1JOrmevFmY7pBj1NjuGqHykNFu6I5joBA8iS6FX2kywmJryhegLOOsIzVCQ%2FzfYGU1NBUGw0s1irZUtn&X-Amz-Signature=541baed5c8e79801c01cf442dee12d16cd26d69d394a2ac1568a636cbbb7bf09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665U4J7BGU%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T144005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDdeD%2BAo2suHg85vzjy8DZoZwcZBVgSs0nI2nT1veFFPQIgPkzLFxWw5AggEVexfvwhxoS8h3oe9eGGbqvO9eEIaUcq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDF8ecboXTugrtdOEDSrcA0cK5Yjqmm23XIoJvYvcujcl5onxRc9%2BlcVa2gVjIO5CVudbLFTDlV%2FlzPcomEhnC2B52oqbiPIU6CTJKPbB7QdFiAaZBjFykHF4KTH0aYMscJro%2FWPT5niiRwNZYivGvbuJiAGOD85NgqTR9BR5GM%2Bxota%2BAle6684xJC5zxjdha3OFxUbBrDR2fp0T8HXkYHLxsBdp8TFJ62EvdbarcIJKxZ2SPqhDboZZ3lb7j47R2zDaZN%2Bj7WcAeZ4uzImCuewU3AsTu7ODhunwdV94Tmhdsx5A4Zo4fSkrt%2BZy979plUDS6FdexkYtfIaZa74bqpFBcVtInheQr%2Fw%2BMdNnUJg62K%2FSYjNaBYm7w0%2Fc4HEVDbwMZadVfCnHptDd%2BirxgCedfJ%2BXaaH9IxxiQ45qhBJffUQeGArC95khf7uUH9T9SihX7FR2wwnCiqWAnpV6%2Fm18ZIGjOFHRRZ9Xm9uSSeyxJm%2F%2FQavMfVvn4d8l1jcGbFvjdjl5sMun2p2ksDDVViYAXT1%2BycVD69n1PSng0jwBqiisvOCuR0PPZxyxdnQPtyKnwOZ6tbmcyhx4I97oGDEdJJmONk7pOEhQKfU%2BMTAcSnx4D5R5rdN3m%2Fv4kGo6oLBboZmXyDkpvoftMJegu80GOqUBrwEiATX1qlM8B6Ri9%2B2PXide%2FwWNnZhESOFbmaHU3SCQv66SS6jd0RdyzVRgPDMw%2ButFzLJGrXCyH87KZJQnIlyUvx5lAGzWg5kgoMaksmJUJeDEdcK9UXa7ehaBHNhmNqqQ9mw3TXZSzZ6K2szwQD%2BBepcGMiDxTud%2BpT%2B%2BPODKavHkCaEIhtOaFMpMHgAK96G%2BXWVhpBqf2rmDPo0Sni1tqGti&X-Amz-Signature=dba21f174ef1d14368ea8ff41c30edc0e65589ae2be56844a0b24ce1c2158db6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665U4J7BGU%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T144005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDdeD%2BAo2suHg85vzjy8DZoZwcZBVgSs0nI2nT1veFFPQIgPkzLFxWw5AggEVexfvwhxoS8h3oe9eGGbqvO9eEIaUcq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDF8ecboXTugrtdOEDSrcA0cK5Yjqmm23XIoJvYvcujcl5onxRc9%2BlcVa2gVjIO5CVudbLFTDlV%2FlzPcomEhnC2B52oqbiPIU6CTJKPbB7QdFiAaZBjFykHF4KTH0aYMscJro%2FWPT5niiRwNZYivGvbuJiAGOD85NgqTR9BR5GM%2Bxota%2BAle6684xJC5zxjdha3OFxUbBrDR2fp0T8HXkYHLxsBdp8TFJ62EvdbarcIJKxZ2SPqhDboZZ3lb7j47R2zDaZN%2Bj7WcAeZ4uzImCuewU3AsTu7ODhunwdV94Tmhdsx5A4Zo4fSkrt%2BZy979plUDS6FdexkYtfIaZa74bqpFBcVtInheQr%2Fw%2BMdNnUJg62K%2FSYjNaBYm7w0%2Fc4HEVDbwMZadVfCnHptDd%2BirxgCedfJ%2BXaaH9IxxiQ45qhBJffUQeGArC95khf7uUH9T9SihX7FR2wwnCiqWAnpV6%2Fm18ZIGjOFHRRZ9Xm9uSSeyxJm%2F%2FQavMfVvn4d8l1jcGbFvjdjl5sMun2p2ksDDVViYAXT1%2BycVD69n1PSng0jwBqiisvOCuR0PPZxyxdnQPtyKnwOZ6tbmcyhx4I97oGDEdJJmONk7pOEhQKfU%2BMTAcSnx4D5R5rdN3m%2Fv4kGo6oLBboZmXyDkpvoftMJegu80GOqUBrwEiATX1qlM8B6Ri9%2B2PXide%2FwWNnZhESOFbmaHU3SCQv66SS6jd0RdyzVRgPDMw%2ButFzLJGrXCyH87KZJQnIlyUvx5lAGzWg5kgoMaksmJUJeDEdcK9UXa7ehaBHNhmNqqQ9mw3TXZSzZ6K2szwQD%2BBepcGMiDxTud%2BpT%2B%2BPODKavHkCaEIhtOaFMpMHgAK96G%2BXWVhpBqf2rmDPo0Sni1tqGti&X-Amz-Signature=dba21f174ef1d14368ea8ff41c30edc0e65589ae2be56844a0b24ce1c2158db6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q44GNXWI%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T144006Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCICajcNLcruKmR7TBqEc%2FKL41GQvFTUun7pXtszmw89aVAiARxNKsm0zfeyfkNdXzHvHLXbBwZ4Rg2Kg1H6lJ%2BvqN3Cr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIM4Cwmto3m522nQRORKtwDmSoB6tfvAeTscXvmIyNH5bAqphmr0%2BtVajh1TaPPSkiO%2BFaDlM6jbpwJ9yX%2FBCqVbVRmeTDdlMkBql3DR%2FI%2FiQllwwBF1GMdNwyTwUzwraVZrkd3C5CsUgl8Nhn5gBdeLsPzei2yZV1ioBQLjPmbv37aJptMkPGuvPW9VqvEZ2k9PV8UlnP%2FnXfX%2BwYd%2BbWGeBbNiVo77A1dAX2IpV7WHptiDxI2Te9JvQOkojwp6UkeZB9bduZ3nvf8z7I5CudHyIvQVR5ZYedjcxj%2FnEFmXC3D6D1dgySSVUNBUR8b2bp8RuUThYmroBoMjwV3m31oNFYkNYqow36WJVB%2BFP5w35emyjf%2Fb84RrBpJHwt3ZEkmZnjEgWpDZaF%2FO4zfa7fGqq9T0cglA9ZS4TV4oOoMb0fSiWQHEpjEwKeGmUSRfA8GxTjiwRiPof%2FKTK9CgEFwmiMSOHP%2BZQLOOEQozinFjSq7QgwgjIX%2FF%2FCnzuKRLco4iyJuyi%2BaJ0jH6Uk1lWbLxzJlaohdHtQE1uDgmAdew879mUU5pN6Khetd%2B8UKhwA9M7C6Tlbp1PTDsZXoRAnVrOwDclkHeWUR%2FTSut4sFzrFuhlYbbC%2BwvVv65BLu7HSfRVU%2FDWJlLiwcAKgww6G7zQY6pgHWppwlGJDN6vKLkZ8znxcl%2BBpYmja3cN86Q2ps7ZkmeDQNdGP55OWLk4X%2BrwU0xadLXBGKe92TKatvill1Pfa2KyCsPP5B%2BvyFoKQQUaNCdBfwbf91iqb64058hmgFsz6h2ZX5e2l1nnDvpAdWcFSdzVszIxkdhgXIqmcQqAwTYpJ%2BK0VEUdGg%2Fx1BNuMPqGdPlB6DfZhdAmhmj%2B2bzihHDHHgS%2BUC&X-Amz-Signature=765e616ffef97475d2e2e3b8d26e2cc6860d99270da27f1cf88079b2ba03be9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

