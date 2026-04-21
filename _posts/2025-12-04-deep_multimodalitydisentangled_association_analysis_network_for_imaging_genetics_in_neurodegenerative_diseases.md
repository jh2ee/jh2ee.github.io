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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WIGMQM2%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCMFtFe5z2QboIaWueTokshWVL6pV0NggViU8%2FsJeyhmAIhANY63eKLtepDIGK4jEc78Xc0otWxHRhjFXY26yghTZmQKv8DCCoQABoMNjM3NDIzMTgzODA1IgxYerp7eagiJMQxdU4q3AM%2F4NKTuhOSgrjppImbxtGxwbKMvxNkdovt1ZyBNvi4xibE3VDpXWBTpQTe5YaFDqO4WsnhkSnfYo%2B%2F7MHUKyS1xigzdxZBGa8f09Nqhtb3cgaoqwBurz1K2vgU9PqoTX1UPh%2Fv%2FswT7iG5SJExDaXuPhV3sZyovaDezSaLEkQhq7KMOoCrR6z5yTqwN1bpdPM5CroO2la6YlH5NF4TS66ENEqWzlnuJ5RD%2BMVlK96z1SqkqQj7VzJNKwY7Rx2x%2FNGdQweJXFrfi6fYJ%2BcFzlwxZIbvon%2Bcg0YSeR%2BCOmK0sZi0EfRUGBE4ERJVzJpuS9APp%2ByrxqyVVQ2i33IDZgPUqLduoxvRJg9JkEu6dXYGQuxHAKDuZusBzW4WyJf5TY0T6aXcRMX3AnXF6Azkf18A2Fu4Bp4mrL%2FeaEKaMK3sPgMWP7ZdbSYHBiZCnNnXoRdQ8PvQ6mOAGToNkDzH3ol8GWual3feB1ok8jPx8WI1IglEM4irDxnkd%2BL6tyVV8MxzmB%2FJwQVXjMDeUFyLlFbq14Y341OTjpEbMtTG4cRla6l%2BPb5iHKdCFPm%2Bws9gyfsAHzVgVH7G2iRwd%2F5GXV5JNW%2FPNARvgeREa92lzLXuTQE9TWOzRGYoZ0uxQjCxi5vPBjqkASlviCFk8y1s5sKxq7DMFbyHxhWVJuNW9Q50plHXaFi6NdMQt%2BUo8Trycg8AWdx8kCn1gqhb%2BQE8CGdXywOz8ghtpxEv4T70jcePq3pBKOrhGvIFOUdw18euwoqA%2FI2VJhEXjyEQQtsRXf6nTehV%2Fkg3zvwwycBH9Y4j5YveOFOdMWftetoRi5UyH8AQ380WIVVropqhHEVrKPz6g9oh1iQO2MNB&X-Amz-Signature=5501a84c73e70954882a3dc67e13f4b8a8e45edcc84ce725ee60bd73ad8ba09b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WIGMQM2%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCMFtFe5z2QboIaWueTokshWVL6pV0NggViU8%2FsJeyhmAIhANY63eKLtepDIGK4jEc78Xc0otWxHRhjFXY26yghTZmQKv8DCCoQABoMNjM3NDIzMTgzODA1IgxYerp7eagiJMQxdU4q3AM%2F4NKTuhOSgrjppImbxtGxwbKMvxNkdovt1ZyBNvi4xibE3VDpXWBTpQTe5YaFDqO4WsnhkSnfYo%2B%2F7MHUKyS1xigzdxZBGa8f09Nqhtb3cgaoqwBurz1K2vgU9PqoTX1UPh%2Fv%2FswT7iG5SJExDaXuPhV3sZyovaDezSaLEkQhq7KMOoCrR6z5yTqwN1bpdPM5CroO2la6YlH5NF4TS66ENEqWzlnuJ5RD%2BMVlK96z1SqkqQj7VzJNKwY7Rx2x%2FNGdQweJXFrfi6fYJ%2BcFzlwxZIbvon%2Bcg0YSeR%2BCOmK0sZi0EfRUGBE4ERJVzJpuS9APp%2ByrxqyVVQ2i33IDZgPUqLduoxvRJg9JkEu6dXYGQuxHAKDuZusBzW4WyJf5TY0T6aXcRMX3AnXF6Azkf18A2Fu4Bp4mrL%2FeaEKaMK3sPgMWP7ZdbSYHBiZCnNnXoRdQ8PvQ6mOAGToNkDzH3ol8GWual3feB1ok8jPx8WI1IglEM4irDxnkd%2BL6tyVV8MxzmB%2FJwQVXjMDeUFyLlFbq14Y341OTjpEbMtTG4cRla6l%2BPb5iHKdCFPm%2Bws9gyfsAHzVgVH7G2iRwd%2F5GXV5JNW%2FPNARvgeREa92lzLXuTQE9TWOzRGYoZ0uxQjCxi5vPBjqkASlviCFk8y1s5sKxq7DMFbyHxhWVJuNW9Q50plHXaFi6NdMQt%2BUo8Trycg8AWdx8kCn1gqhb%2BQE8CGdXywOz8ghtpxEv4T70jcePq3pBKOrhGvIFOUdw18euwoqA%2FI2VJhEXjyEQQtsRXf6nTehV%2Fkg3zvwwycBH9Y4j5YveOFOdMWftetoRi5UyH8AQ380WIVVropqhHEVrKPz6g9oh1iQO2MNB&X-Amz-Signature=5501a84c73e70954882a3dc67e13f4b8a8e45edcc84ce725ee60bd73ad8ba09b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQZNH4KL%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIC2kupDfz4riMQabaFmbbGNqMjZ2xp7D7ZATOVB2mP9uAiEAyCMjNfQyPZaSgSzPC%2Bzos%2FqXYV2qIWotDJQ3NsKZ040q%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDPw1KB2JLMywBqlA8yrcA7ybd5uRttq8Ku3hiKVjYd7KKMb%2FSOLZfG9e0eFBgVfCISlogKH2tJm5dAOGq%2B78NhCiIJBJMLxKnzjwLkMPV5PkTOvPlDakOgV%2F6Ogq1nlZ4w4uXfvjSAe9bqEsS24Pcq2EA4O%2Fnuoqajs5%2FRZznSIWH49BZZwUp9blGCJCR4MCm9dnx4m7BJzWVxqVRxZ0CA2XRH%2FLBUekjo%2Bwur50jpE7Kii50vro0G00zn%2FBAXNrFr0IsofAVMDMB%2FvCTdqt1L53m1TQEz4v%2Fyxk3eoPJ1rbv7ZGSfl%2FoV2VWa7xnXx9lX61firCBVRkeqosHx9r9Wg4YSyPoMc2cL1H%2Bx2wiM3kAYenT3eqKxR9Zh5j9wofwEhmicVJcH8h%2BFOmSM8aO58bw4ipYPpj5R7vw6LKxoEg3MKI95xmzUT%2FgCWsYBEVMbNTF743sjQex%2BLVH9EMA7Nb7NvgPuFFZr7hSMUzgJGlduhKKe3TIh4yY6T7gm37bEJlyd80EXzOyftxHnYNSw1SlMNGwoooePHNrXL0LwLgax8urbm%2BslUE%2BojiblSRNeB57DnL3YlBngZelQmazeQVX25UXhxQCXf29flPuREp3pHTbXqGTQjehzJGHyiRC4bcEhJsCyAfyBU5MKeKm88GOqUBpvNpzoT2ypth2eujGNG85gsA3XnTRBKxURuh5sqCP27ilyN2Sv%2FYj4c7WPiC0EFj4yfIlE7fweYOD2QinukWIAD2GjshJx%2B1MBdmqV0lv%2BeefP2sIVvSjN3tDV2qiu%2Bw1haCnSdYkFNGpgSO2fa4kPZb%2B1oQNKMes3E02%2F3HD4orIrM3GJ26FhLvLmpdLN48nlsORjrJEJ%2BkjHpA7i%2Fjs7Zk%2Fk%2FH&X-Amz-Signature=24738c69d5beaee6c3728b193c24e76a02e827677e6737d7267c881425fd68a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BXML6ZK%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCBVy%2BHKhpHd0pjdrzcN2hoY%2Fp0r%2Fco4wCaJqDut36k2gIhALgtIceqQpGuHHVmw8l6t8K%2Ffw8pKIXOfl5OTiB9r7w9Kv8DCCoQABoMNjM3NDIzMTgzODA1IgzFLewH28aMy9jgf%2FIq3ANAHHx4%2BNvGfiPDP%2FpfMYMb55Gdybzlr%2FjbudcV%2F2MCFA8TmTCcXlafxSYyfNKjUIz9FlvB8i4wadlIfey0HAwn7E1WjNSJ1DHohwvJQ4bIX%2Bwn3Dq2ewdnJz8q458BqyfQxYH4pNdEupR3b5%2BCWkglJ06ep5FnrnJFYCum1x5RI0HxTiJxke42fpWa7CxrqisEzEW8fweQTvb9saqYK9PTtprxzpBaiEbYhcdL4cdIXEi4drrrYfhpTNtdOlP6o6xe15lOD6p8YYV2Az965AkCGL%2BkiDqg2CPWvnO99lO7rRjQrz6iFVjcsTF5jW671DU5CuuQUEVJ%2B0hUAkrQm9eKUR30nAF%2Bolx8dLxfmQsvfj0yx7DjVZ%2F8vCUx%2F1FoIdnBWvLWyz7P7XoRsx0L%2BWNRN3M2rYOgBAWGiOOdg30v62ZxLFfponUFe0ufncPMgKlWrSK4OHSQj5OphtFCil6VOcyPOOJebtpNJiyjbxqd%2F70pUr8CJQbctz8zku3It1RA7Fcfm0Hed%2B6TfpvNcTE8tyEKxeobo7oGaZOzXaR1mJtbL%2FC%2BPsUsJuomxI6%2BaTsW9LSoRPx5sYGRz3Sj6bf14WQZsg5OAd7HQY1KjQk5pM3QN0M2NSilMZmOVzCgi5vPBjqkAYj0Gb1IXH%2BY9ixKoBB9iisP%2FZLaK5%2BzvqIZU8qofdZXCko%2F9ZEhBgdc6X53dtC08ovwXqYHsDO54Eu80D0u9jC%2Bm%2BB0d1fsTos%2FJF4rw2GOlW05KQ52OCTD5aY3mS6r5Axum3VYoh%2Fn%2Bvfw7pgLsm49KwbOL8XOvARzDb%2FzZKPNChZ8aecSixN0hXyCjwOJSzU3O0tRzlnXPc07eyjrPkEVYjTC&X-Amz-Signature=6c05176f6e54971e3a4630b09c14464f95d897f1459b00f7a911b25d4a988efe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BXML6ZK%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCBVy%2BHKhpHd0pjdrzcN2hoY%2Fp0r%2Fco4wCaJqDut36k2gIhALgtIceqQpGuHHVmw8l6t8K%2Ffw8pKIXOfl5OTiB9r7w9Kv8DCCoQABoMNjM3NDIzMTgzODA1IgzFLewH28aMy9jgf%2FIq3ANAHHx4%2BNvGfiPDP%2FpfMYMb55Gdybzlr%2FjbudcV%2F2MCFA8TmTCcXlafxSYyfNKjUIz9FlvB8i4wadlIfey0HAwn7E1WjNSJ1DHohwvJQ4bIX%2Bwn3Dq2ewdnJz8q458BqyfQxYH4pNdEupR3b5%2BCWkglJ06ep5FnrnJFYCum1x5RI0HxTiJxke42fpWa7CxrqisEzEW8fweQTvb9saqYK9PTtprxzpBaiEbYhcdL4cdIXEi4drrrYfhpTNtdOlP6o6xe15lOD6p8YYV2Az965AkCGL%2BkiDqg2CPWvnO99lO7rRjQrz6iFVjcsTF5jW671DU5CuuQUEVJ%2B0hUAkrQm9eKUR30nAF%2Bolx8dLxfmQsvfj0yx7DjVZ%2F8vCUx%2F1FoIdnBWvLWyz7P7XoRsx0L%2BWNRN3M2rYOgBAWGiOOdg30v62ZxLFfponUFe0ufncPMgKlWrSK4OHSQj5OphtFCil6VOcyPOOJebtpNJiyjbxqd%2F70pUr8CJQbctz8zku3It1RA7Fcfm0Hed%2B6TfpvNcTE8tyEKxeobo7oGaZOzXaR1mJtbL%2FC%2BPsUsJuomxI6%2BaTsW9LSoRPx5sYGRz3Sj6bf14WQZsg5OAd7HQY1KjQk5pM3QN0M2NSilMZmOVzCgi5vPBjqkAYj0Gb1IXH%2BY9ixKoBB9iisP%2FZLaK5%2BzvqIZU8qofdZXCko%2F9ZEhBgdc6X53dtC08ovwXqYHsDO54Eu80D0u9jC%2Bm%2BB0d1fsTos%2FJF4rw2GOlW05KQ52OCTD5aY3mS6r5Axum3VYoh%2Fn%2Bvfw7pgLsm49KwbOL8XOvARzDb%2FzZKPNChZ8aecSixN0hXyCjwOJSzU3O0tRzlnXPc07eyjrPkEVYjTC&X-Amz-Signature=678c5353188706b98de1b3dafacc60690790b20b4d016e40ac125a4c38ec9f92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJKQ2JMP%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIBLi1nlNOkd70V%2FQopV%2BpHKtryF0Mw%2F2PNNDJUHMHCvaAiEAzRkGBGJqEQTQ0jm04McXdSYgwcPiom1Cs4xq6o8X4PMq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDH6JjRZe2jyIq2uE%2FCrcA1Omh0jpskBW8t7IrmPQhH2r5ssJ4Xh9pvIiH8U14tbStcd7084lwFtnmMmQxd72%2BrtK%2BApFgXeXf6mmln57T4F95aTcLWFTmO%2FSAz88uVZFeh5iqcu8ECcqOCEe8qDgUZ3LD%2Fb8P6Qb%2BKaFpCLY05FZcPZ0zP9lxePhc8eAfsvEtLc5jFzPYuJWyumJB%2BXqWXS5caU6sD%2F8JNqfE3eAT4REQ4KDsBBgIzhLtITXP7NLSJc9CqZhTj0d%2Fzy3MF5GNlKmQXJaFLakqAfn9s9%2Blp1R8FSEv%2BllJmAim%2F4AENgYLVzfJ3bQ4OqtljxLvGrHku74cPSyyZoFw%2FUmftjFE%2FzS8ikP49Kb4C8JJKkID3BswUKBpv9BkvolGiWkP8W65gKUbxNv8IB3ca6mxDnr%2FPDIA18JrMITRZIV8v0%2BQ1uBapGE0eDTaQgS3zcNS3dxN6gvWTq0qCm8LSBz7cnbYTkH1GQM8tqHSOKNVWSsRXXHK25Ll3eeKjtbGyC%2BvyufbyskMWB6e5VivIYNohSrKwSFo3wHO%2Bn1VZwk9MV0aYWwiGawX6c7OzeQVDx%2BTU26vDdhGq%2BbOg29ZoKb5s0pkiMYDSNozLa9SIKMKbOM7iUyIgAm2oZQY49kFyD8MJiLm88GOqUBqzypaILC8AZ4kIod9%2BrwRfaUGG%2FSOa04FnutYl6FJOyig%2Br39Hmu4d3C0DXxfUu3rCjae7HX1iVNB%2FN162dDAS2xJdaibEe67tm5rEk%2BqUSzKLmC9hElJa06X9Vsjgkp25XHyS7hRqkQjjwr0HNhwwEc6vYNvQnmvvH4s%2B5ZihLMMtGVzoDgYEyrOPdbHF1oc%2FhYBoeN5PyeIAnDFLxTI6d%2B2ZJq&X-Amz-Signature=4f3a415e97235f5a832cf425d189930bafdf4b3d85fd366af6cea9810107bf4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OWXWWX5%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQC8PLPB9U6jMktWGfPbZjNo2tbxuDxmEE9cwi%2BxIvylcAIhANG2BjAcAl8qeALqYTecxSGP7Z0fSkG0mbYgToJThbfIKv8DCCoQABoMNjM3NDIzMTgzODA1IgzKuF%2FUeKR2Dt8x7zwq3APfSk7lHFmml3tjf1kIFQOP3FGSaX5H56hNyKoYY1UYWAXNIJu5jzWSPgfkcY5hmwkMAd9MWyM3rxrpvp2e%2BcLnZRxkYitZDRdvSBrV0qHuVLfO9Cz%2BdQ4W33vo5HXLCTXCKxr0ivWtX05Rjd3Ob0mkzAMDJLyHCHTFfszjOZwwbtPvvKlQoLwUcneJMxfRPltYNOhHmawVOWIUQ8xHuydgQPOE3MSNmKw198lzFq8kZDHy8PcM%2FVC7iFNLg3hPhBSd3%2FplY1OcWIXEB630Cv%2BC%2B1yb%2B0xGzF%2FVsVq7x7ByFOnNlOlsMTSi6asTgqa81zJPwT7mjXUzMTMsYEAdvwGCDqyvwmVFQD7JXzSJ8ywb%2FjVfRfgkKht1xIGS28eHZKaF2AxcJjbT31zvpP20iIUKABkel%2Bb%2FuF%2FhaVls0u7dQioST%2FJEiCA%2B2vpdEbNSwNhLxRxrrWh%2BW4i28JW2uBAoiT1hJmgmJ5awCizAt0tJ7z%2F0%2B%2BO7rk%2BcpU54l%2FjhkRxWMjoqyEBhXhs8ipn%2B48H2U6jMz2wHxFJELM%2BEA2DUrqEqH9rORSuHZSYB26y8PTqAHJTluMdDxnN6Uc5LKdX7NCbsna4z%2FaGVXERnuX9ceObGUgmvp%2Bcq0unwuzCripvPBjqkATOxjll3H5V9dXGmC%2Be8mnvPM0BruBfYtCYxklswLXH%2BKol2hWgyT0vM%2FJbjN3FhC%2FohzBNdOwVp1sXT8tdlrN9ySpo9LVZpvJZqdM%2F5pOVm93FEfVrnAbHHMz7YWqf5gvl4xLY5nMPiLqam4OCEQtqHHN6c4jhiwZYCfxFmnF2r0ahj7wKPLQkkAJevsda6T8tkgdQxf%2BO7wLdZm0jsX%2B%2BFufrq&X-Amz-Signature=fff2e1a704d48decf5a834476ddf8fea8b98591397a57784bb884d6c23d58383&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MYNVSBD%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIGm6pbXY5EHWEV0vYMu%2BCFGFTKHWxlGSfI7BUOvJpxiFAiBg9BtiBeCrQEHvS97z2fFOlTPdYgbZi48glcod648FNCr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMgynb1KDQLZqn%2F8zPKtwDzDulUZNXnzty6YTKVHnq2ToKD%2F3QN%2FnwA0Mi6n9L6DG0GOBvjEl1j8qgxiRlb7E1Ho0cOsyv5QcG%2FDv1Jt94efb4jyBHrqRxOS%2BWNbZjYEo%2BYX2WBDhDMGEErkZngomoKJTB1H%2F4lwbkB5sv5SWUlkiWVvpiydUoWUV7QKRgKUsDracyyIlwIaXaozmuV7HP%2BwUWy9caNoQUeUJDJZ3mVwGsd43cdWQdAzE8rskeloeup0Uxl%2BH9G1hGh2JWP8E66a10MD5dHWyV37i21baPbx8K9aNQ3OYrJC%2FawpS55RM%2FLi4Lt6y4EkJSBK5X%2FbwGy5XAutztVwlikqmnTj94M3zHN8%2FcytvnNsKexVeSEErjbYq%2Fe470jcjHZqig2%2BWgV8%2F234O1PXHsuVwuXK6R3TiwNE6R1CZz%2BUpqds%2BYWx3I3G6xrVNJAF%2Fl4SWCnyQGL370pAugr3NbiDBw5dHnww%2BfixakgM49wUs1L9rqCnxk9LvCjrpH017nXgYbAoGP1cT%2Fc%2B3p3phVF3KgHsyXZiy1y4pVxP154TY6EezgMEm11Gmu1nujejnI0y0x924XGT6YlMFUwFyaNZNunp9GZckbQJn1iS8dLp%2FSAQNcz5QhZNU1KsjiXyEdXbowloubzwY6pgHpW1svpr8JPSOX2HOq6TpUJyYkwVh2%2BKORcKglGvPMWTJdC1TRU3I2yC0K6ldXz8nY2hUtYbEwGv2OP64Py1GdRUsMXfUbV32ReRxgcFxy%2BSthu7myFmEuSjhp7DNmM8cjnbTH58W2OQXPo%2FxNsJjzhwBA15vam3gQ8kfvUXRZUWLwwG0e2NNfGurZoAoCzwuPD0mHRCc4A9iPua5aw7WxKcrAK6RI&X-Amz-Signature=cb1b24dc97285f80d9fc12b400a15ab7c5abef54d39016fe07b1711c15145688&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ICUAMSN%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIAuY0JqftsyHzynVkCS6Xz3qGzwku9HzQw3u0VldrI09AiANuByvj9L3gh%2F6PwRxiLEJdeo4fDWiKGAR7jRL%2FKK9HSr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMP%2ByfEtDAEyB9n5HIKtwDfTE1NBr2l9DVvFi9aS4XUiD39JgZYT7kVun%2B8yHz034pioCkRMBG20ue1JiDct5To5vgQgkWxPxi2wVFfvHmNSZxpxcjtbLwJn6ZampjxC66sCHFnY%2BoWq%2BoRULm9jYfvH7HDL3%2FoWIPu9pnJSfqQSqDedRVt4iflirFTo0JelxV5ayEZbJEgtSSM76YC7uFUA%2BISo1O4bFcXS%2F9ezvjubbHLWQaoHYEm7dbwwfyYhVcOi9UQLx8mVRpFBLlXQ2EvgyjwmIh6leOVsNx0Kq3dqneVODMsJ3G6UJrivvDyreKmRj9k6e2xWFrtPanPsGipbIEWxLDRGM%2FI2oe%2BxGt%2BZy2pea3DWBRxMSxnE3MfYOei0T2M5wTk2UHHUqjpds8GOuBpFL%2BvFpFj7%2BUOchGG1WRvvcZw3RAUq6Togbg0yrNkfuU98x7B0obST3WatJvZPFFa32Oaooo2HRfvWrtPtEEzFNgx5vJPAonWa6KV%2BwUjXkuSmPA0x%2FakJViGCAVsYuKhX9iTzWBtRURN%2BFTB8Ql%2B4ikK15VnURRc7c1inasZroDRamzIEcqo7eIJlb6Cw%2FQgLVhAKseq8WLoc2gxYXQaAwpdF4EnOzsX4%2B8JuiQVQZspMGv5SEmjVow%2FIqbzwY6pgEbWQWus%2Fw28WtzJz4cG1n%2BC%2B8DMX9Veo494Un6JlGsM0ItfvvaRfFGZ7yd%2BkYfGniu5hLtC666GrBJIs2mtWh51JIHj5RHnyWKbcYvhf%2BZIKkJIigRlAUe5gqyYOGHVRFYuWfb264Rxi%2FATDkeKatAuEvFh%2BmDQkgsqeD80SnW5r9cT%2B23tfGGPpdQ%2BmxkmXQgl%2F1kmCqQ7Bz23TJUHzoq0QnXzC2k&X-Amz-Signature=696a484c94be677342c76d43df2b8e9407a05c833c3145680ffb752238959776&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ICUAMSN%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIAuY0JqftsyHzynVkCS6Xz3qGzwku9HzQw3u0VldrI09AiANuByvj9L3gh%2F6PwRxiLEJdeo4fDWiKGAR7jRL%2FKK9HSr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMP%2ByfEtDAEyB9n5HIKtwDfTE1NBr2l9DVvFi9aS4XUiD39JgZYT7kVun%2B8yHz034pioCkRMBG20ue1JiDct5To5vgQgkWxPxi2wVFfvHmNSZxpxcjtbLwJn6ZampjxC66sCHFnY%2BoWq%2BoRULm9jYfvH7HDL3%2FoWIPu9pnJSfqQSqDedRVt4iflirFTo0JelxV5ayEZbJEgtSSM76YC7uFUA%2BISo1O4bFcXS%2F9ezvjubbHLWQaoHYEm7dbwwfyYhVcOi9UQLx8mVRpFBLlXQ2EvgyjwmIh6leOVsNx0Kq3dqneVODMsJ3G6UJrivvDyreKmRj9k6e2xWFrtPanPsGipbIEWxLDRGM%2FI2oe%2BxGt%2BZy2pea3DWBRxMSxnE3MfYOei0T2M5wTk2UHHUqjpds8GOuBpFL%2BvFpFj7%2BUOchGG1WRvvcZw3RAUq6Togbg0yrNkfuU98x7B0obST3WatJvZPFFa32Oaooo2HRfvWrtPtEEzFNgx5vJPAonWa6KV%2BwUjXkuSmPA0x%2FakJViGCAVsYuKhX9iTzWBtRURN%2BFTB8Ql%2B4ikK15VnURRc7c1inasZroDRamzIEcqo7eIJlb6Cw%2FQgLVhAKseq8WLoc2gxYXQaAwpdF4EnOzsX4%2B8JuiQVQZspMGv5SEmjVow%2FIqbzwY6pgEbWQWus%2Fw28WtzJz4cG1n%2BC%2B8DMX9Veo494Un6JlGsM0ItfvvaRfFGZ7yd%2BkYfGniu5hLtC666GrBJIs2mtWh51JIHj5RHnyWKbcYvhf%2BZIKkJIigRlAUe5gqyYOGHVRFYuWfb264Rxi%2FATDkeKatAuEvFh%2BmDQkgsqeD80SnW5r9cT%2B23tfGGPpdQ%2BmxkmXQgl%2F1kmCqQ7Bz23TJUHzoq0QnXzC2k&X-Amz-Signature=c161f71e5ae2df417646536611412f30ae33ea1ecebe3626a2cad9120f7c4951&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PZMFWNW%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIFz1s1pqUDXpakg5bs17pY3r%2B9qEcl3uWaDOaZmp%2F1daAiEAmdBeVFlxrAAoVTC5bOgqQ82jKXzqgkE380zB0vTPDOIq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDH7isLjDTQyM%2F17JOCrcA9uK5txYtrQhieD0TqNVqjHspIOX%2FoD958Da6WQqkJvCvpC%2BQ7dMyG2fUaQd0sSxfgJ8kFHur%2FBevSXX2AN5ZIdAGFs5oE%2Fjzdj1WzswSPH2l%2BZXkmZjDhfqhwKDrLDx0x8RhzPkYNUdvI6RU1SnztzLQbSFq56A624B8G5aQMrlFb67RKsQsJ2bGvacbXJXB5TPZ5MmbbcQFQpwVYOqYTVUtXXsjHTH1k70uN2F4pIBHDwZhkCRL0I9GfkqskixW5zurRqJkClxXFpJ%2BwCiiBtmZ4p48NKdQQX8LpknYawo6tbhu7xWT0Mb1HILFqiFmEj1InKAtfJKNe%2FfE2iOhWdIzwkStqnzT08t2KVd8ToKzbBMZSnj1PUGgClDtG0UCSlayaf6JjfV0Iwe7o0GYKpNVc8DUm6ZlcPNcOwhDFsUCnF3c0TxU0ijcfex1AsVjg4Kh8Y4U1K9clPK%2FoKKMfw0vIMQcKqhCD6h%2F0b9rCu%2FZq2S3BrjglFAKNEgHqhxeOKtTvRCero0%2FZnSlRrNYOTAHFVggKGZORDGAWGtKcmfQMBM1huK5CPksGUB6fCxJL8qloKQc%2Fy%2FG%2FWPJu5SAwYJ%2BIwq4zRQYkFxVYIse6pEr9GqQPYN7lxpuEAoMLCLm88GOqUB%2FQqqvjXWun6g6i6I7vcTNb%2Br7WtSumhQ%2BnpcsF3mbCKQw%2FsrY7rqMUf07usTTltSPXgbMxAAii9cwzEWfSPoNOH6N%2BByFas7H5EfT11M9FsJ7zgyYnCVo87ctGF2ZVDF727Yb%2FerocM5tVi3MIXcTYcRkt5rYFCGUVTAuGf%2B8%2F8ClqWzGBB17FBcIt%2FgxqNVXcD4w1HuxGAOdIm945c0uTlAQ1Ng&X-Amz-Signature=03f5b6e03ace5ca26f9044f5e6dd9ea6af1a7538d714218fc98dd050d9511bde&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SW52KSA%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQD5EwVsiVqaYXwdD1MbkzpzNF7dtdZVfd49tt5BfhX73gIgHyfQkyFblrN6BGJCw2Pcwj9BkWLhODsyJn6lbDEFSHUq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDBuq5oOrmq%2BhU0M4AyrcA2VhJLb7hrTTuIqF9zu7l0fE392od3Q7cjNuJgeU3mQtHvyCFWVk1AIvC7WQbWovKZOCzzZNBPxkNCJvRNTvUwtbnF3muHB6jT7hK0MtuN7u5bjqjybb6hbbl4j%2B03xuhO5IqUHmyVY3b9bTsXbvzO1fGZkrBTbdrFHvtWlz8v8u6D5sEh0k8Eob%2BsogAo6che4U686kVE%2FSLuzBawJIgCK%2BOhHTQCcdjzO6Fpt6Lh5Yx5zRtel0tmfQXTGEcdAJGpU1qlxG9LYG10CL1V7ZQcig6214d5wxeUIVhcJU6xIYwWCxsMNhSbPIjJSAZl62q1WszugnCqjOQZMN7iDV22STCPPUWS8DWKuOaKSPj44brPMJ6fBS0g62zMoKNclTYWTDgK1qTooZufPPWzBIkAJ2VEG3B19i6%2FuR4TxSQWZb%2FvAWBKzYqUSgu9BAxs3unb4GQnCz8p%2F%2F92ncYii3dECo7LEZjCtFNSz5kmqMoY3fknCjWjSn34Axm9Xa8wly5A1hqMYFoXapQuO8JjnJfGbkzWD3x42Ah%2FuHfNamdpi3FHD6esGXHhSg8J%2FUh8Q0MCdAMVleSxCPY71%2BoriHcUj8oWOQxq6zhAQLweVb8xiyca6oJNjtsaZxzafrMJWLm88GOqUBJTfIaf%2BrTRCV%2BA9ZJ005eORWhTdc%2B35l2K1iKkZvH9iVi%2Bypn%2F34RflFz16atpb3e0ERIsFLQfvkm8sbzJnBvCyTGw33C1iIrFnsbpsixpswtu%2FmhkgY9hYEYFa6ifzIkIdoroXrFftDCQvUzE3nL7i%2BsXBXWc3xiMIT9ncRe%2Bn4UYFuFlRnyQvyulcZosy8IrkVhoda%2Bwi29yYb9ARXRpz9H28W&X-Amz-Signature=4f7db579ca19b6018a8eb77421c890776f6ceb95153cede07248261a0de6dd51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SW52KSA%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQD5EwVsiVqaYXwdD1MbkzpzNF7dtdZVfd49tt5BfhX73gIgHyfQkyFblrN6BGJCw2Pcwj9BkWLhODsyJn6lbDEFSHUq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDBuq5oOrmq%2BhU0M4AyrcA2VhJLb7hrTTuIqF9zu7l0fE392od3Q7cjNuJgeU3mQtHvyCFWVk1AIvC7WQbWovKZOCzzZNBPxkNCJvRNTvUwtbnF3muHB6jT7hK0MtuN7u5bjqjybb6hbbl4j%2B03xuhO5IqUHmyVY3b9bTsXbvzO1fGZkrBTbdrFHvtWlz8v8u6D5sEh0k8Eob%2BsogAo6che4U686kVE%2FSLuzBawJIgCK%2BOhHTQCcdjzO6Fpt6Lh5Yx5zRtel0tmfQXTGEcdAJGpU1qlxG9LYG10CL1V7ZQcig6214d5wxeUIVhcJU6xIYwWCxsMNhSbPIjJSAZl62q1WszugnCqjOQZMN7iDV22STCPPUWS8DWKuOaKSPj44brPMJ6fBS0g62zMoKNclTYWTDgK1qTooZufPPWzBIkAJ2VEG3B19i6%2FuR4TxSQWZb%2FvAWBKzYqUSgu9BAxs3unb4GQnCz8p%2F%2F92ncYii3dECo7LEZjCtFNSz5kmqMoY3fknCjWjSn34Axm9Xa8wly5A1hqMYFoXapQuO8JjnJfGbkzWD3x42Ah%2FuHfNamdpi3FHD6esGXHhSg8J%2FUh8Q0MCdAMVleSxCPY71%2BoriHcUj8oWOQxq6zhAQLweVb8xiyca6oJNjtsaZxzafrMJWLm88GOqUBJTfIaf%2BrTRCV%2BA9ZJ005eORWhTdc%2B35l2K1iKkZvH9iVi%2Bypn%2F34RflFz16atpb3e0ERIsFLQfvkm8sbzJnBvCyTGw33C1iIrFnsbpsixpswtu%2FmhkgY9hYEYFa6ifzIkIdoroXrFftDCQvUzE3nL7i%2BsXBXWc3xiMIT9ncRe%2Bn4UYFuFlRnyQvyulcZosy8IrkVhoda%2Bwi29yYb9ARXRpz9H28W&X-Amz-Signature=4f7db579ca19b6018a8eb77421c890776f6ceb95153cede07248261a0de6dd51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TR7XIAFZ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T011134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDerkN4ACwCoP6QuzelwJmXKwRn3KiDrMfIfYxRh8aOHgIgS%2BmbgX%2BXcjU1gOqcss3JA4Oq9JOyGUN8CO1dEHrxH34q%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDBBaOO5YG%2B9Z%2BKSgpircA72ijJ5uOyfw73DnG%2Fa%2Fe%2B%2BOFoH6I%2F6%2BosVSdevrzdRutl0iFrCmQre5YJoXdwWtlTIrP3OHyPCnU1YP9L2mLv8XlCySc8OCyDwp4uZg2K1bMC7SlGd6yM0sGmReHu5Hkrt1eBFIrHzwZPmIrcmAPeBzEml6ClLGrodILXDJqDGHNuuE8txGsUbCZFglxkCcB8%2BbjcYCR38%2Bfxn155CnnyYLIl7ptWQpoELLzGxAwU2PvZXQ%2FlryGKMh%2FJzt7xshWnOJBQZqjlSqMq0POUo7GbGWHeDJznZzrb8FWlm%2B7DxSrVrCy%2Fv9vN3pfIsdrNQdHxLzFy7l6%2BbazJ6JfvNgOnMgz%2FyvELnx2xZrZRoPOI7OejkTvn%2Bn4kLTKfdmlsg0XG9qDTWNNndzDy1j%2B88qy2Xw5HDoJ5seRbRkN%2BKYU0sMLocSP5n0vxxCCXSzVN2pKQC9xjd0K6etUAOllSOreoJxGjZD7aC9J4LrFe626LkmFsBPQOZ0ccOWC2i2V2hK1WjQGu83ID%2F2fBgqb3IBJsZkXiYqcR0imcEOZsKOmZSCPrmUwwBnuUbhjdx1APp4sbOegUi9bVORzZ0nPYtrlgazuFjpngB6Tg6ots5DXpXgqCHaIhCajqV67hCJMO2Mm88GOqUBSR3BY%2BS0lJvnpYxBR7dRtV5yoByu5GMh%2BggnbzvfNsugXxXZxGoNT0qVTpqwm0UICGvecRs0A1mb4lnA4miE%2FP3SYRUdS6b2Znv%2F3OuXk1OFcMAsnLVDgyF6e8VJG7OFIwADMcEcyCwEM75e%2BHPFVMd09VLqcg1g05XDjBFVVWSFCRYgFBBg8O5I%2FPXDOdRbDwF9tHWtAHyl2Gr7AfEuVsL0gH0I&X-Amz-Signature=7739baeff54f34b73d9432e0f92ca21ef83e4e8e9fc5ac1a23f52b23139adcdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

