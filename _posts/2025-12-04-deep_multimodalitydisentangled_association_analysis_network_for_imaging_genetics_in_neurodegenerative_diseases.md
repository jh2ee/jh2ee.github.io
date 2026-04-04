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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFQLNZU4%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICOTVPFhoNjuGSntcxV1naCWx3c9poJPeWkyDtHMRzKeAiBGuxm3HmzUgnopXq9nHMQu5K1cx%2BWPWSiIEMq88%2Bj%2BnyqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvAKi1n8Nu%2Bibod%2FaKtwDYqOyCrMrbhbPgvqEMtrf6ZvBAELkQ5D21xg9D0vUrY1H2HWlebbKUBIe3rK6Unwv3niJtUKD5%2FQL%2FLe2plTq6Gm55oRsbsguBr0T5KwoNg4Nd%2Fi0Vn8tzWwfNffrTbPe0PpvWkUnu%2B6%2Bc5HZ3zipofGbQZEym%2FAoaWNK608Nx%2BFculpZISaUJGuzBXQFo%2BILUeYdjd5KkYSEwy6LjzrwiaBkZt8xTwh8XwchLuivueggCj5t%2Bflju8S9S8YOEAHPGnGa2SU1hMiP3OPJ3RikzGvr7%2Fz41AqxY7j4dSHOQgp5FV95JhrCmKdBI2n26lR43%2Fayru7PbpO7y9iR5DxIUFpdBeO2FBKSle5AVrLdHa8lJkDsZOZiW6Fu9pXhoH%2FbMqm7n5X0F9mgGFQXZ5IxbP4Tk4zV2Af14XF9GMBXJ3mrWDwXIwDJpaADQlJtuujme6Ua0j%2FnzVQcLKC4mNfn%2Fp%2BWbFeLNjd6fcjlTGQ%2FXCzprdInqJ6R2G0rl1jL4BE%2FXuxafbysfzEUFEkbFxXnGLDuEgG%2F8OsdY6brjoMzhylenY4MFVKmZ6QCdHPMDc7XitHmXOwCj1er6O9s8bxoWpx9MeL6UiI1MRc3BxH%2BdWRwlTDzuJG8mNSKOpIwnPXBzgY6pgFZkPrTy7gBrw1Se79p0jghHb76j27rpvnae2K6mnYyEJSFx2ehtm1gS3D1R5C6mnYsw2Fe5EEmUL20BhGno3nabqf%2FBa54CvPjwvgTKUNJY4U1qS5iunYENida5DKJNvsXUxdwb7K6xixF20uz2GXUjh2ihJ273jfKpSp6IA4bDBuglhf5jotVHr7PbhEi48WOIzv8TzrKjh9LZmbIoCwts5uV7d%2Be&X-Amz-Signature=f325e115a7af34d6ad646fa03a239f9a481f8ec8fe8f6ea6a7b21d59602db784&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFQLNZU4%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICOTVPFhoNjuGSntcxV1naCWx3c9poJPeWkyDtHMRzKeAiBGuxm3HmzUgnopXq9nHMQu5K1cx%2BWPWSiIEMq88%2Bj%2BnyqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvAKi1n8Nu%2Bibod%2FaKtwDYqOyCrMrbhbPgvqEMtrf6ZvBAELkQ5D21xg9D0vUrY1H2HWlebbKUBIe3rK6Unwv3niJtUKD5%2FQL%2FLe2plTq6Gm55oRsbsguBr0T5KwoNg4Nd%2Fi0Vn8tzWwfNffrTbPe0PpvWkUnu%2B6%2Bc5HZ3zipofGbQZEym%2FAoaWNK608Nx%2BFculpZISaUJGuzBXQFo%2BILUeYdjd5KkYSEwy6LjzrwiaBkZt8xTwh8XwchLuivueggCj5t%2Bflju8S9S8YOEAHPGnGa2SU1hMiP3OPJ3RikzGvr7%2Fz41AqxY7j4dSHOQgp5FV95JhrCmKdBI2n26lR43%2Fayru7PbpO7y9iR5DxIUFpdBeO2FBKSle5AVrLdHa8lJkDsZOZiW6Fu9pXhoH%2FbMqm7n5X0F9mgGFQXZ5IxbP4Tk4zV2Af14XF9GMBXJ3mrWDwXIwDJpaADQlJtuujme6Ua0j%2FnzVQcLKC4mNfn%2Fp%2BWbFeLNjd6fcjlTGQ%2FXCzprdInqJ6R2G0rl1jL4BE%2FXuxafbysfzEUFEkbFxXnGLDuEgG%2F8OsdY6brjoMzhylenY4MFVKmZ6QCdHPMDc7XitHmXOwCj1er6O9s8bxoWpx9MeL6UiI1MRc3BxH%2BdWRwlTDzuJG8mNSKOpIwnPXBzgY6pgFZkPrTy7gBrw1Se79p0jghHb76j27rpvnae2K6mnYyEJSFx2ehtm1gS3D1R5C6mnYsw2Fe5EEmUL20BhGno3nabqf%2FBa54CvPjwvgTKUNJY4U1qS5iunYENida5DKJNvsXUxdwb7K6xixF20uz2GXUjh2ihJ273jfKpSp6IA4bDBuglhf5jotVHr7PbhEi48WOIzv8TzrKjh9LZmbIoCwts5uV7d%2Be&X-Amz-Signature=f325e115a7af34d6ad646fa03a239f9a481f8ec8fe8f6ea6a7b21d59602db784&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RAVVAAQ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD0xKCnynuuswWjJAcucZf5sZI3xn4M9nsRoVz7%2F%2BvUiQIgQSeA7Hr3Sz4ncAvL%2F4Iclh6QUbZ6%2FsEd5a9NxUZ87HsqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAHEDW%2F520T%2Bjpnr6SrcA6LKjVyf7MidIiHc6Fk3dB5PAvcDnt1pjgioKz3Qld1NPpo6OhmRx4SMs3CxXWYIRc5uAUIjlFV4XfX6zpb2byNC2HIWwKeA9f9r7Ns%2FhK7WzWRoDNJKnZmLYL5KT0SRcrSzneXuXNtU9v4CEN9QJrNJJHrm%2Bkf3kcdjMILxeVPzP8%2BK1NyyKZiqFFTzcJUJVjb9o9jgyHC1SnnHkOniUkzSPtwDkoT%2FMPBsjteGowbd%2FXKj%2FNs0dSpVqC%2B2EnCPHq9tP0b%2BFm44%2F76Zn4gVdc0sg1GtS3jTq6Cud1tdMx4KZ%2FD1D5jiex%2FMol66bw60QrFxMBkD%2BkRSFS%2Ftc3VdfxMJXTs1cRTyPNhDK1HugKTJsjsnpJyIVKnz87%2F4wZQ1rRUybvJwqRxCifdor6QLe3ccPk7FClMa3YQTVXB5D098BsWJuWjk73VG2%2FUN0SgS1Xcd9CBir3opEexFqZnRINWo6pYSuWLuaukGTLn%2FaWQfPOdOH02%2BIczslWKXQQTGrQMLZEZVf%2FQIPRhWe%2Fs%2Bl2SuZQ65YMQ05YJlKPkVMB21ZAsE6fa0qiWsRzO%2B3ezuT3Qay%2BlmDyETiV182n7G%2F7IOSFet01%2Bmbh3AYx%2BJTR%2BFwREWh2ngC%2FND%2B5eaMNv3wc4GOqUBDQ2jCzlFVf%2BzEc4jxZllLZl9G4tkQKLMexlWEuBk7f79bTEmZDwJxUng5LIw260C7u%2FlxflTfOxXnZHOJ5K%2F%2FwXJ5MV2%2BdEj9u193rsVJdWcQUpKTSqxthu3SB%2F2pBnpAmoSPQhr9en%2BDtVNMspyK%2BDC2ibfLJ7cQzFQVd5fKF8CbbNB2MfHVkKuBXlRn6cMxcIkJNlCimsdcXgiBlOh%2FW6LE9zg&X-Amz-Signature=e62e04b95376add3a6cbccb7fe1f52296a85e6b0e350e21f93b4b914cb9e24a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQCPPFRO%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDIO16GirkUiZj7jXyB%2BxC82Ij%2BZCUQAKragVGZTesmWwIgU8ajL5%2B9MHy92q2r97Tzgf58dUC40D2vvhYvuAKMRQAqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI%2Bw2zJwjQC1R0hpWCrcA%2FphrByWiB5bpGkNT88ezVvP6rOasEcctjKTO8Yw1z%2F36V5FzODEP%2BXUby8RSyvE94cp8EeZAefhiBamDGCztg7KCUdBLJPPTJ76tlFwdBnfyQKjGGkq6edutrPHhyAKbcSJHR3rBoMnXi%2FzK9BlBILwhzdY60n9i2Cng%2BW7b9Rs1ivWYlGeKI3J5%2BOAkxEE2neRgaIWOd%2FjpXCGTZIVSZR%2BFyYJcnyBbU%2Fh%2FRGiinJ3dMbAUvt3nag6kGdJo32Oy%2FhII5U2KOcWvbb6Z8urvzmQm5TKPyj6KKIrDjMmQtP6%2F53jg%2BdMUm22Kuv%2B9vApuTP%2Fe6fKQLOU4YgK7CopZfvSJzilO5UrywOpX2A1PSxT1H0Vuqd%2FGQB8GpGsm8hwMJi6PMZ%2FWxzysVh0Sln2sgD27pSmwZShJ0a7m%2FvCV3309S1knMx7eRnYFAj2hNBI86j2kjOV2ltwanm1AIkm6QclL95gbWWt%2Bfv751jIk3lNNFbtmEyzE4MgFzv5XSYcJLHM%2BgB8vzh2WGfRtn0wtsobjUINqNcEMrRFHg9DLSDvsQqO8NyHhbiSXJ2Oe1R2FmVxRquli0rZm9GIoU1b%2F8exXAnOB097ErIyKMcTqqhZNy7YzEtzmRAmy1fuMMr1wc4GOqUB0ISun%2FnZ8aTr3j2EWNJXhaykobZN9t6O8lQr%2FUNNznAbp%2BGlA2dPqxkZYsTBG1cqw65Z9sYQXPrjGgDOt3BLW0YtXpD4gWSU6xzqeqMoMjOpj%2BHj%2BI36kXotn4LK8wDDzGns70cZp6Ypbu8qOnVEs8QC2k3luoZ6FQwmjb%2BPaTgWXz2A1A%2BeOmELoErnZio4w4USyo5w5dpmd1O1icXA6bi0CCwZ&X-Amz-Signature=2d4be4fd70c3cb31892b0afafcf3d3b137e8e832e5b78eb2cc56a27207d1d92c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQCPPFRO%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDIO16GirkUiZj7jXyB%2BxC82Ij%2BZCUQAKragVGZTesmWwIgU8ajL5%2B9MHy92q2r97Tzgf58dUC40D2vvhYvuAKMRQAqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI%2Bw2zJwjQC1R0hpWCrcA%2FphrByWiB5bpGkNT88ezVvP6rOasEcctjKTO8Yw1z%2F36V5FzODEP%2BXUby8RSyvE94cp8EeZAefhiBamDGCztg7KCUdBLJPPTJ76tlFwdBnfyQKjGGkq6edutrPHhyAKbcSJHR3rBoMnXi%2FzK9BlBILwhzdY60n9i2Cng%2BW7b9Rs1ivWYlGeKI3J5%2BOAkxEE2neRgaIWOd%2FjpXCGTZIVSZR%2BFyYJcnyBbU%2Fh%2FRGiinJ3dMbAUvt3nag6kGdJo32Oy%2FhII5U2KOcWvbb6Z8urvzmQm5TKPyj6KKIrDjMmQtP6%2F53jg%2BdMUm22Kuv%2B9vApuTP%2Fe6fKQLOU4YgK7CopZfvSJzilO5UrywOpX2A1PSxT1H0Vuqd%2FGQB8GpGsm8hwMJi6PMZ%2FWxzysVh0Sln2sgD27pSmwZShJ0a7m%2FvCV3309S1knMx7eRnYFAj2hNBI86j2kjOV2ltwanm1AIkm6QclL95gbWWt%2Bfv751jIk3lNNFbtmEyzE4MgFzv5XSYcJLHM%2BgB8vzh2WGfRtn0wtsobjUINqNcEMrRFHg9DLSDvsQqO8NyHhbiSXJ2Oe1R2FmVxRquli0rZm9GIoU1b%2F8exXAnOB097ErIyKMcTqqhZNy7YzEtzmRAmy1fuMMr1wc4GOqUB0ISun%2FnZ8aTr3j2EWNJXhaykobZN9t6O8lQr%2FUNNznAbp%2BGlA2dPqxkZYsTBG1cqw65Z9sYQXPrjGgDOt3BLW0YtXpD4gWSU6xzqeqMoMjOpj%2BHj%2BI36kXotn4LK8wDDzGns70cZp6Ypbu8qOnVEs8QC2k3luoZ6FQwmjb%2BPaTgWXz2A1A%2BeOmELoErnZio4w4USyo5w5dpmd1O1icXA6bi0CCwZ&X-Amz-Signature=c82adb486ab26f23d819f9b7db45adb85cf2d6e39dbc646cbdd79e350682a9c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCIHCGEY%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE%2BZYMbzfWkA5IshW4V13TGRQUzzrEegZWZVEy73aa%2BJAiADkzQmy%2BDbd0oZPgWPc8PjzhBxQT960G9GK1wOPuaCoiqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVbcmVUfaPduyArKWKtwDC6dE2tYBfVt7sYMN5F1jh5EOWHwWQ%2FWWz0%2BfGqpKMTUndy9ZhTkWOp8mX2sPAN2y8RZV4bUM7%2Bw%2BQDV1jJwrnmPn4TNh8gU4clB9m6xmi4KLdic2YDFJ8TP8jO169n5hewmMsyPPQDH5YwdbzVvCA7VVuar%2BaBTPzirchIyuItwlhOgNvLXT6xmEVTnVJsU1PVb8Uot2z%2FK1KsVI%2Fc0bBhSmoLXKHzMCS0saz%2BKUy7Hvv0dV%2FQZajNffJrOBR%2FxsyejeAnkq2OZbEkBZlYEMEVFviwCc1HOXW9CTqhGFAuvtf%2FUIeMUrLAdiDa%2Fuw40QGqb2U7nRmZACgBNpeFZDWXc0XffMpi6ZACHH1M6kNYPckBHX8UvD0NwTey7sh0rxszkVjuUEqZY7ffFvyVigDmvYlEVhcw6Z0uaZ4OPEGSZX6QytLqu5GoOLoNb2BnWhbfOT9xLNYHBsNri6JcQeQKtx%2F%2FPBveGSv3aA1S7HVuEVdxGm50iyRpn1wBso6v9OTPTFVPKFzsdJ7sFvGj6qWjmuUWtt1UiLnMKVLGhttb6Rqq9a0H0NxfAU5lZ4sPGN6PgcoG%2BBfDYp7d%2BhVLklBXsgDTUzaVWfAbQzZWxU7bSqufAgx3dP3NDDsUow64nCzgY6pgHCKssD0fSopVD4Y15w672jm1qhrtlmsPXUY0SVsIWrV0XTXYebED%2Fjc5xCG6i1yZQl57v2%2FmCxAXDaQeMj4SfPoFbJGmlo3KMVWn3PkFE23E3Q8nv5gtA5gDlFYmz0l%2BpMLIAszFxqu25R4sVnpvWHkHjFLbppATUrj141Z0HCYMjrm4i%2FzgFG4zAZ8r%2B%2BN62XCYbfv%2B3AESGPdkCsBzkeCsbvcsAn&X-Amz-Signature=3b76fd426098f39e09a5c4495784695b61f14da012d2cf1d952183f9361770b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGFLK5PX%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDgj%2FthONilaXOrXgm5E8sBzRadNK%2FyGRogOOyWzu%2F65wIgOVgV5TNUKbVhtnDOXLhlw8eT3w5UnE4mV%2BjqkOvJEfMqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPJ6rTBBmUXkjvJXeCrcAyHXA%2Bx5zCkHP7kNIbMPxzW8FHHf67GpX5%2F2IAl5ZTlk1Dxnw3Esvx%2BKZeW5XHubmmcGoyA8ALRcT5lXiAczfwViuP55m4ic3wp5IL4h0xhBieJT%2FIs9lXWWitdpK7kVVPpghcdZKqNHGgKwXOUAiSUreQHBuxYm8RemuoR1lM%2Bm2p4q5FUJhxefcAnAfg5v3O%2BAUCuTYDGphIo8o0V69EDZXhnH3GF36XR9tOzm6l3oUp09kYjyKZjH1vUUDpalcJO%2B%2FTSKX8OIgkng1CpGLU1ViDVL02uzT1a1p9Ah9J4xV0LZgu%2B2iRmPxhu5CGFos2fBBWe%2FIcCuY%2FFE3kTIjNm4ogUAlUa7pW7kgPWqSAoxKFpVFY0aMXue5Vg1wnZFl0Rg1hJoG2AdZlvJCPLanMfTasoxIGxf%2BG9UHZFMnYSSv8IjXm5vNLA3n76XNUmCOFvfsEetWuoGU%2FWXOEUk79jtsV7L49%2BGF4Llb6YPT1Ndggz00pTa%2FSmkegT3zErG7uhYcn5KxjKXq%2FQaX4u6T02DpJm7FgTZ5Lr3jMTgIJkRyAj%2BXyg6Ef4K0qENyBlNO8YGV2Kve1%2BtAMEKkA1kOVQugfzK%2Bt7AkOnlMqw5R1NoAMRVzzmmIcDUntrnMKf1wc4GOqUB8EsE3Xno3ruhb1o82onw079ExHsMTqC9LoQUHODMljQg%2FBfyOIt0Fs6w8KbuPteCR57%2BlvjNIDZ9b%2BD7Y5BlYQSe9RA5J2TP%2BfNLxQbtUJGQs4sFqSMfHEUKDTV7o5ckwWuyXBlo2khPjiZoLzUdNcbqWbiMfIIAbFpRM11ZAjmyTXyhmhFixATKuAOr%2Bdw3CDIq9cpynVV5ZD%2B6OxKYqLhODBEx&X-Amz-Signature=313c469b9fb33e9f38edb29e5bb453b089cbaa1b13f3a8c02d94ee0b93542779&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCPQKXGH%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD1qxECyAeUsEQ9vA%2B%2FaVz7rWHBrWu7syqbnKC7P2KApQIhAMGAljwB2cA46lYaurHjA7ZU%2BhLgywIEPh%2BYvDY67zUoKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzz%2F44XZu8f5Ar4xTUq3AMvKWcp6oBIDUFQ8QwCS2mCnqWMnG2JPxFHtP1KpZCFpSIgwX7OlNlYXguwem3zWq9V678XWd0ZzKVP7wepsMKBgV7ZtQh2gIHaOOyOyHMxkw2R2F4SISLk%2BZWYqazjqbRl%2FZm7d30uNgrGEgfy4dXPnvlrDOYXDthOH4Ti7TpO%2BHyvD7UVO50oB4CAuRAti3nFZSQoOi8xw6JApgqzJ6KWUr5ID3f9fzmywP%2BmblDAVYH7Lahq2Wgqjftzt5W166YhHueWLASQs5mhS%2FXQGZvipI4Cp%2BYNvJ3YTXtoWjPQrUisopD6MJZOAvmccjk8Z7MOEp%2FiWIq0Dhrx6zHSfbXlM25DQBde3BwMftMAxxtH4G7uaIuoiZK5uftLReyKK08TmCpwZx77p%2Bu%2BKe%2BolenBX44wcMyw2n5uCmDve%2FVgsqjGGaVSlVxtJXzfum8%2FsXOlyiCY30LEydEFaGFciiNNtZBraxv1IM7mOKh0JDh4EqtxY%2FAjE69xGDeVmpGMTPAM7OKwdcWSms6K4jaePtiwfFKGTuUz8BPsEYEHbXewdDZDEZ7SJsyLW1QjM1jeHJS5taBK3pwo6mCmZtLtiAmLzujnoY2bynZBmoMLc972KOpPPkSieWZ8WAhG1TD398HOBjqkAdBO25JfU1H3jAgWC3Hd%2BekX71pWlOX2JOJJzYoi5tWZJkw7bofHu7Je8bcZlP0H3drOCinjMaaP0IcJxNyTpZxkheCuxn6CYmny7nowgy%2BIOsng5PC8xbjBFXOlDbmvCYm2ayNevPOSV0QB9RCRx%2B1iPV3aDaYiX8EA2lfpwbD3cPse92pal1OYgEALcqz5pYHxQ%2FNHRSBJdxSTjgGnYL8VV6Dx&X-Amz-Signature=9d4ef6b6d8010c3052d91b5749875985b385445aeb6cbe858e671a39b5b2c6fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466554LQUG4%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDVPhA%2BFd7HAlxy%2Buefd1CAkBIvyBEXfbxSE84Th9MNkAiA70dplS1D9migmFRGxt0%2FswVozztaIM%2FERBsIuazJWeSqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0J1BkoYmbYtidZ%2BQKtwDbFCUWW2ZNeUlsumAPDB45a9bQvYH9aQ%2BOlHUjd1RQpj7Su28945xLIjUNDpBWZ2W0Qv4NbrpcA1EO79AuxIljddyVgZ6StJ%2BIip%2F9DuS0ocl4yqFALHPtQyruJPI3Z%2FRe6hc8Au1Q1%2F8FLJ3A%2B3v1142dCrSo75ht47XOsfxVeVv2cfsUxRMKlIloZSMCO2UIIUIuXKZ3Xomh8nvmEs4vN2SMKU2K6iFssev1VEcLKFpD323lPxfLmSSeyptvCiB702ZuE6Z72Gc6Ht80vXXVm%2Fl3TP9Ye6qvFVOo4t%2Fzl6xdPi9rxcigXnivyqraKflkF0RU1vxmonND7Ap%2B1vZgh%2BKDmbFThiS6F6ThYuQyWD2Hl37Ggxa%2FB3%2FncKZysO32JV53rpMjwIbK4%2FqoF2T4Vky4uUuGbI6i8c18xH6xwF3t13loaNBSQiy0wU9OmkcBdkopDAFtrwmoHw%2BN2h9MnxBe5C5lze0UZa3DLcLqflJ3cqkrX7ADBllLfOe9quVvwIkQY%2Fh5NYdgxQGVB9tm%2B0Whs0lvM3wHFlHYrRCnK%2F7CGAHJMV2LvJl3X8u0jijODIHDiOfDkGT3AoP41XEuouxJ8kI25Wlos53kG76ZBqHr%2FzfvAtj6XTqre0wtfXBzgY6pgH%2Fi18u4S37BJ1V9KHmJzB7NDu44M3%2BGzbwwhGlVqpPFURlKRtY%2BLLzGwFGotugHUQtthh02LmBOROC7epu%2BLWO6kIKq1DiM4A%2By69A3wzFz3WCjq7N0OeMs%2FkTJ2Yl%2F8JF6yfLVor8I%2FK3MVGQMk6ynUYdqwASdEBKYruuAPt4mIsfdjMgZWwlrX8YwrXErsgszZO3bm0lw8vVxIFx6hGbJ3ZyB3iW&X-Amz-Signature=2bc2d2c7591a4e57674539c50643aeb0f39fdf865d994cd1c302b88dbc2c597c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466554LQUG4%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDVPhA%2BFd7HAlxy%2Buefd1CAkBIvyBEXfbxSE84Th9MNkAiA70dplS1D9migmFRGxt0%2FswVozztaIM%2FERBsIuazJWeSqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0J1BkoYmbYtidZ%2BQKtwDbFCUWW2ZNeUlsumAPDB45a9bQvYH9aQ%2BOlHUjd1RQpj7Su28945xLIjUNDpBWZ2W0Qv4NbrpcA1EO79AuxIljddyVgZ6StJ%2BIip%2F9DuS0ocl4yqFALHPtQyruJPI3Z%2FRe6hc8Au1Q1%2F8FLJ3A%2B3v1142dCrSo75ht47XOsfxVeVv2cfsUxRMKlIloZSMCO2UIIUIuXKZ3Xomh8nvmEs4vN2SMKU2K6iFssev1VEcLKFpD323lPxfLmSSeyptvCiB702ZuE6Z72Gc6Ht80vXXVm%2Fl3TP9Ye6qvFVOo4t%2Fzl6xdPi9rxcigXnivyqraKflkF0RU1vxmonND7Ap%2B1vZgh%2BKDmbFThiS6F6ThYuQyWD2Hl37Ggxa%2FB3%2FncKZysO32JV53rpMjwIbK4%2FqoF2T4Vky4uUuGbI6i8c18xH6xwF3t13loaNBSQiy0wU9OmkcBdkopDAFtrwmoHw%2BN2h9MnxBe5C5lze0UZa3DLcLqflJ3cqkrX7ADBllLfOe9quVvwIkQY%2Fh5NYdgxQGVB9tm%2B0Whs0lvM3wHFlHYrRCnK%2F7CGAHJMV2LvJl3X8u0jijODIHDiOfDkGT3AoP41XEuouxJ8kI25Wlos53kG76ZBqHr%2FzfvAtj6XTqre0wtfXBzgY6pgH%2Fi18u4S37BJ1V9KHmJzB7NDu44M3%2BGzbwwhGlVqpPFURlKRtY%2BLLzGwFGotugHUQtthh02LmBOROC7epu%2BLWO6kIKq1DiM4A%2By69A3wzFz3WCjq7N0OeMs%2FkTJ2Yl%2F8JF6yfLVor8I%2FK3MVGQMk6ynUYdqwASdEBKYruuAPt4mIsfdjMgZWwlrX8YwrXErsgszZO3bm0lw8vVxIFx6hGbJ3ZyB3iW&X-Amz-Signature=3d5635e57871f03bf54a91b0b9da0fc8f8c6d3f267d425672010d795ab8508e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YECBQ234%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHzb1elxECy6O3MZ5%2FhViHp%2FxsfujerfKNpvhQj8dy0vAiAGKCvVz3q42ZyC7eyJNIMvcrGyoZqYxrNqwC4U5Jv7GSqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbUsmWuI43fZNCwPrKtwDWxHCyVesl5%2BGdpF9RRSEroOF4IWFy3QBXc%2FVsNbQFEkfWVqeIirviEw2%2BY0uOnEXBUbb5GHu3PuZ7sf32DaoMlgoTrT4JWAh75eXj2icwqcW9ZI5ZMTqC8sp9HB6%2Fjzhv8nXQDryLShx%2Fl3b7tiwb9cQ59oGD3hzUyeGeDsyrDZKkbipO3zzNlV%2BClJk%2FeO9uXRLnICk0DrssWgd1SoX8iIN0gsK8ZINxSri77KZzBJtWLVEZ3x5kQ4zg%2FSviwDGLKdTmGGkmIcGkV0rx4Jmnc6IvHvM%2Bq9jDC9R4b%2F2AKkn%2BlCeJ5xUvZUIESQDWI%2Bh31HGr1r9d3YZWpfikfCcEOELrRNzcWy1I2uzaIFOAWoE53LzeqlHUBMSICpTuYuUgcgp4UuCCCOfgNSrvAL7HIexznUVtZ50nNHvqBSuO5M4%2F6yG%2Be4mHn6FfYepsi1deQ3WeXEsHIJN0QAwutGOCeu8OBqBFb%2F9CygRvYO2fq5W4BBoFmdJcLGwuG9JB0LidBR3i6yd5mNyltQULQciu%2Blt6Ai%2Fv53YttEVO8oGAEZkN0b%2F0mYf%2BQOQWm5huKpv8%2FsRIqp808VmduI%2F94JhF0aUgucNi3qHJqhCZXQtH74b6tuBymOCHGprdnsw6%2FfBzgY6pgGtSewAruMHG%2FpZNHDM1weo8ZRxLziLFxuan5F3kwFYgfO3NXwNXPGDVoqteTQQjblJUdz68nRijAP794ydeWnL%2BXbOPEnj2ATtMlVK4LGpeZkSXZ3VKKw67HHE5hn3VikJC3VnFk3N0PkwAdh40PFvv7aiFCF3n35v2xX2N9O9I8Xtt3FmWpdpcqbnF8oBbTT2z%2FTA1WsFwb5gfbHrwjIWrAjPIiSG&X-Amz-Signature=796f8839862aef5b6eebf703502483eb982b63bcfe39fb1e1bef621534466d26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNDEA7YC%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA71QcQ%2F%2FY4J1klEiwjeXiU3m5TkWNfZjqRHOjUyN1C8AiBgwKPEJrNJBaiuK0r7q2YDCOXVn7h5CL%2Bo9XCiUasKrCqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJxqLZCryv%2FXp%2FzFeKtwDrdYPe2uyYcun1RwX4Igj6pvXD4xobVtD%2F1618rMhBXf18yDBK6nhpE9NrFEukRO1ZQ1bInRB8Utkx20%2FEYnJvvrkw2L8z7wyridv14GhlNJfSjH6s4Zf3bI5wFl4ARThIb1jDwSK19Fg95mOx29izBDWREvIMOVWRm4r5ylE1bRG11keeaJS3DvHmZJ8dSnwe7bZjhA2nKdnyyV3Kdr%2FVCbKcgmsPSRtXNeuJSDourNfu7Tre%2B8olxUuFPiWn0UT4gadswGlp8sU%2Fv%2Bk8K%2Fkm5cfc92a%2BF31bZDSJawUtJ4etaXjMrbRS15Zv6gfLWcAbk1JFb8wQuZcOYa34VFrMhB5eViz8pZ7dtEWTU6VEvaCnbCXlVHMo5f%2B6ohbrND7IjOpRWv%2BObYKZ5UzrQZrlNm5Fa1ixe8Elw7DoRHmqOJWmCjPg2TrYck5bYFJ4L5pxgBsGpfIncgFc8rc744cWP%2Fn8sjQHEEEQAqrn7rWXHEHyqs40ARHT7uRnMUua7vcIEIhUOO4tlTBEMTRc%2BwHzx16JNxehCPbQan2fAh9qbkLZK0r%2BQTewlEtsL4hcP3PqdblQGm1lo%2FWhu3E7KymEQWGu%2FDBMziDiH7%2FH%2B4oXxK5vn2tqgYON4H4tAswqvXBzgY6pgHuuIjEi8x9DAg4lJRohwXrV36FWrtXANCh1ibKWZ5Jfbed5IK3%2FJMuxqcxaVVIe6lH1edRZDWtJd7XReoOjE7LhTs0mOPTTqK%2F6mFdqBbtVql%2FcgEU0pRs9r%2F9O5xzS0hcqMqLQk26RT3XD0acqJbndux7uIHHWjgVOmQA9dsUxMZchb%2BEpGb1iCTNH0rodreZZ1CFNds8Sd969%2BzVzK4GOhbDQ%2BEL&X-Amz-Signature=ce0c68fde336954dffc014c386223f4651c07f3155f6a2772d560ce63efc0c06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNDEA7YC%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA71QcQ%2F%2FY4J1klEiwjeXiU3m5TkWNfZjqRHOjUyN1C8AiBgwKPEJrNJBaiuK0r7q2YDCOXVn7h5CL%2Bo9XCiUasKrCqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJxqLZCryv%2FXp%2FzFeKtwDrdYPe2uyYcun1RwX4Igj6pvXD4xobVtD%2F1618rMhBXf18yDBK6nhpE9NrFEukRO1ZQ1bInRB8Utkx20%2FEYnJvvrkw2L8z7wyridv14GhlNJfSjH6s4Zf3bI5wFl4ARThIb1jDwSK19Fg95mOx29izBDWREvIMOVWRm4r5ylE1bRG11keeaJS3DvHmZJ8dSnwe7bZjhA2nKdnyyV3Kdr%2FVCbKcgmsPSRtXNeuJSDourNfu7Tre%2B8olxUuFPiWn0UT4gadswGlp8sU%2Fv%2Bk8K%2Fkm5cfc92a%2BF31bZDSJawUtJ4etaXjMrbRS15Zv6gfLWcAbk1JFb8wQuZcOYa34VFrMhB5eViz8pZ7dtEWTU6VEvaCnbCXlVHMo5f%2B6ohbrND7IjOpRWv%2BObYKZ5UzrQZrlNm5Fa1ixe8Elw7DoRHmqOJWmCjPg2TrYck5bYFJ4L5pxgBsGpfIncgFc8rc744cWP%2Fn8sjQHEEEQAqrn7rWXHEHyqs40ARHT7uRnMUua7vcIEIhUOO4tlTBEMTRc%2BwHzx16JNxehCPbQan2fAh9qbkLZK0r%2BQTewlEtsL4hcP3PqdblQGm1lo%2FWhu3E7KymEQWGu%2FDBMziDiH7%2FH%2B4oXxK5vn2tqgYON4H4tAswqvXBzgY6pgHuuIjEi8x9DAg4lJRohwXrV36FWrtXANCh1ibKWZ5Jfbed5IK3%2FJMuxqcxaVVIe6lH1edRZDWtJd7XReoOjE7LhTs0mOPTTqK%2F6mFdqBbtVql%2FcgEU0pRs9r%2F9O5xzS0hcqMqLQk26RT3XD0acqJbndux7uIHHWjgVOmQA9dsUxMZchb%2BEpGb1iCTNH0rodreZZ1CFNds8Sd969%2BzVzK4GOhbDQ%2BEL&X-Amz-Signature=ce0c68fde336954dffc014c386223f4651c07f3155f6a2772d560ce63efc0c06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EAOLT3O%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T033146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGDsbxTRrYR0ntzA3hvC5x%2FuFiOTP9wXBFPVfiTA48ShAiBHnKDYOHW6JvxWU%2FZQ52FlbxbU3LEUS8Gc8zhr9AAs7yqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTxc%2B095LY35KJeAtKtwDOTUsN7QnLdy3gs1fhwQeNLWbObZbMwQp7ohTjuVw6np1RfNSYaPHsvdBoep3c%2BNkrnAKMpCQOR6Julik%2FwshYZEnOtqE92MlAFXD0DWl%2B635icVvuCeGExfsGlNTFqsax29ajkApUAqy9WgZyIVFP%2BDClz4vFm6Lgz62uJaWddGKohvUj8fVDspFcxss0K43hZD7Cvvt3W8hUZLOJ1jBYErAcyoebOkBIG7l9MYe5PNjTZXw4D3bzClzy4y8CMYtyd7D0G2HTBZ0askKL%2F%2Ft7KDkBdpOvfj3iPw6%2FInS9%2BMgTwtDBdlEgUclYubQCQX5BpIEL1VhNVPeKc3fEyku39FhAwIJ6i5x6B8zhK0ohTTHQ99lV0taFLJUnnSpEBV4xtMvie8OVOFzgTBSFTwI4%2FpOYiBf3hAisOQidVjEug6MI67IUTwBBzKDVrJTuQF17Pg57hO2ddjPH%2B7os9KIt6HFrkZA9m4Xp9hELnJKcUzRjCtft84nMv8%2FXj7dOOuaNN2Av8Qql7YYq0RvK2%2FQVeMgPu9UoRh9vWfPueixR7vN%2FSSkVwHdkXMs3UFq5OcMezFDcmCwX6h%2F5kdBt8WPY%2BaVKDOHbo7bLe0yIdz13GCNLnjVljc8%2B4JuMyEwlffBzgY6pgExNiPZLx0yh%2BD6kpweZxv%2BIvuuPBEMrTadf3P5aur2t%2BKbgmXUM7HoEp6fDEj%2BIgwJkh%2FYqHwXbL4lxMOdUJoD8aylTSIa188%2Fa98izXGRBDWF9Gvg9VvSUVy5IS82Ur88cf2%2FGOJ80xJmNVctZlJpKCB1R4vP%2B88VPTDFYuMSJje87lm7iuV5sN17HxRc2XtLMKtWF1t2Hn9%2BYrcXNydX6nxoeQf6&X-Amz-Signature=180404c068ed6a328cc38499568ae381a569e9045bd3186bae5aed39b42766af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

