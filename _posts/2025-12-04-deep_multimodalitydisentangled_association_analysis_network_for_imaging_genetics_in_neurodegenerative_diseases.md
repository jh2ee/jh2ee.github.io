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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSUOSJ4F%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQDSJ9UB0f31%2FCyONQJ559LskpNqrXJlEfMlXH8BXroyGQIhAOOBU8Spliz%2F338xH4RnTqvVJ4rdUx3JDNiKT7XklBzlKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzN5SFiQB0ovz8mWzYq3AMRLd7XyxiP7lca5rBj98hbP%2BQe6K0h87S9y%2Fx4BhIKq%2Bdx0tCBIUWWISQqu0xpNIURHHwQGnSYxrsqnS6KDa8%2BdEa4NlqHQc%2B9%2B97Nwc8vLDbOEx9H%2B2nrZGcoqpOZvNGkBWMejtDPzLCvjY0iHcTJBZk9nJAconAJ42puNLGhEyBUae%2FccVtYDlksMGvFzjLyIQYzqWyok4T6cWTA9c0nO%2BMac2RKZrKnm5%2BLXIjjcFi1N7jblznRje44A7kfdxIJ8fBsoNWSqWU4Hbk9P4y%2FbSrnDO39uYqdow7Qpxqy2oEh5T5KDkP3vQ5Xy4%2BW92orw6MuVFb8Ud9Gh3fJt2%2B%2BVIdHuosxfqulCMzFBzsCC1GDO7UfZXTCpgBFaW5RVbG0fIZpt6MiH21xt%2BvLPSzQUl4NnrBfxhMzGzeafK8sZ3oIiyUaSGexYW%2FU4OEYx4n75MJkNgwXcy6Zj4ZQl0Jmde9MnnWE9jzrNLSfs%2BfcapVojPeSeIpXZ66pMEdha4upI3FJuBAutVL6C1R5P%2BzVtMPgednNf48ckJ7CnxabEIrCuy88GeBjgAcab9qfXSXWrdyAGkWCu0mKq8pEG42849lSMF%2FkoRw443ad0Ce3O2T4tHRl9ZsXYbK1CzCui4nPBjqkAUQxjKhp%2Fn8hm9xuyzqINI71cCqr0m8kXfiyJT49dmOQPH%2FsvDuKk42lMtnwOGrSe560Nz4Zf0Jx%2BXjr5OxRvkGHQUt7CXhaTM49rvJ2GcLhfOYSIsgBxVR2tfqv9otgZgux6dKRsugkCFDRsVStlKJozrpRXX%2BaK6CL04QEtP7d9ABwHjN1zzIddgt3XjEndTiiToDoj9u6amr3HkOxKO3Km3K9&X-Amz-Signature=0f4667a0f8cab98c644c2e62e557caf7e2d152cdae994b7262569e041cf80cd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSUOSJ4F%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQDSJ9UB0f31%2FCyONQJ559LskpNqrXJlEfMlXH8BXroyGQIhAOOBU8Spliz%2F338xH4RnTqvVJ4rdUx3JDNiKT7XklBzlKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzN5SFiQB0ovz8mWzYq3AMRLd7XyxiP7lca5rBj98hbP%2BQe6K0h87S9y%2Fx4BhIKq%2Bdx0tCBIUWWISQqu0xpNIURHHwQGnSYxrsqnS6KDa8%2BdEa4NlqHQc%2B9%2B97Nwc8vLDbOEx9H%2B2nrZGcoqpOZvNGkBWMejtDPzLCvjY0iHcTJBZk9nJAconAJ42puNLGhEyBUae%2FccVtYDlksMGvFzjLyIQYzqWyok4T6cWTA9c0nO%2BMac2RKZrKnm5%2BLXIjjcFi1N7jblznRje44A7kfdxIJ8fBsoNWSqWU4Hbk9P4y%2FbSrnDO39uYqdow7Qpxqy2oEh5T5KDkP3vQ5Xy4%2BW92orw6MuVFb8Ud9Gh3fJt2%2B%2BVIdHuosxfqulCMzFBzsCC1GDO7UfZXTCpgBFaW5RVbG0fIZpt6MiH21xt%2BvLPSzQUl4NnrBfxhMzGzeafK8sZ3oIiyUaSGexYW%2FU4OEYx4n75MJkNgwXcy6Zj4ZQl0Jmde9MnnWE9jzrNLSfs%2BfcapVojPeSeIpXZ66pMEdha4upI3FJuBAutVL6C1R5P%2BzVtMPgednNf48ckJ7CnxabEIrCuy88GeBjgAcab9qfXSXWrdyAGkWCu0mKq8pEG42849lSMF%2FkoRw443ad0Ce3O2T4tHRl9ZsXYbK1CzCui4nPBjqkAUQxjKhp%2Fn8hm9xuyzqINI71cCqr0m8kXfiyJT49dmOQPH%2FsvDuKk42lMtnwOGrSe560Nz4Zf0Jx%2BXjr5OxRvkGHQUt7CXhaTM49rvJ2GcLhfOYSIsgBxVR2tfqv9otgZgux6dKRsugkCFDRsVStlKJozrpRXX%2BaK6CL04QEtP7d9ABwHjN1zzIddgt3XjEndTiiToDoj9u6amr3HkOxKO3Km3K9&X-Amz-Signature=0f4667a0f8cab98c644c2e62e557caf7e2d152cdae994b7262569e041cf80cd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HNUYT6L%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQCfjkOYfNtQEWSNQqqskd4CnaInR2IdrKdWPuVdc6lHwgIhALryl1z51LvvjKec6CAu%2BSIcO4GqgufRkIEbKMbOUgKrKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxHj995Kq6P46%2F6g9wq3APx0UiM5a1VaZCgsE4t%2B7T%2BYraTRZD4OKsPopYOK38fa%2F5b1fuWVT%2Fm70V3bniCn%2FBLt2IveqSFeEa9osvBVwfhUfxwkQaYKwQnBHE45gO8Y9hIEIV8DJ3RWbWu3Q7BAj8c%2F%2FHQcV6mHEI4CLd3FExF%2BjHbyPWoCfArLxe1vmYEK5KNEkV%2BhGcA5LjQmvEFAlnJmWP55h7LdFx7fHCWQw%2FNU3sHxXs6w08%2FVJoTcNhKLFR9uc5lbvGtUAXcAIw8m8EpudtNRa02bII3VEvI1hQ%2F%2BzLsMAWbT2olcrgu4Apx9YY89pxgCwB1OVMlqE5RXYK6iJmsOJbVRTiEku1TocHT4U%2F1PPechiJtJjzfoBEcE0RHbai8ycrjb%2FpHQlnqmyLJySA9pLYriAIYeOuBfIuKquFXgc5JG2q1ydY1GQoWvzWeItCxMhZkT37MNi964r8lLwa%2FCx6gNOiqjhnCBuUggk0Lz%2B48OR5PZTFARSNftKJj5KlmYjWXqod9nEerS%2FFL7dl9nMZQxiFD21uZe63RFk7qj%2BxBHkTBvv3v4s76kwQuKL8TW5GsaT%2F5rjLl3U9dNdytaD1j0ULL%2BrocJfiBCNAKwAK4N646hUglMK%2FC34kQZa%2FdQ8ar8m%2FwkTDejYnPBjqkAaHDQIARpsXjXpuiYMJM3GyPMCxXv7l%2Fw8EoPQBzEIiI32IQulcAxnFH4h6wHlciIVUDFYg9ihTORalXmWEpq1%2Br%2FwZJ1SBjRy5RvuDAimCHT6t3wL%2BrPjiw%2BKG3tR3p9FPlopJxXu6%2BAEsQR%2Bhbxi88sXrnjr8upMdq6O8HrXvZAG1TBlvD8C1KIPjmMMcUzhPXTb22yyP4RPjKRtmS6TeNKnWy&X-Amz-Signature=60e0076f0855cf352b94d7c4273b434e3cc01a3a406e7c68b3ef9414675a3547&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NUNJW2V%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJGMEQCIEMiwV5q%2FWJZjACQ4TFvdLpLUUFZqyZSNGKgAcKakI%2B5AiBwEfwFALdw%2BdkcaPWhjhU3wOpn8H4mXR%2BOk%2F0aFw1PqSqIBAjY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhG7GK0FHa40K13ZwKtwD9yyiUgm3gQfkq%2FGWfZ3s%2BznUpT7b1Xxy3eevXfp3lNEQX%2BYx7wQ1hp39wQKxHDXKkMucEEyEKfBpqUyl7mxk6CMnVN6wCk5jgdIgGcnxsEK6hLTDkMwmnxiNx%2FJTzY13KwZHxB4YFF%2FCQzyu2dZxhgALCW4eQEx3ZuzIocbihApgcoHbT%2BeHCktx8bV%2Bwr9vxl4RqZ7CNDkGxZnpe%2BXGJZOZ04hRkkxCAnjMfH2qucHxQVMF8qeIRpUWatFxO1C9rSNe%2BXJ6ce4HIptdmvKbuXZvevWYt8Pr%2FBSrvHM27UXklSzG2XWxcObHGvFsD0Jqm%2FHHJRMjUDvwmPuxAxk1EVMqA%2FXkgbVRoDmODvivUq1pDjVmE5imjAZO1fmJdPnBSTsJQBQYGIe3ZlsDuugrQz8RYq4IIG3lG01rVNZrgfZBKmGNv0HpMKNYtX3f1BblySXY4cjIgotISLSUXyCALYpdrxkCZT7tkdArwTEo5vETtzM3y%2F6yisYTg81lJhwqp3dHi7SNUJZ1ziPl1AzmNaFEEPFKcUEmN5olygUmJWZhuIRY1gr12YcHf%2FcDbkVh%2FlElkMCJiIxLETbkf9h6%2BgK4J687ZSbSt25sx2vPaPVkCCsKJDZEIZDCSkwwm46JzwY6pgHd68UsUWpddcEk0UEOY6h8NAM%2BmSEgP54Yfmp87WsT0KFvwWk36LtLwwoXDW53pht8JJhBHGB2E3u0wm6CtnCVRkJ8VzVQfMM%2B2zKgb7h1dN83uCqB62J%2BnBcv%2FT6t7dL%2FDP1j2h%2BXxPp09gQyzVW0jgQ97SFtJtrE6Dk%2FBMEuO6SK6xSrmqWdBMXB5RHQt2zJaDU5rOtBs4SUKHo9i9lEY4RYVteq&X-Amz-Signature=eb7f7e699399ff200e948b30d0030f79553c83eac21734d300cc77cf8b667ca7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NUNJW2V%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJGMEQCIEMiwV5q%2FWJZjACQ4TFvdLpLUUFZqyZSNGKgAcKakI%2B5AiBwEfwFALdw%2BdkcaPWhjhU3wOpn8H4mXR%2BOk%2F0aFw1PqSqIBAjY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhG7GK0FHa40K13ZwKtwD9yyiUgm3gQfkq%2FGWfZ3s%2BznUpT7b1Xxy3eevXfp3lNEQX%2BYx7wQ1hp39wQKxHDXKkMucEEyEKfBpqUyl7mxk6CMnVN6wCk5jgdIgGcnxsEK6hLTDkMwmnxiNx%2FJTzY13KwZHxB4YFF%2FCQzyu2dZxhgALCW4eQEx3ZuzIocbihApgcoHbT%2BeHCktx8bV%2Bwr9vxl4RqZ7CNDkGxZnpe%2BXGJZOZ04hRkkxCAnjMfH2qucHxQVMF8qeIRpUWatFxO1C9rSNe%2BXJ6ce4HIptdmvKbuXZvevWYt8Pr%2FBSrvHM27UXklSzG2XWxcObHGvFsD0Jqm%2FHHJRMjUDvwmPuxAxk1EVMqA%2FXkgbVRoDmODvivUq1pDjVmE5imjAZO1fmJdPnBSTsJQBQYGIe3ZlsDuugrQz8RYq4IIG3lG01rVNZrgfZBKmGNv0HpMKNYtX3f1BblySXY4cjIgotISLSUXyCALYpdrxkCZT7tkdArwTEo5vETtzM3y%2F6yisYTg81lJhwqp3dHi7SNUJZ1ziPl1AzmNaFEEPFKcUEmN5olygUmJWZhuIRY1gr12YcHf%2FcDbkVh%2FlElkMCJiIxLETbkf9h6%2BgK4J687ZSbSt25sx2vPaPVkCCsKJDZEIZDCSkwwm46JzwY6pgHd68UsUWpddcEk0UEOY6h8NAM%2BmSEgP54Yfmp87WsT0KFvwWk36LtLwwoXDW53pht8JJhBHGB2E3u0wm6CtnCVRkJ8VzVQfMM%2B2zKgb7h1dN83uCqB62J%2BnBcv%2FT6t7dL%2FDP1j2h%2BXxPp09gQyzVW0jgQ97SFtJtrE6Dk%2FBMEuO6SK6xSrmqWdBMXB5RHQt2zJaDU5rOtBs4SUKHo9i9lEY4RYVteq&X-Amz-Signature=d1e0f31796710e4d595938f9fb0a99ba47825fc78651addbbd08414d275ee759&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LTVTK25%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQD1W6BMCeiGm%2BYVs6ndfG5IR954t67akjuN6Idj47M2oAIhAJI3n14Gza8Lh6ZvYmoENigU178szBg%2FxZhguog7a%2F6lKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgySkuAyvOalocqVdJ8q3AMzHWweMTxH3Q5RK1WeG7OzKbmFoWkw6j%2FrV649EdNiFdlXGU2HL%2FZ7cIgWpwagn5jXhR51ZxHtDsFIm2bl5tJlynxovADRPzlUyLnP5Q4ICq9ViedZB2UJPQmPEBQ2tWV49BN05AW2crQpYxFSX%2Bb6t1ycPIZLxHDuqYbRg2FFl402NR%2BjBkvF%2FIR5K7sYyMKl7laJWo%2F%2BkuzUhzoU7MHmgTD7tg4ghjglULlcdw3JvMswqLDjtbKbJntstenii1v2t6q1M1bLmCLFIWA6iKeccgRr0DnG5lXeruSM8WoaP%2FHvtSrfsiebDqd6IBgHndWLl2ua8Mlv1nDFTnj03u1v29ppce84WgoIw6RQfqHA59k9GZTUOd3L%2FEtTPgRgQ8rSoxVR%2FTFkEyP1ovbuFgJmhaKT97VwmU1O3HWs%2F18Kp22GRHHDhG%2FKB4c1ho0%2FYiTDF2kIBD1r2yR3p0Qd84UypjOITGVyEeKa1QDlqGh7yuPf87VW5%2FvmVgXV2Kbk1e%2BKk6Ivlq1CeOkqjygRbfy4xh5raowuksD%2B1dUH77emqT1mYBnuuNuieKzjWDh0Ah5GytUyDcOXgQX5vc6C6v%2FvqTv9VPWbMqfBqX6UOoxKbbyvUG0kY4Mj1vd%2FLjDxjYnPBjqkAXIjQWv3u0iPGDOPZAWTG2WkXGuT95l1YQclWYLH2GAzwQKLwPkhfQ2NH4EpTdaHayXtzwI7kQh24KrOTtSpCnKH2OkBGq2JEoejyAPdwZ9Y%2FJRhtUY3YoEri%2FxdhAamNfIjDFcreQ3OxV3On54ABrcbdvumS%2F5RdKLEvWcr6lUh5lVda%2FrfdmhjJ%2BqewlkQbtKaIPADoG0jDrMMd5pJERJSkinb&X-Amz-Signature=4bb4500274661212c9003b3bbdf7946f79c0a7022217552b5d0491ce1d459711&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QX2JLCJR%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJGMEQCID4pWbF%2BbwwHhYRkAqSFToITdkATQEV3bzc%2F6cX0u4%2FRAiAzza6Hz1z5ODn0YF80bgUQv6C53T1KjHeWt0DM731YSiqIBAjY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMFkamW9BzJIjcug1%2FKtwDV0wwtBffvEN15ylYM6c%2BUDAibpjXT00I5kdmJQtEheB5o691e%2BardiILn6h80Wsb4i4eHW2SKsLeeFpaAmm2mxYoboXyzIzxe0Msmbc9r563u2N5z2WyY51GJaACm8LxRt%2Flo4wajCi%2BuM12wXxE45VG25HBezoJIiIOGGYVqww%2Bkdq2%2B0WZSBG%2FztsPnVGq3U5XY0%2BkMNBx%2BBoQQs1983PMw6E4B0oCu4dYUEbN2jU8YEMUkUef3%2Bdhu6JsDeljAjlNEKDbHypqMwSTYHVKjScjwTDbWh%2BoVD8ptvab5GI2PrHNql1vkbBhsQxW5FBxszwd4wnyLKI3U%2BF1ib86ROPuuNiTxn25NcliKpkb5vqNMF1YXHtFUVVZyadEBqBCuVV2mwWHqgfHd6Z9Mw7FY0MjazPJhyxduvLlAMtSEDCpDyPKtnn%2BDwt3mJWMK78jmSZoAnsPgaDuQDnPyH4or4wZzeVgJBWo3mn2eu0fhtRZazjrwFKSsk3tKBZhkcEurcud01%2BzSCT50c0ViVSgXHOkaqHXDTY2zKsiQtnKiGiGams4ytCi6Pqcxibz6%2B8q4sjU8SozcZrXbDgw3jU%2FJc1dap5x4wIF418HQ2uOpzc5gYXqRwhy9i5PN3Iw24uJzwY6pgEJ0OoAJCpZjjiIEoFjvYzMyvZrAS%2FGCmzb4fJHDMfzgfIYKdrcYNmYVsWqFy5LssXc4X823gWO7HA21OYWWuvZSQY%2FwVCbuMjyYMzXSkR56vE24CxHnZUne7oCIxxqTMU5ULLjg%2BvE9O3oWYba9q3%2BUNa7wxTExKtWtI7bRdRK4XKiL19k91oMorhHy7Z64qdfPRRZvyaDDS0Z5yy232eGKQOZQ2CM&X-Amz-Signature=77d7a3953ec1d9b0502082c2361ca48e06f04a270db123a72641dc64949bf20f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJWT3VEO%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQC%2BLj0OjWMadU8eZB0xaOLiAZ9wlCZizqWI1RdVbWxcNAIhAMTwuujKOATJoc56QSIH3q%2FQAc%2FWOAlivVQMzMr4cXxCKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwGaV%2BJ7Bm8eTKPZfgq3ANHLyXYEND2ltVDsdrvioAW8A4NRcOi7NmkvN%2Fcmnu%2FUIj0m8HEteNXNSsEQuj6B%2BSbduAUNCTJKLqCuwkHVFb8aHTzfjNKHpcKNtxEPNawwRGlHN6EpG1CndPuQhambgxbf62Eej%2F34KfnRSXAMeukcGwyfoMDwsSeunsSQgC9VVyOvApFJ%2BQS6ZVbcqG3f7joTIDQog%2BqxyR%2BfR0kh4TwmUNhsjeKMqW3U1NtAwU69YUjqVDrb8VDGoPS98TjszduQ6xPA5EfMTtklzh6wS6cZuUyN7qDQFzDKcHzfEg%2B2Y7GNwJya2zEm0jfaIiQM%2By7iT0plEk0Sm446Sthw0UEe8N7OFDB%2FHEfDSDKudT4EYzz6sL0oVBI%2BUn%2B5z5z0nV3Ck2Lil4p%2BiUrGMMqwBy4V25%2F0IzUhESUi2tSRTFnysV4b1NDPgJNpR37qnrpEeDd5BaXt5LQKRgmA4Pfc8Anor2z6xiR7vsZjetMT%2BjsmXKOP1az2yMNOKutDmZFir%2Bn3vL3BDSAFk0z0s7Cem9qn0duQFevoB3x2UBwUM0k3DiNOGu1Y4YQNUhpsBH9bPNagxehOQwGZFJc71pN1iUKApUFpm7TK77OXRS17%2BAXPplROAX3WQxLuZxDCDDyjYnPBjqkASMBUchvjG8LLpC%2FFcOApNBoe4LwUREqHGohbXDboAqNWtFUOh6O4T2xkpe7pw%2BcEhYFD%2BZY13FhivQMNbEbO%2F1oXImwUctQi3ZHdR97j5eNfxlD3n5zhKVLRQa%2F8Dw%2BzH%2F6cqxBj4%2BiYjLJE3jHGrt83hceTpFWGl2VzloOQPrIkU3hBIh5VgEvSDLwfASvSebFeZxAv0%2B7v2iSLsdslaMFwnej&X-Amz-Signature=f9fef9bafcb14bbbc527ed3e33e9146619cc2982f0dc12cd3681f2fdaf50e979&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656OS4R5K%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJGMEQCIFkq02TFhenbTmYwJSyMWIvt8loxYFiYRKvHyT32sMHqAiBjs6LJblt20y73sg3NtYArV%2BH6QF%2FvGWa%2BshSEbvRreiqIBAjY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWYY7%2BPRtaiD703lYKtwDhyHtvZ695tJ0SU8hzCXmLSmU71ee%2BOFguQFZzKr9sb%2Fxi97ePuZB0VGjT6ZU8LER4p1AT6lbnNGabiQ3vPuadYdF4fxXLeOCPDdSW4F3YFWqnqSUgM4hR%2BKEaR8gk1COm1q%2BkUuTc91t3jMtTOFuQNJ2zWBTt9zIej94mCSp0VvWx01fXIVXd6Nx3jLx8kTto5F2KKO%2FqLcROydOioWZBBlWpQoYC0jVB9%2BPDtcC1db5lNDHNlYPKtOFN1d%2FMf8SXrhdtE0gdJJ192ZjjFkRBOw2BdPsvnqIjaqLTW%2Fob3qR2qd6EqTlu3vSI2C5B6Jl1GwqnbtuE01Zkq2AVRZJxSrcEd0KJqlhzllMukNgQXJDgx6jWQvjA7NdNbXbhnwLIFK6VpQ98f4rTS1yvt2URG%2BMLiQuKgGtIpIleyTePr46A7W2VOmir5u5om6YP9alpDH7fZj9U6e7hr7iMaLocimlaPV%2B%2FzRwmfenRdhuY0w6wNw2JlL%2BONFDdWR%2BDpZ0CoY%2BDnE1V7MDBV1CycWuIQtV9sBUDIqm7lQvjeln5EEIbLVvW5FB8LqiCEDpyChd8cWugRcOrCD9J2%2FVZbFdvngo8ANgHk87KYq%2Bin2SM7x7nUkU3qH6XIylU1gwxY2JzwY6pgGI81hyA4OvRtL8HAp%2FYtwsgEXLpV0oZjbkn7YCqDQBhJt9O8LKAC24fh9I3%2FcMQ0%2F%2BGuJdbYVr1Fetx30X7o%2FpaBbTULgoFJP1o34mq3WGSPrrGgd3QvbwBfPG65enRRRssWQ%2BtVblJjxAiBVoYehI3SVKyaX5cFTpMkiJ19%2BEuIhzQxa%2FvnmdoA5NNzHYbvUVHBy8%2BOHIEYlssw5FNeLUtxeizbFO&X-Amz-Signature=d8cac0f9990cdeec8fc60737aa57117b2d034ee04d4658a8b7853e3fbfb0ad3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656OS4R5K%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJGMEQCIFkq02TFhenbTmYwJSyMWIvt8loxYFiYRKvHyT32sMHqAiBjs6LJblt20y73sg3NtYArV%2BH6QF%2FvGWa%2BshSEbvRreiqIBAjY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWYY7%2BPRtaiD703lYKtwDhyHtvZ695tJ0SU8hzCXmLSmU71ee%2BOFguQFZzKr9sb%2Fxi97ePuZB0VGjT6ZU8LER4p1AT6lbnNGabiQ3vPuadYdF4fxXLeOCPDdSW4F3YFWqnqSUgM4hR%2BKEaR8gk1COm1q%2BkUuTc91t3jMtTOFuQNJ2zWBTt9zIej94mCSp0VvWx01fXIVXd6Nx3jLx8kTto5F2KKO%2FqLcROydOioWZBBlWpQoYC0jVB9%2BPDtcC1db5lNDHNlYPKtOFN1d%2FMf8SXrhdtE0gdJJ192ZjjFkRBOw2BdPsvnqIjaqLTW%2Fob3qR2qd6EqTlu3vSI2C5B6Jl1GwqnbtuE01Zkq2AVRZJxSrcEd0KJqlhzllMukNgQXJDgx6jWQvjA7NdNbXbhnwLIFK6VpQ98f4rTS1yvt2URG%2BMLiQuKgGtIpIleyTePr46A7W2VOmir5u5om6YP9alpDH7fZj9U6e7hr7iMaLocimlaPV%2B%2FzRwmfenRdhuY0w6wNw2JlL%2BONFDdWR%2BDpZ0CoY%2BDnE1V7MDBV1CycWuIQtV9sBUDIqm7lQvjeln5EEIbLVvW5FB8LqiCEDpyChd8cWugRcOrCD9J2%2FVZbFdvngo8ANgHk87KYq%2Bin2SM7x7nUkU3qH6XIylU1gwxY2JzwY6pgGI81hyA4OvRtL8HAp%2FYtwsgEXLpV0oZjbkn7YCqDQBhJt9O8LKAC24fh9I3%2FcMQ0%2F%2BGuJdbYVr1Fetx30X7o%2FpaBbTULgoFJP1o34mq3WGSPrrGgd3QvbwBfPG65enRRRssWQ%2BtVblJjxAiBVoYehI3SVKyaX5cFTpMkiJ19%2BEuIhzQxa%2FvnmdoA5NNzHYbvUVHBy8%2BOHIEYlssw5FNeLUtxeizbFO&X-Amz-Signature=cb5dad17bb2c892a330731aa5045ffc7aa2bbcdd49a48ed080b4e1f8d19ee738&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ESKPOFX%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIFFsY%2BBBSUXAWPPXmGtDRZuWl1i2GpHsovfgpOQVWmZ1AiEAwEoC0M%2BmnlK71Kn92cYERDiFCraiNwasEGg3UX80oq0qiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMyP5X8%2FDuqXwTt9WircA07jXQXbO5UrP5lmJtOY0Fe8v1jlcXwFzMAEyb1souTLfKvBPxzdLPlZTcGSJedVTgSiOT%2Fpp%2BpNXI6E5IId35B%2F3teelgHlJdwWa4W%2BRp2VCLGY%2F%2BxBkyIM49NUDO4a7aWlFbEb9a7jcf9kvusJD8kZCBfbTT8WcPl77uTKdHPBKS3cjrF%2BlS9ggLIYZPk03DVJ5OF6meqXna%2FuHXM%2BJUAdNL2L4k4nf0W0RUDFyDV5z%2F5xQH%2BkjzxsHVXc3j8CQumr%2FFRLBK64cbdD2gYIrnezfB%2Bv0u8KeQBjHmjGcVc9pdeXqmR0kbH1sdBHP3JElMdJGTzLsPyDcNnM6yPGoaWF6KGjeHFJQWIBg0rRINR8EcGM4qj0gc71762iF2QOvnY%2BqWBaberNyf3LS4rmZYvKoF1gfAYM6QEO3aWv3X2SnHv3lU8BH5mNarScIDy0ZByjVVh4pz22rhjWmbydWu1G3MRH1%2FTDKVYbnlcaFzLfvphwQSJfR7l512Hlpwi%2B%2BTNbtEhFfGOUffgeP%2F65kOywg%2B6OkTvKGnGPhmAnv%2FEkePkqrDNHIn3Ul72MNnLeqfH1PSnZJdd1wcqYysUVWJS7hrXAKQkLztK0xBeKMUYbpgazV5tcGX0YnlEdMMSLic8GOqUB4YN%2BKE61b51YW0nQsBrO%2FiB4YLfUzggMUJfT0YMLo5HInjC8grlH4a6OPBYjwcaodXO7LqiO9lZqz2A3T10rJCm2Q6ue8NAL%2FmfS1Kv%2FsyXGmptNXkBxrnLQ7OOHiw5o1E1c9l9KRdtuL982ALv01a3%2FP8OtvApSij%2FM0G05HxpxIR%2Fr%2BvWdV0aSSbLlWPo2affMzQSNKAXVFrDRN6a2%2BG%2F03Z8d&X-Amz-Signature=6a0f03ef103ffd5b6e9b42cb41523a52ff5f8a33b940850e310e2f4929192e36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665AGIDUZ7%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIC%2FaSeQWIeWeZcC16PfiCNwMMYRHRY8yOvWUxZN03lNzAiEAnehvdaUn4Q0gF%2BPJB5m%2BYuBLIvhgCj9bZWPHgkJNoW8qiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIriLGDmn5FNVxShAircA2BierJIz10aF1ms4dUYI80bzyNruGJZYRb%2FxRenflWJcletz7tKmGZwb4VWdFE1Hnean59tO%2FUw%2FrUM5QzbcE0QODifU4xToMK7e9XeuF4Lgc%2BiXzF5MCHNr%2FbKpCyKtP%2Be5loO5Rgvc1dkYMThfr6bKuZB47ODZ8ujhPY6keuK78G2JmAHCQRse3qdeo9gryBhac4S68ltonLymWRccnFlnOi2gqLEyKzzebXLIBNTCHWicomqgysW8AzEIjT809VNPjw7%2B2fX8UD88cwa7Zevp0EH6BvFt%2Bsd%2BPzGv7LPjrVhe4TtZy0LTTpZxfoEnP%2FNRTtXXSqD3ILWkS%2BU49D7KxoyWtF7xlsEmKBcfbjpNKVzo1a9Z95dZA6XZ7sQpIBFNipOIdBnm668Cv5U6CM2cwZW1wPB1YBhjV1rkZKzKjBtUGASudozTqP0iZrDDeUqJ6QHSqziykqAQ8Dq8nlMzWguWtjv4s34qAHeHqzb0c1QjgYSUhlkIiphGRMbcIsWjfnsn9M3iOEmYC8HeFIitBgDYzRhWIpgaW0vJFa1IooygstFt1rk48KGLe5lGRsqSuOONr%2BM26PLg3F%2B27xpNNSr9Z1XBmJwCiNFr9v91RsK2ZMMSZHUPOWvMMSLic8GOqUBAzOPP1maRucu85mycr%2FMu54IkjqWELXVX0R%2B3gQLx3eS1LgxyJvVT2M2gSrR%2FDhBReBSeV1fqBIn7%2Bf3XK367U%2Bq%2FQNASSPDMVcHwXOLXGSHCFwCaJIVxx8qRs89t3Ve7fbUJPx1TqPt0zY%2FHgBYd%2B%2Fx%2BlErrp1ngLlFyEeQWVBzb%2BNVB5gXzzGGXq76upZySjw4OIdu3k2Rh7oP4Zu1nxVwRMu%2B&X-Amz-Signature=5839dcfdf5b37f9e0c3514be7a9d7766a8726e27235a2766e9ab2382538b1ef8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665AGIDUZ7%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIC%2FaSeQWIeWeZcC16PfiCNwMMYRHRY8yOvWUxZN03lNzAiEAnehvdaUn4Q0gF%2BPJB5m%2BYuBLIvhgCj9bZWPHgkJNoW8qiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIriLGDmn5FNVxShAircA2BierJIz10aF1ms4dUYI80bzyNruGJZYRb%2FxRenflWJcletz7tKmGZwb4VWdFE1Hnean59tO%2FUw%2FrUM5QzbcE0QODifU4xToMK7e9XeuF4Lgc%2BiXzF5MCHNr%2FbKpCyKtP%2Be5loO5Rgvc1dkYMThfr6bKuZB47ODZ8ujhPY6keuK78G2JmAHCQRse3qdeo9gryBhac4S68ltonLymWRccnFlnOi2gqLEyKzzebXLIBNTCHWicomqgysW8AzEIjT809VNPjw7%2B2fX8UD88cwa7Zevp0EH6BvFt%2Bsd%2BPzGv7LPjrVhe4TtZy0LTTpZxfoEnP%2FNRTtXXSqD3ILWkS%2BU49D7KxoyWtF7xlsEmKBcfbjpNKVzo1a9Z95dZA6XZ7sQpIBFNipOIdBnm668Cv5U6CM2cwZW1wPB1YBhjV1rkZKzKjBtUGASudozTqP0iZrDDeUqJ6QHSqziykqAQ8Dq8nlMzWguWtjv4s34qAHeHqzb0c1QjgYSUhlkIiphGRMbcIsWjfnsn9M3iOEmYC8HeFIitBgDYzRhWIpgaW0vJFa1IooygstFt1rk48KGLe5lGRsqSuOONr%2BM26PLg3F%2B27xpNNSr9Z1XBmJwCiNFr9v91RsK2ZMMSZHUPOWvMMSLic8GOqUBAzOPP1maRucu85mycr%2FMu54IkjqWELXVX0R%2B3gQLx3eS1LgxyJvVT2M2gSrR%2FDhBReBSeV1fqBIn7%2Bf3XK367U%2Bq%2FQNASSPDMVcHwXOLXGSHCFwCaJIVxx8qRs89t3Ve7fbUJPx1TqPt0zY%2FHgBYd%2B%2Fx%2BlErrp1ngLlFyEeQWVBzb%2BNVB5gXzzGGXq76upZySjw4OIdu3k2Rh7oP4Zu1nxVwRMu%2B&X-Amz-Signature=5839dcfdf5b37f9e0c3514be7a9d7766a8726e27235a2766e9ab2382538b1ef8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IDNOXGX%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T154508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIQC7DegXvG5NZA1QJAv6SXAQGyBvhfKl8%2BCuxfxx86jPgQIgZLKkBSJVaMLheGs%2B4aT2CCpyAsFcjnnkggJ1xW4Jr3YqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGJpx1%2FXz6SQgN4n5CrcAzcGbQmq39lhuMaTS%2Fl4hMHEAruO5rvPYZG6LRv1mPdZUBS%2F%2FsouB8LzzKUHrCrlq2SEVpbAAXs54j8ZdOCMIe8KUOmgJq1Lp1f2M1IIwceVxQ6TrGnukARpw8%2ByiPRykf9B%2FmyS0dvSfogcJGMtxo3m3IQABCJnODci2m2itGu2%2FDqrYqq3sMSHAxEQppbsiAwP9uD5o966K781Na%2BzhBCSaUyFeIJYrLMW2BOvnhGlKEjkkMpnMzVCfyBNMWQhG8ZBAU7FcDFHOASM%2B0Zzl%2Fc6iSXC5rZhsGgqzr0AhylfYPE9CZMzfHM75pYRNRSW4WmY7oSb%2FDozj%2F1TCjriMT%2FA4y39i6d1aBA5Nl3NgpWsa3fNHuj%2BUHx2DgfqGbiObkeCp%2BYD9%2B3iw2rRUAIGYntIXmFa4Q2YM5Esv7UEHcrvaktFWfGDnd%2B8cvuun%2BVgX4PKbJFoZEftS0vXw3IW4Ta2v9JaM7%2BpiZAyTHORwrrZeJr%2BwWv86yUe4eXBF5cPprNrMtau65u7qhiy0nUUIsfESrYVg6hTuNJ5v3abvWEdd%2BAJi%2BlNZ9H6DOKG%2FBj85Znjm9DjbRy6TkceC2Axu9MMlEBkWstaC%2BesmwZx%2B2OWseiVmfO7vGlD%2F1PtMJ%2BOic8GOqUBubol6EPJ4cBTyQKD68TbBGRknYUo%2B4D01JibvO6%2Btm9IXtOCUsnf6HY8dwnuaoWj9wU6IKYkSE3dihEA0xfXeLgEY%2FATuCSo1Z8PiUGpCu48VgGZ8jjVSbIB6jgLz%2BRZFg5IMGYo5yv0HSOe7aL6i6xBu7L6Q%2FtAqVGRZrnzUznvUKraFnQphe8%2B7y%2Bq%2F8UtNAMjGJ7B013XGB1SiJLqCZjIAXm8&X-Amz-Signature=be1452897f79fc627e1ea4815aed98f01dbf430bb517bd953dbfb68dd045e7b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

