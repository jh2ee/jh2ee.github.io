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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TUTHJHL%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHR2JXTGsmlUb%2FT1IHbCN8VkN5iV0GSk0%2FIL%2Bavn9o3mAiBZ4GVuSudEnXY09biF4qRXcPwYxr3AXpy8tCqez3GjmCr%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIM5YXM8u9bHxSrmK9FKtwDzMtZAXcDUjrgjYDg0csLrSsF4G5vrWVSHAwVfW1s4f52f0sYnE%2F0WO45QXcRJCscNoJsDyG3FboUjzA2VRgVh1BDMlPOsbaROef%2BlXPapni9j30axv51k0Opk1EiNXiK%2FWMdf7OWjzr5xrx1rJba7kPK0UqvH9E4IakekKRQT%2B%2FxQmxxspZFrWR2RmctyA4TSys4EiGZcEPa7f2vj2HnE19d73ls182woas1qssgtwSb19C%2FYnv0KMjpiRke0w0KySpgisNOrIylFeB8RiXp1fE6RKwiX2UaogmqqrIQ5rvWL2VXKSNKjwAnENtP2FmCj4nce2S0aRAYcbWESw2SDdoaD23vinyFTNGntOsdSIdHpTl%2BuKSIyq4AkKSYo46BD2%2Bg8IZs5Phk8%2FOmLUP5K9o58TAhoEm3IuSyklI67EfD%2BXHuInWEqCilsz9xBqDtdqzPhHPvK942iaErcnSxK2f8EgXwtz9hnVTE3VeOBrv7qInfnu4%2FP8tnIi7%2BXbyS13sRBg6uHQpOSHKqvKj%2FyO84mhptTFZobjR4j8xt0iBRdkQ9nGMK6ZNb195aPdHM9XVceo%2BMBYpDEC%2FGP5Kqp5sKzF44e0C5mgR64nZ6VoiULtztMmHf3h61dv4wk9nszgY6pgEIEZRA3rPlM7T949SKHx8QT6p%2FQBR8vKDenuVypIuZDTp0exKJjje0t%2FLq5b2TcOsZP%2BkX0yInXFWCzudnbeg0u5vOizXD1pMRDxyFawyruAaUKbN3AUlIkZ4n4%2BtqtfUgIsqru%2FNe92uZDVyutm3zufS2VK2iSdpVvBJmRoXm%2FN%2FZEWZj40v5Vb5%2FIz%2F4TKd1CFNE25375XElaDGSFZ84W9%2B3H3TG&X-Amz-Signature=5a00100c436fc900d20e33df09895c389db10bb4b469619425352eba3854987a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TUTHJHL%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHR2JXTGsmlUb%2FT1IHbCN8VkN5iV0GSk0%2FIL%2Bavn9o3mAiBZ4GVuSudEnXY09biF4qRXcPwYxr3AXpy8tCqez3GjmCr%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIM5YXM8u9bHxSrmK9FKtwDzMtZAXcDUjrgjYDg0csLrSsF4G5vrWVSHAwVfW1s4f52f0sYnE%2F0WO45QXcRJCscNoJsDyG3FboUjzA2VRgVh1BDMlPOsbaROef%2BlXPapni9j30axv51k0Opk1EiNXiK%2FWMdf7OWjzr5xrx1rJba7kPK0UqvH9E4IakekKRQT%2B%2FxQmxxspZFrWR2RmctyA4TSys4EiGZcEPa7f2vj2HnE19d73ls182woas1qssgtwSb19C%2FYnv0KMjpiRke0w0KySpgisNOrIylFeB8RiXp1fE6RKwiX2UaogmqqrIQ5rvWL2VXKSNKjwAnENtP2FmCj4nce2S0aRAYcbWESw2SDdoaD23vinyFTNGntOsdSIdHpTl%2BuKSIyq4AkKSYo46BD2%2Bg8IZs5Phk8%2FOmLUP5K9o58TAhoEm3IuSyklI67EfD%2BXHuInWEqCilsz9xBqDtdqzPhHPvK942iaErcnSxK2f8EgXwtz9hnVTE3VeOBrv7qInfnu4%2FP8tnIi7%2BXbyS13sRBg6uHQpOSHKqvKj%2FyO84mhptTFZobjR4j8xt0iBRdkQ9nGMK6ZNb195aPdHM9XVceo%2BMBYpDEC%2FGP5Kqp5sKzF44e0C5mgR64nZ6VoiULtztMmHf3h61dv4wk9nszgY6pgEIEZRA3rPlM7T949SKHx8QT6p%2FQBR8vKDenuVypIuZDTp0exKJjje0t%2FLq5b2TcOsZP%2BkX0yInXFWCzudnbeg0u5vOizXD1pMRDxyFawyruAaUKbN3AUlIkZ4n4%2BtqtfUgIsqru%2FNe92uZDVyutm3zufS2VK2iSdpVvBJmRoXm%2FN%2FZEWZj40v5Vb5%2FIz%2F4TKd1CFNE25375XElaDGSFZ84W9%2B3H3TG&X-Amz-Signature=5a00100c436fc900d20e33df09895c389db10bb4b469619425352eba3854987a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XABQYGDT%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCjiI2ThobWGHoGq49ZMqawNtcf%2B1bqGblD0RwtlQEIMQIhAIT4kVz%2BzIX%2FVhp7l0jY4osbMJIpgJ2KM468BacJWfUgKv8DCFcQABoMNjM3NDIzMTgzODA1IgwCTmaZtVZspJ2Ayz8q3AND46mbft57zShmGc20YW6oYpKvUNaVm8nCgPBaKfrrHBbqg0i1AGDf14cowhD%2Ff0JUTcfyk9a1fzaXttIjDbbSEDb9uJWk2yoofrwna%2FqncyuB92%2BdjvyDRBi162CWfKDjH9KOP3KPHDjDp9qpfM2svPnbPow88HFjIwrXKbMIIwEaoIu083WQEl5%2BVTQBuqqlhDBos%2B%2BYntjJbCL2myAaKfP%2Bw%2FFK0I5DuEW0qaGEaqtzzMyWttc8tCoVZD6hbSslCbVAl8HdlKoGrt%2FFwgHk1oUpNoCZAhflJxXdy2%2F0CoPlqn%2BQ738%2FxJbw7zR%2Fa6t2OeQk0qI8K8j3iMxBabTBb7SSzz1g0hlsj5ZxJHI8DWhFCwXTMQJUjDmYJtkcZ72oP26kqR6JRmVGZGJ0Vdx3XBO0B7U8KeyBsT36yZxvTZ%2FynzihRqQxxyIW2xB0TQ1P1hBI6ROyvkEqXvq09EBZRpf0Sj8PaGtskpK4bFjJ6O3mZbTnpSKuDB2jDGUTa48VAykvbf3VzVlsIz9vIlF83HYdskDDmbWYBC5UjEGDauKwtfGaTJoMm35d1wM1cAtC4rqn9k%2BC0RMF3zy5eO%2FuIhqLkHEZct%2Bg%2BkE70ewspZqfTlJbBdivDlIK9zCI2%2BzOBjqkASLnB548CaN43vYXCwh0CAUzVTTw3cmGTO1X5QPnylBiOcnllucEs0GsdggFzbKzxvEmtaMuP6zW4W9S%2FvHmd%2FeI3E7lMBfuS8ozqWTRr5bRdGyyYn3eXAzlWNm64xcJBnvMHBh71EMEueaCWGC1hRS4rRGkX3fYkeKxAWlA6vnBNlkyG2U2i8a7ZW2PAr1BeYsCddnFVB50vMHO01uLLH7q%2FX32&X-Amz-Signature=ea37021a38415303f8b30d25d27895f0a41d6a8a5f17dbf6b99268bb1ab031b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNRJH57W%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB7gYNDfCLRWJnrVmhZdyAhu1n%2Fl23A1qUj4N%2FfuJH9UAiEAvj9eI%2BuAZvXgzR6ks6JuT4m4759aVNReJY3oRLEoEIYq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDBtYrOTPH9MyEa9LuSrcA2d6hkPcxVdZLndX0WGEhVkyyLVLIC4jxq3ScZQ65Tv3vK54un%2FkRiTQkYD7%2Bbf9ASb9w78YaBZAc61ZBwNg3unP9FiYNRJk3FVMqUm20noOhBR%2BsHczhmCWxRMaQaKxETeJ2kHLKi3lAisbrXSJNcls1pla2ilU5CI8WsFJaDhDfzeShpGAQ4AGMsMyuPZsaRxdLoO8TCght0eNeRpCBPNjU3YUx2qQM3iPSUw%2Bcrwhh7HvPefFLPtxUY2NzlHO91vizwH8CtiSfui2KzAY4TTq36OZ3jDfW9udANd0cEl7sQGwse%2FddnOeHUoCpRWZLg7%2BonpylgVttVVdGt%2B0oNhxJr4MTb1iyZ5FeA8GPfEJlPNr2XZj%2BN6yQ13Xmc7HkxX4F4rYnrsa8cyE5LvG2zrbVYrmGr3uU%2BiZA6hZ8layxUQHewUJbCPeuI7HREMFm11auP2lJfnX2YiVW4bmQfKftLDLCKa1jbAHfdQgBKkCQqcJfJtXkgTNqwRvORvduopyMYUMivaf6%2BZSivFizBgRzh%2BMOwgio%2B3wj2u66AdXMuUo1QOWixCuXKotay7JDJOaW4W92Ff4fHCd01WGhwgj67ZMHrdxtgAXpeBk2aq8xZ%2BXM2CLuFHoJhC5MO%2FZ7M4GOqUBwOMeOv%2Btx4xLkdwZIuFY2Im0yFxRxWGW05kiCZhyQMdTV%2FYg7ZlGPVzENHVUy%2FfqzXjM5BHPvWSToWQKHF9PnXtpicRQ2EkJ%2FFFihixmWqKNEme7NjbdbocWiAGnNSQ5xb4MZFYMoBdfoO4vrwaSRnHf5%2Fpr0KMqAq4gfaucxv6PnzIbti%2FE6f0lt5xa%2Fuyr3nR4AM7fXwxaA2YgVvwvycb7qw3%2F&X-Amz-Signature=b7037f7fc562f7d42d4f904c16e1e0a1df862edf10ee909bf499205792dc5bc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNRJH57W%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB7gYNDfCLRWJnrVmhZdyAhu1n%2Fl23A1qUj4N%2FfuJH9UAiEAvj9eI%2BuAZvXgzR6ks6JuT4m4759aVNReJY3oRLEoEIYq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDBtYrOTPH9MyEa9LuSrcA2d6hkPcxVdZLndX0WGEhVkyyLVLIC4jxq3ScZQ65Tv3vK54un%2FkRiTQkYD7%2Bbf9ASb9w78YaBZAc61ZBwNg3unP9FiYNRJk3FVMqUm20noOhBR%2BsHczhmCWxRMaQaKxETeJ2kHLKi3lAisbrXSJNcls1pla2ilU5CI8WsFJaDhDfzeShpGAQ4AGMsMyuPZsaRxdLoO8TCght0eNeRpCBPNjU3YUx2qQM3iPSUw%2Bcrwhh7HvPefFLPtxUY2NzlHO91vizwH8CtiSfui2KzAY4TTq36OZ3jDfW9udANd0cEl7sQGwse%2FddnOeHUoCpRWZLg7%2BonpylgVttVVdGt%2B0oNhxJr4MTb1iyZ5FeA8GPfEJlPNr2XZj%2BN6yQ13Xmc7HkxX4F4rYnrsa8cyE5LvG2zrbVYrmGr3uU%2BiZA6hZ8layxUQHewUJbCPeuI7HREMFm11auP2lJfnX2YiVW4bmQfKftLDLCKa1jbAHfdQgBKkCQqcJfJtXkgTNqwRvORvduopyMYUMivaf6%2BZSivFizBgRzh%2BMOwgio%2B3wj2u66AdXMuUo1QOWixCuXKotay7JDJOaW4W92Ff4fHCd01WGhwgj67ZMHrdxtgAXpeBk2aq8xZ%2BXM2CLuFHoJhC5MO%2FZ7M4GOqUBwOMeOv%2Btx4xLkdwZIuFY2Im0yFxRxWGW05kiCZhyQMdTV%2FYg7ZlGPVzENHVUy%2FfqzXjM5BHPvWSToWQKHF9PnXtpicRQ2EkJ%2FFFihixmWqKNEme7NjbdbocWiAGnNSQ5xb4MZFYMoBdfoO4vrwaSRnHf5%2Fpr0KMqAq4gfaucxv6PnzIbti%2FE6f0lt5xa%2Fuyr3nR4AM7fXwxaA2YgVvwvycb7qw3%2F&X-Amz-Signature=855c2ffe96eec01783d23f15bddc5f6d954dedafd6f16fac44f1542a4fa8eab0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637ETT7BN%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEfoc4yujA6TreG0u4QHqo0XHtR9tBsj5atGgIsgh3sGAiBSkSlg1qJazVXuuI5tkelYFdVUn8nJnNM1xrJI3mlxCCr%2FAwhXEAAaDDYzNzQyMzE4MzgwNSIMiLnj4lFfYbJtBtdbKtwDvmasnzU%2F2LkB8Rd0HrHRji5RGOg1B%2Fl2c9nnqxPn5wxBX6VpGbv5NOXl8P1hyBPyd0X0UDYlmNyC3mDscBnav9x0x4%2Bz35KurCfpFiKU%2Fc2d8ViN1js4QUQAyMI2i49oXjc58qyumv0HBlh%2FlXONFBP%2Fhl%2FoKmhDdqp4BMrjCUUqjfn%2Fvi0UaKubTHCCyQXRQPH5z9p7BjDdH%2FX%2Biwa4CRblmdI8QByaSb%2Fkl%2F6y%2FHAFqRLUx1UkvltB2AxK%2FRwjL8IdBzzU6lSk4YEzT38qKFMecuR2EcEDesOct8192rt0K8ChCbM8lHeLeWkBF6OrrRq88FDU7NoSr33pGDqsSYWXDNlzo0Suv7Jxox5pdMiy%2FjAjx9fsiKLUzYnLDU64JKqYWA%2F%2BpD77Ge52jlJjfSFvHsA0hFOmSjxwY%2Fh2Ut1eZjCrqI%2FX%2FH%2BVuoceIcT8yaDCnm78S2874K2gM1BAMvqUE1BFg6TgOZtFTKLsBO3uEY7e6Vx6RsIdhiZNwHOPdUACJ4eIHt71wYPi5vtSTx2qwXeM40jXP1xaxm9z1cGSQ1xMllfMq7QkLsQDxDDHrVpnZBGO2%2FfePaLdHsf0ICerre532vMqwSeA0%2BScLzB1g5EvHORRhVHUNwswtNvszgY6pgEMm6mKKhD7XYO2HL11RsSLA9N4VaMo4sWhrM%2BdElJgGGCGGgHxpWy%2F5CHKMiiYNvjNFKIf0RlyI83vvnqX3x1tfCALFRHj%2FAUfJl%2F9VSiLfnUaf1ayPvtlociQlbhGxvf1WGbPtp3Hd1Q0aUtaqzN01a%2B8fR1KASE%2FWE9ICGXteT9SeC%2BrAj1gszvOQCJ84g%2Bzs%2BbrcpfNRVLbRNKhuNvRgQMg1ZVY&X-Amz-Signature=e5081ab60aac545b8d33e69634ea6d1df627ce35212ef49443b32fe5dfd16163&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OLSYEVB%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDY%2FAbSqvfwwb5f9n2a9N00Nu8bd7HOFeVRD0C6k1LhnQIgcqOXl2Bnw1Qob%2FjsISug4MO9EwmrzALNL43UrNktc%2Fcq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDPZ%2Bsa4475qgRMRKZircA9Nc%2Bds0HGEQ1%2BazctxFibC9S%2B1somvyDAJIpdwlavx8P8%2BuvsoNu3bKTiq2tknbWX4hTINE3FskaoMlvl%2FxTRFwu9paeYhM%2FsREZ0j47gPg1SZZug9BsPf4B6QUSM6QjksnzwRHDVtNFhKchvqWgSpxrfVyJotFFahr36pwTBP5QI%2BK0bWhp4ypGQ3oXVPQqt%2F4%2Fdsr%2BFzRdIyDCg1tCv7oaNJ%2B4%2BhX4Jq%2BOpgppQ6t2UXLdsCV6Rdo9rgHVF3CeCN7D%2FO%2BbLl89RvqVXFMS1FVXsPqcBqqBXdve7cc9v1TPbgUDILdBXE%2FpE1oiiZN97mCt9Idve8Y%2FQaDPjhfM0Y5zbmgDOwmnJBFgB2WYWwzDgxY2Qd%2Bv3FZ4tfp0wITLF4DkazzGK37C0vlbjjT4MwL6YDTilmXyuHA1aekCTAlzF%2BfqTlR%2F98fAwR%2BSGyFDDgtzN6PxP15dwwiIyyUkzQBHYDMdztmHM%2Fm6YcvMpyd6rGPxU2eYdgKGJOaxZfSTSsotk%2F0if0Rh7FWoSCwLkpiwfQwU3JyhkE5uuE6Jz9IglGw6VX57vkNXd6HspRWf%2Bkrs%2FyfUUQNZ316KQ14TrYQ1uKhPyaLjhEAvq4CbrmKBnWwbzNn8HUzMQrsMKza7M4GOqUB5rY9jcDi8yIFZRUdUayIubE7a42k14QbS%2BNiB2oohuVKa4890hG4HDBla6NdpvcCaoQlagZioIwQNmfcfGYwjKitxuJTBmEe8kjViErb7KQA63v6H85HG3uTLUTD9OOlDQbhT8a08FHNpicwZ%2BqtZPMPcHqOEqovQ3y4YGPXEtmoyBEDDKOyySlKh1AIrpnyt4iZzR108ZNhaG57zcjYXx0D9D31&X-Amz-Signature=dc71623778c585f201db1e09a24eff2d3c2f16efe5eae9bba28f82951ac6a915&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667J7MEWBS%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGg2dO5kiJG9DzSpcoxLsUmIdbn7wtnIznlN90i8HcZmAiEA7pOrKCmpD%2BE3bAMRE%2BpzXXkj3FQLrOMpBBp1me7KScMq%2FwMIWRAAGgw2Mzc0MjMxODM4MDUiDF6tHxDEqVDvltEyTyrcA%2BzCCEnOF7XtHfN7f6od4qGwXmzrag7kEw6wY%2FTS5Lp9t%2BJDxBVm0czT4j0MUL2CijtCSj97BI6jJCavlC7IpgvtfmCIgvDU04cgxgpvQe3RbUSKchNzUWOauszBhsT9lqh5ziTf9jLLnSWLAR%2BruIleJ7EPZBGpRnqYmoo%2BU1pBJr5xM9d3nIwPpX4WRqbwYXB9qiwDSdpye419j2tWI6pjocBWTz6rZmfIGNdHir4NRidB%2BfBf2p8FRNUzaGDNgTlL7AaacI7aKAh%2BXQyYOb3BGUtfeJcPvzIw1NyCFFIFlhghOk5Lc11tYiZ4nV9NlPDYUeWnoYzjpPxpS5l84FoAfkz2cwCoPCEkMaKibuk0wEMXSbjU9g%2FX6gT6Gaqq8Y3l%2Fpu8a6gfEfcSFqhoYd4fRQBL9jNthEuSCKJZYlrlH%2BoJHx%2FcHrjTYXAG7yZXgwthvxmESb3R9nndeECAX8eLtzJE8NiJ4Edml99ATebYdwULWZjlhHx8yTJj4m93sKu1xL4ykvC85qlFCPZbGnMQA%2FlsWZHZfoIM9BySQbY7Ht5wlN0dbizBG5nN6ywua44I6OurTKFBrxWbrOzdNEOk6UUm8Z3oWR0yK9e7RubUMwfI%2BE0XjSjeD7DlMLer7c4GOqUBMSnkS%2Feda30aJKx6XG%2B1TQNByug7UrIz1euQdgUBF1hPqxN4K2Zp96EcjEWuhl%2FDZnjbRymDk3Cy%2BCXYKJj295ni5LzBY4BrEKso8NVtuIPWLGYUnKGqVCi9iN%2BPdMUxr2rEW%2Bpfca9yGq0eAPb%2FqZwHZ98QYV5Yt%2Bkk3FODQECNHFq4KWUT4IjaDW8l%2BAbPYTVmkjEmIa41x6rE4OV%2B6Hwxe0UV&X-Amz-Signature=cc1f1dbe51a22c61e540f99e332e702b9f82d9fa3ab19f8ec79b68d6aeae56fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UP2UM6N2%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFtIApgaADO%2B9kr4ZLUyMxmdIYdfGoddAffzwpK99f%2BUAiEA8VBYz1XtxbRSbhughclXl3P%2BKs9GS2iwcorlGbrLToEq%2FwMIWhAAGgw2Mzc0MjMxODM4MDUiDBwvydNi4z2w77ivvyrcA67jOmR7UStqUI%2F29eHM0UtaPCNOTH%2FwphhbWN5kEEcd6SVJawDFEjbI6cYYULVTPrRfnKxZMa5U1RiZfwggG4sGwguu%2FxUPjVYr55dqUNCtCnJZCCZEvyhownWIOJn3U3UJlttkvyOtk2pyWGcJmOJyG%2BwDzbeSVsIF5tuUju2LgiBv6Q60av8iZdnwUADP5xjl6i%2FyI6hNO4zHGByW5ZG5t%2FLyWqvzCJ3p2CIp4hAIOFwuBHAdyQZJIFKzjiH8foAUua0m7yKsRlCgr8I8F78fEb5yDvG0aKCgudeLSYaaRnDu9k5EcciDvfpD1AYB7qQWyBSp1ZtMDG%2B%2Fl3siJ8pp739CHenGmc1adnljSTGFIr5vOYZ%2Fwe1DV0jyMnSu2AqNyISreCrW43KQLZlo%2BBKeQirft3UbtFHi3R4L0DltW%2B%2Fr6H6sG%2FOZ62POH0m18DcXpErXtkbZ8ooN6uFHnubYXjI5tIGDmy2WfmtxDknLw0n%2F1j2E6ESn0LwIC0ufifrmKq9pcvA1WjB40Bf1qZZ83edZVIMmow4hcu7cfLal0CEskfAHaQfIuYIVBixTG6Y24x6YrAT%2FMwtxIsKPNJyuRtVQbC0EPT08Z67uI9AQ8QuJIX2t5ZLYKDU2MLi97c4GOqUBlUYMfkwdbooyNN4Py6TnN1r%2BwFsWfww2imr2DAZ%2B5YRK5UhFeM28XutjR3sQQMgoHckjyCNeX5DtLj7OlLzJvE0GqDYydWUoJUeimJ0H5mRpql5c4z9caPxuHFOtP70TWc8JR12YEnjDDCgLQtPVuTpbLQL1aWRp%2BMFYI9W%2B%2FljDAdR%2FrrvWTCiwpAzbgTxtiMJaAxrw%2FBnxUtoWe8rPB84u2LFY&X-Amz-Signature=eb0321bbc136ea6f0958cff257d4f4d26061bcbdbb86fbe7268d1aae52ab78ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UP2UM6N2%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFtIApgaADO%2B9kr4ZLUyMxmdIYdfGoddAffzwpK99f%2BUAiEA8VBYz1XtxbRSbhughclXl3P%2BKs9GS2iwcorlGbrLToEq%2FwMIWhAAGgw2Mzc0MjMxODM4MDUiDBwvydNi4z2w77ivvyrcA67jOmR7UStqUI%2F29eHM0UtaPCNOTH%2FwphhbWN5kEEcd6SVJawDFEjbI6cYYULVTPrRfnKxZMa5U1RiZfwggG4sGwguu%2FxUPjVYr55dqUNCtCnJZCCZEvyhownWIOJn3U3UJlttkvyOtk2pyWGcJmOJyG%2BwDzbeSVsIF5tuUju2LgiBv6Q60av8iZdnwUADP5xjl6i%2FyI6hNO4zHGByW5ZG5t%2FLyWqvzCJ3p2CIp4hAIOFwuBHAdyQZJIFKzjiH8foAUua0m7yKsRlCgr8I8F78fEb5yDvG0aKCgudeLSYaaRnDu9k5EcciDvfpD1AYB7qQWyBSp1ZtMDG%2B%2Fl3siJ8pp739CHenGmc1adnljSTGFIr5vOYZ%2Fwe1DV0jyMnSu2AqNyISreCrW43KQLZlo%2BBKeQirft3UbtFHi3R4L0DltW%2B%2Fr6H6sG%2FOZ62POH0m18DcXpErXtkbZ8ooN6uFHnubYXjI5tIGDmy2WfmtxDknLw0n%2F1j2E6ESn0LwIC0ufifrmKq9pcvA1WjB40Bf1qZZ83edZVIMmow4hcu7cfLal0CEskfAHaQfIuYIVBixTG6Y24x6YrAT%2FMwtxIsKPNJyuRtVQbC0EPT08Z67uI9AQ8QuJIX2t5ZLYKDU2MLi97c4GOqUBlUYMfkwdbooyNN4Py6TnN1r%2BwFsWfww2imr2DAZ%2B5YRK5UhFeM28XutjR3sQQMgoHckjyCNeX5DtLj7OlLzJvE0GqDYydWUoJUeimJ0H5mRpql5c4z9caPxuHFOtP70TWc8JR12YEnjDDCgLQtPVuTpbLQL1aWRp%2BMFYI9W%2B%2FljDAdR%2FrrvWTCiwpAzbgTxtiMJaAxrw%2FBnxUtoWe8rPB84u2LFY&X-Amz-Signature=f48b8abfa80837fa56d51f4ee88b07bfa164fbe1f25a1adfd058b7e52970d842&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662V3FTQFE%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF9oXvPVCdVtDJ3Jw%2Bw1xOQ0hWfpMlxYngElUydOcgB%2BAiEAjHOOCJqLQkbjXDtHMf0fyRf4jEm4cD4trFb8G%2BNo7U0q%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDOQPS0nih7wzGiiusircA5%2FajNG1U7%2FL2wuNYjQOVTyeMNOyWYEUydShYRrMYebSjp3QTD808K84FQgm2VFI85xnjYFqfhxSH0msjFSW4oWh07Poz%2B%2BzBg%2ByrZuIi0vJdndKnEU65n3vurKc7iZ2hqhbu50nCJTv6vfhYM49YkaPNigXVTeTR%2FCTecE6DC2bBZzzqEnBe%2FFGYxidfC3Z%2FKVmeL7gyaYWDVNx4FKMDTHW9Xh22v4VHG8Qs2KmkwmauAQj44A5HZ8MwG7u0Y1QV6Yse1T1hvNOVrdbd3fcjatptUpRGJr5Ry4AtDsLhJmv7l%2FUgDgUjy7OfIazuVpAWnAf91uQt69jcXZ67jfNwqOTit%2BYIB2ifoV5437%2F6VC5CKezpFb3hQdMM1W7BH0G5YLHak0zRS1fUzZZYTU5ZN7ioN8H1h%2BnahVjkU5mMdSqjHZeb%2BTaG00IueVLpGTQHguAuukY3d5lLV%2B7%2BUzkkcepxGwL5tOxgaoyapM7aI1qrSmpqWDzaIUNW6rBUA6NsoEwWOhbJnV%2ByfKt%2BesJDK%2B1vAf%2F3VdqA4rmBWTiXQq830S%2BYjnf%2FFGBMldmHTol0IyoygTK6X04P%2F1T2OqYOanEkDxdDV7%2BM2mE9qmpnZLNHGg9S6LRo4qNrCdrMMfZ7M4GOqUB5HrJllE5vIt0nxIfj8X5Pb%2BleoL46NaIeGl1KUJINRq2f5NVruKxnqvidfvkt70rWvXPPwSoxWcWrGjqL3eeO%2BErfeUNsFe10CWuM1mhK8Qvf9m1G3CGS9yz2%2FtkUyoK9tfS%2FO8aPvKqpigioFiMBLQ%2Fdg%2BYwT8ayXzLdwQ4wRPIzwS71h1axKw5kDh25xTmhUIcKemhdxOPtF7MeaEMJmxPyqsn&X-Amz-Signature=5038f34718e33d7f5a47b8ef7ef89accd6981c6f46524c350c8e6cc788ae6620&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHIQMUQA%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICRTKpFDwMSCrSN9I4Vwl1dIokpHcgQloL0wDtMPl0IXAiEAihu6RrK9KPGuDXyOlRNihOUyDt6HMO%2BrwGAgucLb%2F2gq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDKOvthQmev7NKqyvpSrcAwkCz1V3THNNcEoyH4owQoURuCIRHGajn%2FEkt0643wROsYcWxkQoO48AwA%2F6%2BQpRFfCY4WTdu7v%2BLC3HwXmXtzjoHw78kBoqgqvyVVRxmj3Sfew7aza2zHPL5O%2BPANaPqSVVhkqtfOV%2BRlIohtfVyySuT%2BUdVYW2bhptJkSIvMRj1iPWUMYLqA%2FD7q%2BLKuRnHUnt6uSmXtaUt3w0HFtE4W97n3PdA6b6bjbnIpNj4DXJPN7JzAcDxgvqujQ%2F1JGfby9ZfKueEk%2BIBPls%2FibYgawEd3LwELxUGwAQxdnpZ9VQcwk6Iret1tccFr2yvkyCS%2BzyyalmKbt8h2Gg4uvNwQ2mRjZi3oUEPFv8%2FAgyyk0gRkMjpOvh6Nc4LxEaEN9x4rb7RIOr1plVAaHvooURAuE67zasp99lqhpCW3xTugW2cOP7W%2FUCfG3pxWIkeK4%2FBDS7JpWzovIn%2FvxCWt%2FBlU4gKzbJI8LqaqjoZN3CGIpmt8OmQhstre%2B1oYtxaOcXIMRzp5nUFwRM3XISxj1icYl%2BXOKTEQJtXhmkEaex6p6hdYl%2B9vHjql5D2jdlPWEbgoK1KLsk4ABMGNrlDfaaiuaXnFDQ8RK9aubDH71TXKsxkz2f7MMC58tcmbKQMMfa7M4GOqUBrDjh7rLAqecMWcH%2BaNEn%2FGjrAhf0vtYJ7pmDknB2CfWCCWFxuFhGxK8j5koZ2Up%2BgHL94wSnRX3BLQ%2BKT4BO4v9wE%2BOaiRxJqV89jRU46sWa9XwnLcpORPEXpL9glkYE1AkcLipd7kgmFLEBg6rn6C8zBJdpZY5UTHqsj5Vt6m8Zel981qskoQktJjLgs1%2B1XIw5uwh8YrYM3xLxKo%2BLmjtRhRDf&X-Amz-Signature=23d7bfd43db0f3726f5dd740deba3773b860d84084306f8242b0ff4b8fa85806&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHIQMUQA%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICRTKpFDwMSCrSN9I4Vwl1dIokpHcgQloL0wDtMPl0IXAiEAihu6RrK9KPGuDXyOlRNihOUyDt6HMO%2BrwGAgucLb%2F2gq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDKOvthQmev7NKqyvpSrcAwkCz1V3THNNcEoyH4owQoURuCIRHGajn%2FEkt0643wROsYcWxkQoO48AwA%2F6%2BQpRFfCY4WTdu7v%2BLC3HwXmXtzjoHw78kBoqgqvyVVRxmj3Sfew7aza2zHPL5O%2BPANaPqSVVhkqtfOV%2BRlIohtfVyySuT%2BUdVYW2bhptJkSIvMRj1iPWUMYLqA%2FD7q%2BLKuRnHUnt6uSmXtaUt3w0HFtE4W97n3PdA6b6bjbnIpNj4DXJPN7JzAcDxgvqujQ%2F1JGfby9ZfKueEk%2BIBPls%2FibYgawEd3LwELxUGwAQxdnpZ9VQcwk6Iret1tccFr2yvkyCS%2BzyyalmKbt8h2Gg4uvNwQ2mRjZi3oUEPFv8%2FAgyyk0gRkMjpOvh6Nc4LxEaEN9x4rb7RIOr1plVAaHvooURAuE67zasp99lqhpCW3xTugW2cOP7W%2FUCfG3pxWIkeK4%2FBDS7JpWzovIn%2FvxCWt%2FBlU4gKzbJI8LqaqjoZN3CGIpmt8OmQhstre%2B1oYtxaOcXIMRzp5nUFwRM3XISxj1icYl%2BXOKTEQJtXhmkEaex6p6hdYl%2B9vHjql5D2jdlPWEbgoK1KLsk4ABMGNrlDfaaiuaXnFDQ8RK9aubDH71TXKsxkz2f7MMC58tcmbKQMMfa7M4GOqUBrDjh7rLAqecMWcH%2BaNEn%2FGjrAhf0vtYJ7pmDknB2CfWCCWFxuFhGxK8j5koZ2Up%2BgHL94wSnRX3BLQ%2BKT4BO4v9wE%2BOaiRxJqV89jRU46sWa9XwnLcpORPEXpL9glkYE1AkcLipd7kgmFLEBg6rn6C8zBJdpZY5UTHqsj5Vt6m8Zel981qskoQktJjLgs1%2B1XIw5uwh8YrYM3xLxKo%2BLmjtRhRDf&X-Amz-Signature=23d7bfd43db0f3726f5dd740deba3773b860d84084306f8242b0ff4b8fa85806&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667F6NTWBC%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T093408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2BJ5FAFP5F%2FvoEY%2FRFXA6bwB%2F6tUqej%2FTQJea%2BUYRNaAIgH1l66Ow75cNJ7WhAi5WTO7DBuYLwlN9iuui8pZHNKAIq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDOkfdTwLaUaOI2RQOircA0N1C%2BpZklKf8I7T%2FQQsWjzyjAHiPsYlWe7FHyHivUQxwZXf2l3QBvmqH8nq14vDiePO1qX8sJufA%2FTmBLQ974te%2F2iXyCfF9hBiSUm%2F9dVyKXCMFB1Xx1ssosT4339hs7RKUcLy2JBnbfQVaeaiAR3stgyJGszYC4tY1vuOC9m8ufzYWIe1XUqK%2BVkzKMoGxLjdWrpfTeRew3DqTOwh2HM%2FtjpXPknjCuF9rhtFAoOwt72X83d1bt3tTQBZ5lmCNmJhdQZBRXB2VmpOYA6P6pZIBUxwM3EvoOtbUNvV%2FBKvMnbTRhSVx7O%2BjDdYE2FzXYJn3sOlZJgJAYa0%2FWscP5ecJivoQmTvFK70TZUeRTmYflA0WjE%2FqKMQ8j0NUyWvYRtmLEesNRDeiJduhY4mo9Hpuay1%2FNhEr2ME0hdLWuj2zvBJvGZT12m4p34I2%2BBocrQCQ9zj7C1MgSvtzvuEhkTdb9T8q0bw5cSGuhrgks006XGY4RfCPiWlVBZgrsaGk9CugAndC3ts9oFEjIH3WodAPMqRW7HXdCKcivfK9hMFTznf%2F0zoIxlLfqexo2kSuVZrbuF5RHzLs2RfJID%2FvHUaxaRYEE2k82amSosSELrRkahhsVaKysGTypDNMP3Y7M4GOqUBVEVevhtX7E6hvYjpgz1%2BV%2BxkTYm8U18ppPtBipSOkz6S6IKmklD8cjKRDII2ltcKbPB2nG263kYYjDktfn%2BHZBJ85j3IeYGC18gRLigN3Qj%2B2kYmR139rVZv5neLUYQ0Nv7D7ph44G%2FJg9tLntEtmHe9URXf7DbX69fzj94NQ3XYRWgappk3DUtnvCOzsznT4jfAWfJH%2F3NHKPZT31hO%2BofIZnnn&X-Amz-Signature=0595183daef889f4c9a54ac4a7634df7558f9882585b8006d9899ff19ecad177&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

