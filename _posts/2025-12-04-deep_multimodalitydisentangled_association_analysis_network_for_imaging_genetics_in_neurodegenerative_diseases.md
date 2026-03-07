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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW3HYARU%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIDljF%2FKrPT9O9W1YBrZInvrpa%2Fc9CG39J3QlsqhEvVeuAiEA9WCAuc4ExrneefTV68%2FBu4Vw7kvc%2Bhi2XtWJiIDRCa8q%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDPZYxzVlaQeoLY5SFircA7IW50H85ODaHI9QkQBaT6Yb5QpMDWYY9k1K2lkMCatPNDThKWo0FiLtQREaiL7BNOjx4F2LQ7I1TxbHAfdMit%2FCl5m2Gj3kEgjpW3AZlrNB8b5Ni3lBILYOvqBXSlVk%2FcAQNkaq16O6AXQEoRiMBbvIEP1nWJwig0aGz2LYvwmT5MnpXQ9kLrBOlrAAa6QajE%2B4HM29aJS1ubvdRzYyPLVw35a2uJ4sv0OLqjS6KQIs1j1YLN0QULQVNFJVOyXA6lvDr%2BDKE1MxP5Z1BW2bZJf4iS3hu35HrQRDWfzKtIYVWA65pggFs88kf2nynedxxxYA4eZ1n6nCDShE1O9pm6yv2ixn5G3L5PNTqBtQwuKxvlhrBzZc6L%2FgGIA%2F279RYQKWMP6F5f%2Bu5mQFxv9bHeQa7GGztxDL0yIK0%2FV5aYnuMZWiOXJCkZAYcZJPa5aCN4cD%2FluDVAcspr8isjeEf6c7lebol0jGTVBEKpEmCaf2DwJ3kiauPrvcBvp0b%2F7RQ2NbnRwhunyJgtJLEtJXF2SSz2vUTbwPEBedq3aVQ7zHHRVwNtfsy3HUj1dj78ASObAgsFR7QyqQVy0IbuTmgJWBEF8p0xBtS0%2BGD0%2F%2FhvK8wcXkOi3ZhVZH7tLzMMXcss0GOqUBBxwwSydhOGvTFYO%2B4%2FZRKumIRIAboZ%2FNeX0oN457cAxvv2T53Re0GeoVsNxuTMbV7%2BV2G7gbiV8b1O8BYWHjTKr4y3vzj5X6tS91eYiTdNQIMAu%2Fx6PK5T6vQDSr%2F8fxjiSnUgyJsCK7ukS3UHXRS6n4Gd5bhDzv4hNo%2F8Gbieb0HQ43ec%2FeEDGFTW4buAzNywgFUwcMtaUXA%2FRoW5ub9DWsc9VI&X-Amz-Signature=ac7a1bcc1796ae8f0f26bf0fb699256264d0bfb05def8b6cb8ebe5959073037d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW3HYARU%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIDljF%2FKrPT9O9W1YBrZInvrpa%2Fc9CG39J3QlsqhEvVeuAiEA9WCAuc4ExrneefTV68%2FBu4Vw7kvc%2Bhi2XtWJiIDRCa8q%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDPZYxzVlaQeoLY5SFircA7IW50H85ODaHI9QkQBaT6Yb5QpMDWYY9k1K2lkMCatPNDThKWo0FiLtQREaiL7BNOjx4F2LQ7I1TxbHAfdMit%2FCl5m2Gj3kEgjpW3AZlrNB8b5Ni3lBILYOvqBXSlVk%2FcAQNkaq16O6AXQEoRiMBbvIEP1nWJwig0aGz2LYvwmT5MnpXQ9kLrBOlrAAa6QajE%2B4HM29aJS1ubvdRzYyPLVw35a2uJ4sv0OLqjS6KQIs1j1YLN0QULQVNFJVOyXA6lvDr%2BDKE1MxP5Z1BW2bZJf4iS3hu35HrQRDWfzKtIYVWA65pggFs88kf2nynedxxxYA4eZ1n6nCDShE1O9pm6yv2ixn5G3L5PNTqBtQwuKxvlhrBzZc6L%2FgGIA%2F279RYQKWMP6F5f%2Bu5mQFxv9bHeQa7GGztxDL0yIK0%2FV5aYnuMZWiOXJCkZAYcZJPa5aCN4cD%2FluDVAcspr8isjeEf6c7lebol0jGTVBEKpEmCaf2DwJ3kiauPrvcBvp0b%2F7RQ2NbnRwhunyJgtJLEtJXF2SSz2vUTbwPEBedq3aVQ7zHHRVwNtfsy3HUj1dj78ASObAgsFR7QyqQVy0IbuTmgJWBEF8p0xBtS0%2BGD0%2F%2FhvK8wcXkOi3ZhVZH7tLzMMXcss0GOqUBBxwwSydhOGvTFYO%2B4%2FZRKumIRIAboZ%2FNeX0oN457cAxvv2T53Re0GeoVsNxuTMbV7%2BV2G7gbiV8b1O8BYWHjTKr4y3vzj5X6tS91eYiTdNQIMAu%2Fx6PK5T6vQDSr%2F8fxjiSnUgyJsCK7ukS3UHXRS6n4Gd5bhDzv4hNo%2F8Gbieb0HQ43ec%2FeEDGFTW4buAzNywgFUwcMtaUXA%2FRoW5ub9DWsc9VI&X-Amz-Signature=ac7a1bcc1796ae8f0f26bf0fb699256264d0bfb05def8b6cb8ebe5959073037d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7N5FAWN%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQDlWtCzbNXtLBe7iz1f1zPaA6cyDwSbZ3fZdWBdFZCH6wIgbCBgrrC59ILOE%2B4LGF4zbsKyS4TbmKy2N2VmCjHtcWgq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDC86FoqWZcg5vHX6xircA9loEqGgvsIAeMw3VmY6HBI4nvt5hDraXxgmucOE7YEQcrjnAr%2FGrMO3hC02lu5MYCAtVZSs3cXlra9%2FnrJVAlsqWmtSLp0AlFEys2ST3agMMhhQH9dJ8WmpOp1OUsHoU7GsY8ySVI7deDDqZ%2FHOeKTOvYfoUsQHB%2BaSZqL5oxVLEC%2BqnNMqecLrl6SqWAsvRuUw75OGHxcEk0WhUYDZmxVjnonh%2FN9ymTjV%2BxtG7z8hAgtnLnvWCPbVMCoxld1t8sl3529%2Fr%2F2qZeqRdVf7LFkj4D4oDZGyyG16xI3i3qJot0QWQo%2FALcFsHSqpIcMwXILEX7UDdIiw9gWmYBID5AWzYeKv3xwM3iJ98FCpJOg5yKD4YXcwMT2VwxpQSh%2FQO%2FWUsq%2BnP1iEw6xc%2FXsciLK5LcECkEqj2DWOncuGNt7FcrsnjG3UTojoTuocU5Zkt58AdiJ5B8Kvqno5EjjNWtEsuhsThb%2FLDI%2FMYk7kZySX2gfoBlqbZ%2BJHAxTIkFwvbN6S9Xaj1vA31KzBxX1O3Q3ZYnbMy8NKmk%2BpGttQ9W3UgsgGsfXrYLh9mRKti23mSIsX29ixqpddIumAPRYJM76FJdQVnUIclKJpkeaRfzP8nQiEMh6L33ksl13%2FMOnbss0GOqUBtrwhuqUc6Aa5srgeDP%2BI0xarjsPHU8iknaUt1XeUoKTSOtiWPzWya1GoFkfCK7ZLOqah%2F10EOoOD7L0MO8CkaETeGFdor3%2F0DpP0tV0WPaV0fRzF5dDfswpoyNXr%2FeFZIG67OZXgw6G70vs9vl2UxM3i86JAgVqNB10cEMrjIe2qOxeIrxlMLC0vcsoHno9M4ZbZzFn0NCKfLUB%2FDkYcBPksk3ZZ&X-Amz-Signature=d3a49c72700d83f07aabbc94d6416ce644a59fe578f29067435cd57c2d7ddd8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMNVX2CK%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQCoy1Tjqs1N6l7mDFzdYloV7X3YgCxCpF5BF1sRlDEAMgIgZ5fn4chEfSh1E1UdJUGS21pv3sf%2FdviLKs10FkULk%2FMq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDBq3rzOW6e%2FgGtWtuSrcA%2BrAN7JBvLx4p6vTsACDc1qwUzCvRBZJB%2BRH%2FPZRmfXcqd2d7QSMFd%2F1DmG87E2J7QPHSgtlQDErR8i6sQZOysLHQcwJKF%2Ble5a0HoZSS1ydZNeetRfxCabkK1I9Hus%2Bi3ZrhoLX9fuB4YZ%2BpCguJMYPPw9FoHfPSdkLbwm4mWbF%2BleBOKZ3SqI1rABwXbv4IbH984fNt9UGIUz1mzvQj1%2BFEoQBlwl%2F%2BC4oWj325I6o8UTGcL%2BNIUHSEY6ZyodczN5fzP3Xk0pn3Lw%2FQQvZRE9A9xxmzsG3iX9Z6WBOuea2aWqWUmoEmLH2ct%2BKJ5%2FX2c3k8ixyeFQYO%2FmB8SjJ1LaEi1SAtMxjppSvRY7%2FKkT3GVn4jaaoeQJlZKlnE4utm3KfhwV8kjC39JlYOLl3BzNMFpG7xjyueoL1KCbg7whU4wOj61YgAGlb7ZYxMlJs8sVcInjNzdbBDyGyNL5YbtJmncig1i%2BLcplkOOJErzkRy1DYgx6mMpHaTXir%2BnQefxViw08ia8b2a%2Bds4CA0ewffrX2ScVpvalakVvXVOTfdS%2FBGnL8V2%2FcwqJ%2BatDnpkT%2FvtCk6tpwrR%2BxX5cKzNC5UwdfyMpwCnIysak3kHjZEFPa0vxbJ%2BvovuGDSMO%2Fcss0GOqUBI9bORBmuD5MK6pJGPtS1STJaOpmu7lOJj%2BJeOqTMH9j1lSYwCBsQQdWePMHcrbIzcr4wQAHJO1l0o4%2Bd7hUt9kUvj2ypednlQdDBwHH%2FX0Kc4I5%2FxYs8nl1vKAeAHu7M2hlADd4q%2Bz7qbyrC3grdtVQyhsmn8V9NiSZ6REfyQ5FQYB%2FofzutOn1g8Rd9TcBCd1uP5sER3seRmXkZ6x34ar0lOjNw&X-Amz-Signature=0f25f423842447e9ae544348d1b8c566a4042c8a8c8b5e9c20c61f6521605a36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMNVX2CK%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQCoy1Tjqs1N6l7mDFzdYloV7X3YgCxCpF5BF1sRlDEAMgIgZ5fn4chEfSh1E1UdJUGS21pv3sf%2FdviLKs10FkULk%2FMq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDBq3rzOW6e%2FgGtWtuSrcA%2BrAN7JBvLx4p6vTsACDc1qwUzCvRBZJB%2BRH%2FPZRmfXcqd2d7QSMFd%2F1DmG87E2J7QPHSgtlQDErR8i6sQZOysLHQcwJKF%2Ble5a0HoZSS1ydZNeetRfxCabkK1I9Hus%2Bi3ZrhoLX9fuB4YZ%2BpCguJMYPPw9FoHfPSdkLbwm4mWbF%2BleBOKZ3SqI1rABwXbv4IbH984fNt9UGIUz1mzvQj1%2BFEoQBlwl%2F%2BC4oWj325I6o8UTGcL%2BNIUHSEY6ZyodczN5fzP3Xk0pn3Lw%2FQQvZRE9A9xxmzsG3iX9Z6WBOuea2aWqWUmoEmLH2ct%2BKJ5%2FX2c3k8ixyeFQYO%2FmB8SjJ1LaEi1SAtMxjppSvRY7%2FKkT3GVn4jaaoeQJlZKlnE4utm3KfhwV8kjC39JlYOLl3BzNMFpG7xjyueoL1KCbg7whU4wOj61YgAGlb7ZYxMlJs8sVcInjNzdbBDyGyNL5YbtJmncig1i%2BLcplkOOJErzkRy1DYgx6mMpHaTXir%2BnQefxViw08ia8b2a%2Bds4CA0ewffrX2ScVpvalakVvXVOTfdS%2FBGnL8V2%2FcwqJ%2BatDnpkT%2FvtCk6tpwrR%2BxX5cKzNC5UwdfyMpwCnIysak3kHjZEFPa0vxbJ%2BvovuGDSMO%2Fcss0GOqUBI9bORBmuD5MK6pJGPtS1STJaOpmu7lOJj%2BJeOqTMH9j1lSYwCBsQQdWePMHcrbIzcr4wQAHJO1l0o4%2Bd7hUt9kUvj2ypednlQdDBwHH%2FX0Kc4I5%2FxYs8nl1vKAeAHu7M2hlADd4q%2Bz7qbyrC3grdtVQyhsmn8V9NiSZ6REfyQ5FQYB%2FofzutOn1g8Rd9TcBCd1uP5sER3seRmXkZ6x34ar0lOjNw&X-Amz-Signature=244c5cf005d9b7b3ab74f74745e9416dbe460ecb6bde7fbb93dbf866ed8c66f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NX3EWL3%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQCb%2Fq1%2BqSCH548r30YXD%2FgZwpZ020qkHcRlj6Ex2HhFawIhAKD9iGC1axAiBrP%2FkcSoLMVlL5i0DQENpStdyP8AauJ2Kv8DCAgQABoMNjM3NDIzMTgzODA1Igwnyl6Z3BSamZ5tPIwq3ANvPxVx4IM6FoVwMRfzew7R7OGg1RJNjMikO3qK0tbIW3xcSg5Z4H3B4%2BWTFdpOLp5XIXc6Cl9touN1T9oMa3%2FeiRlSfwuPMNqhCq8x6hRys%2BqssBtXqXicgavuXbZzDkOxSgGc4BgQrjXuRSEsfL8MzGQGmPnRua1TmaBQ5tFaZ%2FCvnEY6zL8rPnc3d0Zl2DlpQYI65Bpt17diBtKqXskDz6xyi5N62GZsja9cJ6rCAkhlt5vssF%2B4ehq7CIcrb4ebjded0Rlou44LRTCbr0p8uU5LhgL2OUyd6Nvg7kXnnOrwHW65388W1GnPK%2Br289lYjtfrP77Sip5RxpFFwx%2FsXLyV09ZjCrNhE8K3G7QKvK8tcqZZ4ZY%2FWk1ZleXwcT4Qqn9vdtbtIsFudvwP3UBUGHx5t8RZ2xRgyDi1OhYoJvB8sS90V93Jic8FlaiPg6SGj5D9creO3rKEtRRTp8giyehcq6ALPuM4jOXH%2FdqXN%2B28NvnFkCuAdDSfiUoi41mY%2FlQiprwMCF96aMcpqqKczJX1%2Bq%2FpZS87i69J8FpD1ZjPNH1ZylAcWo223Yc%2FqxgS%2Bjd3y%2FOpDWsGLNYiIF%2F5QFcMeA0%2FhjPSVGAHwtWl3yVy%2BLIQL0SsxnmEbTDA27LNBjqkATvYiTx8EpcQKFyMP9B1F8AWL%2FWqXXZAozBA%2FPc5%2FT3DEyRpsM0iZQS2A%2BK8nM4mTJSjdgSILl%2BgyYTCbycLQQM0JFbxCUih3cDeU9wYq9LgyOv8ztYVpEXPjyRiq9p5cWuC8OuCHKyTlS8TDe8ioUupqxWbSVjadeiQCv4OFirTRSI7iQwIBBL5HA8I6NLP1DpHzoBR3e0DIFugAfIkHtoXjbDh&X-Amz-Signature=1457291ef5b5abc8d2572a680d31ac97acce33c3feec18949203297d96a11d67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U67IJWDP%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIF8bhrTszU%2BkTkZcLTjGvDItYOmMR3qVyUbMwU1NQ4xWAiEAh%2FQnfpzmhNmZF2%2BszM%2FSoVDky%2FwiiUVaqubcNmbL1Bwq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDHDlQIEMtyfNyaSjiyrcA%2BvHoZr7VQ8l7B%2Bwl1JTbz3Gq0kr2VEWEzWP8EIOdjIKTva%2FHFsBO0h1GRSUGTeTc4wyQMTPwuJjXdie6SqBWOT%2BI%2FXIEhuSZtniaJE9AFemSIHF7z%2BscHnPgKH6cHWjMwVOs4yaHO3DpKvmgBvILY8Lqp5O9fHSIW8Kj%2BpFxboHdzngGeBZOEoMRWhMJ9t9wEDq%2FsnToPc%2FNh3bJOIik%2BmeRm%2FyA3Cot4nnEWScKQzeTX6EFN8pguOdwyaDuK1g0vhFKk0lHfVcfG6kC%2BCOVVJnUOG%2Buz%2FNGDVdcgWTsBsQQRvvA8%2FWGQK8dc0XYph4zro2LEwkODduePEhfn8LXgyhwpYtuLXgtjeI4IizYPN6sBhk5D36W0EP7T140bHckJBLmxaJXgtPitdnWkzZqriRm5IrlUA0OeETnqi%2FLUMSc4rfPTJt3A7dUTe8jAIoVbkyc7g40NuF2Nd1VngOOu8OPca5qdN1JmGS62QJMkiY2HDPoGqA62eayOxpk6wweXu00ZX7OYV8%2BgiAzbMfAb16tuzwH0LfjYN0skv4K%2Bg7rfsQGlMt7BD8xO49dCeMNSwmIb2CXtyFCDLfvSGhuRqgO8hAxYuvuH%2BkZcH3t4QJLTzg5mHZcFxM7%2BGwMMXcss0GOqUB8z38WzWf%2FLQeYq1J9h60Dm88IbCn2v3AU4Q7GGwmRONrxYYcV%2BQGT1p%2BZv1WBDQ2XG3eYooB7yOeS87IbSa2dOkatsh%2B66P1M53p4Ds976jOGuCMf7LYUTqZ5l1dqkIzHxjN%2Bk1TRpp6CWQzifUPfwJwTgB3MEYLHKBUFsqAyLNdu04XGxx%2F2%2FGpdrNWNSHxXx2CTRrGUbmQyQQrxCHJ8wq%2FwpZF&X-Amz-Signature=8e94709a8f63939b90aa5866d40e8f365cba7b9a6ebdbf39ad760e24ea31e4f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIXMT5NM%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCICn2m8gcd42KFL7h5xybP09ZM%2BGjQuck0IIsoAddTNH7AiEAmEw3CILHviwjVCAg%2BFOej7nktEzGluQf99rcAUJ3aLMq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDE6L44jDZ42FnfTcQSrcA%2B%2Fi2Hk%2Fj%2F0G4lqKkyJwRHPg7NtJMaA6vmMvxcbidxDnYotd9FhTE%2BCz6H5od3E8OdvftSNU3vTBIqH7RaNiFgihc93Cab1a7mJDR%2FNgfx%2FyIM%2BxC5%2FKM6EInHncmRu6PxY9CFxo9nO%2FPXVe864gzoaFbdrCieYWv3gM6p2Ho5V9CyGVIOIZvnSc21otcz5uS%2BXEzmGllEXTM5hvtcsozPveR8SoYGATWoXdugxqlp9fdZppjJOP9lbSYRgHx0xl3NG%2FqAV0LElKOEZuYBkwLqbh3Y6O1OUfuCw62A%2FUkCjnIwSm%2F8wsoGnzEeSv8FaXd8B27RjPDNy2g6FADh7xbDMyvf%2B88aBXjEVdg8F8g%2BKgIhwaw6wwfmL%2FFfO5PN0UZGd5lAEtVwXWsQDKYId%2F0PVuT0p03UNMCcSmwXUpV17EJ8phyispSKC8591%2FhaW%2FwXlBDHClfUC8Q%2F66lFmbrz25C3MjS5xgCVUuPWs9Vr%2BChxctykB8Ushsim2Zp0Vn8H84mlIWDjJYKlL7CmHyiVUUAOOWOIj9Kj2tybaDkFrvvAj%2BtkfTKN40etAvqqcRcIjSrPfo24c89tJJ3N1rWzQFkrnngG338DUnJhu1ZzKg%2B0GENKWymly0fZ2EMO7css0GOqUBm9GZeZPevTVYiWutzooZhNZ7t5NvOqroXe1bHCufsxRgNqj5RRa0oqMS77f34Yt4vnWZBJNswiUrQ8CtH%2Fcpgqs1cpNUv8hJS%2BZpfGx5mcuRwCZKHJvduEIFDwl62yrCkGhUZr8X1eP9Xz8XaOdruQB%2BrdtL6v6wwZIbNuYHdWfKkHbv8lKmy6I8KcKHAirzeXEfXanFD%2FKfQAp93ceff0dlTxJ5&X-Amz-Signature=f35b7581c864e7efd3b633334bdef2229ca39ed5ace5872667274c0ca846848a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MLB5Z4M%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQDnhtLEDrW6RNuMPXMZWEip0EmQ0TuQVDk9JbN66Bx%2F2wIgSj5PzupIkXy%2FkGM8BGXMF%2BccV%2B2OsnCOz9A0MzvI6jwq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDJ3VQbeEBp6UUk8ZtCrcA6G7OWpqArK4kxqoAfz%2FH0gmV3vjfuY0qpMfAYjRj%2FrqOsDn%2BM3D3ltqTQah0qttK7tQb4jn5W8n6WyqVyZxbQYCLEiEkSeTG9e%2FC6PTY97NSzlHhds3r3AzNAPoWCJh4bJsHGupXq843gunvUPEJm863SpY80%2BABxEi3h3kGVc0SA37zwoVI1F8alSK9hnyBv0LjNgPxIGjpJ8pce0iSUQBNUwqZHx4DZ7dmbgbz9jTCuioeUFHvf5j1rdH6gdjQfQIOfVCO7%2B%2FTxKOwjpDg3%2BGoXnsA5IdVfH6cxzHK3ymLGIDfSU8t98ZQOIOq9Eq9SN0ovuBnphAunXqUcKE4O1yJzqwbUNi8wNZNBhTzak2r43QU1r%2BAwJeYh9o%2BGiWtpS1dLvyWwDupeLhesgUuYirtFi2FNsYhRtd114hygdNOHPARg4pOBRYy7Ook%2FDmQNIMBXsBgY7u5caFE4KXBI1KTZ2II%2Ba%2BaP%2BhhmmzYOdTw1X9W59JQoCh6ich4VraMD%2BEM5f%2Fx5VlEr2msMqZRBqB9zaKPjT%2FBchJHx4%2FhsJErbOJoleluG73M7OpXe09UT0oaybuyZeDezh23coDa6fZ2uqTwfvcjb7lUf4fZaRq7XBEgjUXtnefA4C7MMrbss0GOqUBAF6x1fiq2l6QBWsnj1LF1MaPK%2Bt49ow2dbqcLs5QXrsoeNyDebzZ%2Bf8hGpUfTgphYG6B1old5g7oBYpbzkvmcqN1ySCbSGABqs8o6uef69H2AwwR6%2FIeZwBv%2Be7cFdQwcYlgy%2By%2FUDDdx%2BlXsSOd9VjK%2F0pMgc%2BL%2FVFDCnAZYrTJxUpzbg0gJkHumNknA9bKLLIOB2%2BVZj4qTSV6A5vEnbKxLmmF&X-Amz-Signature=52e2b1f5038c8f0fcac3543ffe9a17b5597dab5a71fa8276826fb3b6b63ae205&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MLB5Z4M%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQDnhtLEDrW6RNuMPXMZWEip0EmQ0TuQVDk9JbN66Bx%2F2wIgSj5PzupIkXy%2FkGM8BGXMF%2BccV%2B2OsnCOz9A0MzvI6jwq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDJ3VQbeEBp6UUk8ZtCrcA6G7OWpqArK4kxqoAfz%2FH0gmV3vjfuY0qpMfAYjRj%2FrqOsDn%2BM3D3ltqTQah0qttK7tQb4jn5W8n6WyqVyZxbQYCLEiEkSeTG9e%2FC6PTY97NSzlHhds3r3AzNAPoWCJh4bJsHGupXq843gunvUPEJm863SpY80%2BABxEi3h3kGVc0SA37zwoVI1F8alSK9hnyBv0LjNgPxIGjpJ8pce0iSUQBNUwqZHx4DZ7dmbgbz9jTCuioeUFHvf5j1rdH6gdjQfQIOfVCO7%2B%2FTxKOwjpDg3%2BGoXnsA5IdVfH6cxzHK3ymLGIDfSU8t98ZQOIOq9Eq9SN0ovuBnphAunXqUcKE4O1yJzqwbUNi8wNZNBhTzak2r43QU1r%2BAwJeYh9o%2BGiWtpS1dLvyWwDupeLhesgUuYirtFi2FNsYhRtd114hygdNOHPARg4pOBRYy7Ook%2FDmQNIMBXsBgY7u5caFE4KXBI1KTZ2II%2Ba%2BaP%2BhhmmzYOdTw1X9W59JQoCh6ich4VraMD%2BEM5f%2Fx5VlEr2msMqZRBqB9zaKPjT%2FBchJHx4%2FhsJErbOJoleluG73M7OpXe09UT0oaybuyZeDezh23coDa6fZ2uqTwfvcjb7lUf4fZaRq7XBEgjUXtnefA4C7MMrbss0GOqUBAF6x1fiq2l6QBWsnj1LF1MaPK%2Bt49ow2dbqcLs5QXrsoeNyDebzZ%2Bf8hGpUfTgphYG6B1old5g7oBYpbzkvmcqN1ySCbSGABqs8o6uef69H2AwwR6%2FIeZwBv%2Be7cFdQwcYlgy%2By%2FUDDdx%2BlXsSOd9VjK%2F0pMgc%2BL%2FVFDCnAZYrTJxUpzbg0gJkHumNknA9bKLLIOB2%2BVZj4qTSV6A5vEnbKxLmmF&X-Amz-Signature=904636ff3c1968a25c19084bb548eec5c35c6aeb696c91aad55c83989f363d05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SS7AU75X%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQCJ6Sc7oPAUQnaAMx%2Ff9NfwCBzdT4g8LLSlKUNvSrmrwQIgIMd5E15X4asRGCZW%2FPC1fuon4b%2FJpIq4EELcixnstcIq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDFFhhK24603viqeq0CrcA6%2F7nQbuedd8lllX8GJwnrLhRRrKOGI%2FI6518f35UwX20O1xZi4VteXzj3ief5%2Bix6AYB2%2BIHkaN0c%2FUUB7UIhem5sYVpDsKuyAMmsdCLd67qmGzFWSyng0xydey%2FjCTjXwDCRAPBZTmRyPXmyhI0pKUNk5io2uyEWicUDhtSdH9zaL%2BtllOdomqQe9WOcxdlYLgy%2BTqbXKvGVuZfNUdvxHKjy9a9qQoWtpQ7SdTHcxBO1obdaJfoG%2B4k%2FXB8g%2B76NgPOOv1jk8opiJlzZGr7TDznLlFshCP%2Bw8WQPrQa7zcUQZMWOUll%2BPya5cWk99PAgkJJugzvHnMCJTYXJcHZUSBU0X9eS3jQflQt%2B08YaDVb9C1QaxnGkNjfgY2if%2BgJ1OdgsiDBpiUJtZvRBL68Y8qGcepsoezkq0BxfXgOUWuPSb2WF6Wqq1NHwVVJUk3gq1uA0HRWBmxw7edNpEcXghVQduEmWevpt7gcC7Cj7VUGr5YzWxlwLhbLjC79%2FmcwBPPlISjQJq4IJQlN23mWHaRE6HgwwpN2bKdzMSCgd79YZw3giXj%2FTdbd6fs2K4GTakRcbTilLx3zhfeS3f2mcnLe9bA6Ol8SP0i2lSQxEOoiXsUcLB3dr%2Bf4QudMKHcss0GOqUBe2PjcoEVAez3DzjRhnyHLZJoBtz%2FKunXtYGj3gxBorSPQWtsHE4lEjGraFq%2BPQVczCvD9SLmFpQz6WdzGT6cvQzkC0yObgESwE%2F6tc4xfVkH67lDBrv7r0k%2F%2B0yADgDCZr8bnVZo%2BUA0XvY5wBvpo3WKeSVqOrBhggZnRwpvawmw5fE61axSoRSHhmOqLrg6P5BymyQOKZXME5wAh61sRgkMH9o3&X-Amz-Signature=bfd5d7c823f0a3cad3d170d0cb75ed784f3b732cffdbb3599a30bca3a2f7358f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635JX3AKN%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIDgXkBTgQKrSe9pvzsb1%2FU%2FVHNgbGXrHWc6t%2BYrkFSbRAiEAlRfFXETPFTxA%2FaVRFKuxSv1XvbRm%2BXHPzKivxUa9ecoq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDHreOOoa%2BfgFe67HDSrcA6IacBLZKxps1KoarYh2feC4PO4aDMSVAObvkkTX8A6WjBSJ9AnQOM1s7uYASBx3LT6DoJTd7FcRtrW16bpfrARoysG10hBT6lefgZuP2Zzdv1K5q0Zr7S64VauXySXdd%2F0VVL7z2Wae%2BC%2BIvaRWEdmRnly333Gy8wLOv%2FP1kKqOYy63dAXV5L8gqlAFLwOCmwBnG7gCkxgGeqVVmkKlfdYR%2B7XgxjAKEspBbfEGzUosrl4Mg9iTaWz34LbggP1yoe3s%2BxvAIFk%2Fc3cco%2FcTHwg3Mf%2BFg3a5X8X8svo36m4tXu23gPH30IIvzT%2FoJPaqwYgVkQutz1XVMOLapHPWm0QAmxVJGqKZ888Ad9C3sOy7Z9bEgheCiRVvjWuWsEIErGDLjNtGt2Y2SGkuAC0if1VS6vl670m7CD86STncl3Ie1JUaxC5WWIjE%2BPir1LFCG5QaGNFVLBGyvwKEbioZb13TAtLzsShboHgrNEKgKOxHcPmuRoigryOZZiOyFFO0LRcr7evb4CrechN4e6rqORgGUFjBfSk4T%2BwZFPB4sQXdgwI%2FtZyZLeGlbUtoCjsQbTCXARRqUe8pkFBe8SLCEFo0IDUp4k9R3AZc8rEtIzUQOpCErEEIG2xJ8o09MNHcss0GOqUB5tkEbJTUoK1q78VWb5vrJj3pCL88Wdew3OliHEZLDsCaqBU7RcWJw9dfsdhRJAYf2L8yWg77NOc91Hrq67KM5oWFWXYwyqgnDe1Wby2tYfNPjnzX23eHTm6J9b9m4%2FmP6AUHOHGo1OvTip5AsxfrmFRETBdY3H96nDY%2B%2FC%2BB1qcVUGzwtF8JaMPlhQgbs27Q9ml%2BRSDTuDBXB5FvumsLLYh487MM&X-Amz-Signature=298d1567df65a239ccc49d6e047447390955052e81978ee5c99d876fb44c1e5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635JX3AKN%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIDgXkBTgQKrSe9pvzsb1%2FU%2FVHNgbGXrHWc6t%2BYrkFSbRAiEAlRfFXETPFTxA%2FaVRFKuxSv1XvbRm%2BXHPzKivxUa9ecoq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDHreOOoa%2BfgFe67HDSrcA6IacBLZKxps1KoarYh2feC4PO4aDMSVAObvkkTX8A6WjBSJ9AnQOM1s7uYASBx3LT6DoJTd7FcRtrW16bpfrARoysG10hBT6lefgZuP2Zzdv1K5q0Zr7S64VauXySXdd%2F0VVL7z2Wae%2BC%2BIvaRWEdmRnly333Gy8wLOv%2FP1kKqOYy63dAXV5L8gqlAFLwOCmwBnG7gCkxgGeqVVmkKlfdYR%2B7XgxjAKEspBbfEGzUosrl4Mg9iTaWz34LbggP1yoe3s%2BxvAIFk%2Fc3cco%2FcTHwg3Mf%2BFg3a5X8X8svo36m4tXu23gPH30IIvzT%2FoJPaqwYgVkQutz1XVMOLapHPWm0QAmxVJGqKZ888Ad9C3sOy7Z9bEgheCiRVvjWuWsEIErGDLjNtGt2Y2SGkuAC0if1VS6vl670m7CD86STncl3Ie1JUaxC5WWIjE%2BPir1LFCG5QaGNFVLBGyvwKEbioZb13TAtLzsShboHgrNEKgKOxHcPmuRoigryOZZiOyFFO0LRcr7evb4CrechN4e6rqORgGUFjBfSk4T%2BwZFPB4sQXdgwI%2FtZyZLeGlbUtoCjsQbTCXARRqUe8pkFBe8SLCEFo0IDUp4k9R3AZc8rEtIzUQOpCErEEIG2xJ8o09MNHcss0GOqUB5tkEbJTUoK1q78VWb5vrJj3pCL88Wdew3OliHEZLDsCaqBU7RcWJw9dfsdhRJAYf2L8yWg77NOc91Hrq67KM5oWFWXYwyqgnDe1Wby2tYfNPjnzX23eHTm6J9b9m4%2FmP6AUHOHGo1OvTip5AsxfrmFRETBdY3H96nDY%2B%2FC%2BB1qcVUGzwtF8JaMPlhQgbs27Q9ml%2BRSDTuDBXB5FvumsLLYh487MM&X-Amz-Signature=298d1567df65a239ccc49d6e047447390955052e81978ee5c99d876fb44c1e5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSRZZXLP%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T231051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIDzg0sZiE%2BUxJpL0iQucXaoGxYLk8st%2BUCMW8iEwWDuEAiEA6z3UCJs6JT%2FBHIxdWiClzTxa3%2B9pngSROK8XaHtd4ncq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDAlFPn2iBf3jsJspjSrcAwbWhzgHGZTfhhCuF5Gc0HcN32vP8RzRKLy258vR63V2s9eThkHtp5ceAl7yyth1iPGFg5xrSMtc944271Rqty03I%2BQmrq%2BUUgKOUsAHFPJZqwCsMRN%2BAp%2FxfeJRqzj8lHmsVi9Lb4EAF7f8KPEmxNIz1n%2FsrDnXGWiXazUKMWDhQyeEiZHVFklip9tKpLWlpWdcX0UROtSqfgJi1yMwMFhafEAokwhrpErcGPotPE04spLqwndILzhxDpaEH8PvyEb5grNiBBkBcjoqCqNNNSm7B98%2BpZrKEVdQzDmko24Eni35VMHg2V4k4Ch5YaDfluZ7rA9ln53kk0yKdr5zKbNKasX1DJy%2B8FNVoRacxybML5JA8tbmmbEPgTGfzxd6P2CXNMoN7cAvFtApuJ0ZuFBgsKD2akKJX8xdh4dxYK6NmTz1u6N%2B0V%2FkFQ5JkMoJ5FyXafuVZBRiU8PMDVihvCIhaWigm7TCev3le7ZbTXGy6KHR0OJDI1ORGQOEyEHmapDXbjrQWHFx8T%2BE11YGWJbFDolkZkOYziYlT9c%2BPezEDNu78hYxnPJz8GmQZRyxNsmDZF8kvzrmYCgWGhOR4wGtI%2FtaScLpI2j2qTuUBDmMCLoOkfBUg1Z1kBJVMMXbss0GOqUB7xLZp4u1hqgr6Kwxio1TaGLLY3eOfRrl8TET7wYLQoarv8whqfYWAiu4L0uBFNANsdobvZ2j1APXzkVEWesoa58vUa3sjlEWoyERiw6825x6960hzADUVSQG5zS%2FFpLE75QYVVwDVjB9xmkdkl1zhXskPQUMF4xHuU8QKrVAQNlodjNr8LsR%2BHIfgsSkfkMy3cOTwQhG1Tf3M7CysuPx88rRjTDB&X-Amz-Signature=f6f67c01e3ea3e606199b29018fc86ccd2447bc3d90b0354a565cce36410cef2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

