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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBCD6WKG%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJGMEQCIHmJJOIeqVV%2F0Y70KVNrY90t0l1Zn1Ti3%2BmkMK%2F%2FgQqZAiBKJPakQAj4IZFZmgZxC%2BEgrIYToTeyjOLDdl9iWFnWWCr%2FAwgDEAAaDDYzNzQyMzE4MzgwNSIMTEbVt6Va0E7fMjvBKtwDvXS2n8Ab%2BUlnvUNL%2FxE8hb3NHl3MsH5jueWrfKZIT1Q%2B8Yr6hiuIC6t1%2FuNlCGI5YwDH4q3pd844cgbHdRyvxcEhko3%2BpQ%2BozdC%2FGtgKmAqnAIKs9EAdRnYv2qRtWqL2zVmVaSzLHPIzCiRqmSx31Nj7xOd44MZT2Lw9RBj3DgNkisRXkrTSywNdtvIqwun1ITDZSkIox644W7XYFbDcg6sM3XiAgElXwzWk68eM16KM86dIuutjwY1TDXKjPKwfYg9rIByFKOB81JYrA6TAlt%2FaZSj3VtqsRGW1jvLPDi5jRSS%2FZFT8ASSC%2Bgy5byR5n6cxYT6uJY1Kn3wdRjmeqTbwBn%2FzmUYNIocOmytelGFLb4yJW735r6uft3cZ6rxCawY5YRprFSzUEsjsbEVDnbp0Av7RtW8E5FxtKIjHOfkZlcR93ANC6F9FdjgoWnQCHTpD%2BoomYBQYetc7HJzlKeKmaLCg4agvUCS1h819vy33TxCxBzIkCbwoy1VPrcUcANomPrddvP9kq3XtZcxXWawHzAr7JwL5TV7jy0xfsCaRf9ETb2DQpzpTdEZkPOihB5cNppVII%2FBZCgBR%2FibYk%2FwWna4iC%2B7s5mMROcyl9IE7BAAfDQnoneB4CWcw4K3azgY6pgFr2td1JD1x90%2Fy1zxwWXZTonr1t2kV5RxNMKbThKVBUWaDKlRQOrWPkCwrr6khE3ThlMpnAbvvDgHcnN0%2FXQ6OzevcEx6tsLYIZVmd%2F%2Ff1gjmCi0PLdiXh56%2FOJwgWfLyX6HVUBsoqhAKZgty5DvbDU%2B1TtI3EC6yu%2F33mc3KFUzMcMF1CccXUH78gcWNfKEpPXyqAoy9f2pNwPzt3lo%2BNrqfXtBiW&X-Amz-Signature=14db87b842c7e28d19cdd4731f19c554a6e7b46ac0f54042918ae3f7ebfb136f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBCD6WKG%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJGMEQCIHmJJOIeqVV%2F0Y70KVNrY90t0l1Zn1Ti3%2BmkMK%2F%2FgQqZAiBKJPakQAj4IZFZmgZxC%2BEgrIYToTeyjOLDdl9iWFnWWCr%2FAwgDEAAaDDYzNzQyMzE4MzgwNSIMTEbVt6Va0E7fMjvBKtwDvXS2n8Ab%2BUlnvUNL%2FxE8hb3NHl3MsH5jueWrfKZIT1Q%2B8Yr6hiuIC6t1%2FuNlCGI5YwDH4q3pd844cgbHdRyvxcEhko3%2BpQ%2BozdC%2FGtgKmAqnAIKs9EAdRnYv2qRtWqL2zVmVaSzLHPIzCiRqmSx31Nj7xOd44MZT2Lw9RBj3DgNkisRXkrTSywNdtvIqwun1ITDZSkIox644W7XYFbDcg6sM3XiAgElXwzWk68eM16KM86dIuutjwY1TDXKjPKwfYg9rIByFKOB81JYrA6TAlt%2FaZSj3VtqsRGW1jvLPDi5jRSS%2FZFT8ASSC%2Bgy5byR5n6cxYT6uJY1Kn3wdRjmeqTbwBn%2FzmUYNIocOmytelGFLb4yJW735r6uft3cZ6rxCawY5YRprFSzUEsjsbEVDnbp0Av7RtW8E5FxtKIjHOfkZlcR93ANC6F9FdjgoWnQCHTpD%2BoomYBQYetc7HJzlKeKmaLCg4agvUCS1h819vy33TxCxBzIkCbwoy1VPrcUcANomPrddvP9kq3XtZcxXWawHzAr7JwL5TV7jy0xfsCaRf9ETb2DQpzpTdEZkPOihB5cNppVII%2FBZCgBR%2FibYk%2FwWna4iC%2B7s5mMROcyl9IE7BAAfDQnoneB4CWcw4K3azgY6pgFr2td1JD1x90%2Fy1zxwWXZTonr1t2kV5RxNMKbThKVBUWaDKlRQOrWPkCwrr6khE3ThlMpnAbvvDgHcnN0%2FXQ6OzevcEx6tsLYIZVmd%2F%2Ff1gjmCi0PLdiXh56%2FOJwgWfLyX6HVUBsoqhAKZgty5DvbDU%2B1TtI3EC6yu%2F33mc3KFUzMcMF1CccXUH78gcWNfKEpPXyqAoy9f2pNwPzt3lo%2BNrqfXtBiW&X-Amz-Signature=14db87b842c7e28d19cdd4731f19c554a6e7b46ac0f54042918ae3f7ebfb136f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QZMT2D5%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJGMEQCIEj4U4MhHhTHQofS0oxTHvvtwN1XzD32kuYSwrxfivPCAiAvCOliXrHCHmW0w66vQKxvw4tiimCwhT0jN7m0GZuQCir%2FAwgDEAAaDDYzNzQyMzE4MzgwNSIMe00qqVaFGqwKN1q1KtwDmeSD0F7n6EjqkAwdLt%2FaQbpoGcDGAyG9ZCA6GCkpbwGzqX1DODD3qYd0FwVH8ybb88W5Nbh%2FL1DKVuzMwWF%2BK4b68VkIYdqEClO%2FuNQ3PnAMzZ1nd8Pt2gxDOxu%2BmqpMQn4a8n9BkavNf2%2BBBFtcRhZ7kpYUVVGkwB%2B8%2BidjJcwbiye5ub8FA%2FP4NjF9xYbM5gETs2wRp%2B5C%2BqxbExy0Yg704hRJOXmMw3siHegcy8eW3ZS8wDvRJzc6Acv1susLgCrKJMRTYKbViN64xYpdyLqhN5CegO18SsxzdLi7F4LCCiLoDgnKHPz13kVp5sEOisWOBqneM1EQ9IxJkLhKdNESe3n1yYzmhFq7auDcVTwWbmWaaYsA7J1w%2FqFQEQPX0kmllefxcGEcZcxBWlCHECeru5Qx1CEP0cdVXsZf70x24zEZjbs3AvvKznYXuA2QvpkcL6TRNnXFHi60M4FDRv8cJW%2F5Yn8lfL9C68Rso4HISAMwdEJ%2Bwn1TNpgr5XLH7MF0RwnuA6b3C7uEsS38GzwHY2Mz1Spv3dPUav%2B2dL9%2FJEz62PiIV2yqOd7xdrWYeSDE88XB3iXc0VA1%2ByC4juPyQh2YeuTscGBvfM%2BSOWdO7k54z5xQhZndO40whq3azgY6pgE8MhN0VXaX21xhmjfDnRjlHwzC2vqqI7uaS9OQCM%2FExJIEic8cecTkdO7cOmnja6ksl9I4lZ0qOoyGmGLKzhTVr30fmdq0x7DENUqBf4OXNX9SKSjluGAzTccDFC1CQH0T0GbF6tVc%2FlK0O%2FHVGXwHORwfiCKY1glX4f1DXB9Oqq%2F4HeNoyOYylI6kmAecQS%2BIfficNR5kuyrRpaQ%2BW6D%2BU5E2gpYD&X-Amz-Signature=5e4181f53a7484c4137cb36f4b29ebbfa8a10fd3600928324aa08e132dba32fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HKCCCGP%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJIMEYCIQDVizrlmLuUjMwK6rSi4E4N9my4FZn4h%2FOh4y6TGG6phgIhAMHQUfWTvpCwJoe8Wz7g7peQ7h1NIClAu9paqP8Yf5kEKv8DCAMQABoMNjM3NDIzMTgzODA1Igzhr%2FY1A5dwCJoA0x0q3AOVkJZIe9iUF53MYCCiIRiz1ieDmUyGGmV1CS9YimlTgIVKHdq0CHC1F1O8zoDmIJbDoQ2CujOtgG%2F5UKU%2BPu4jZ408rRUPQ5ufurZGxu%2BsMGn%2FEiObifD3LpFbghtNYN9I5Dg8FXhrtOfx2yC3po%2BPMQ2GJG5X9Mw0GABvqKF80CHcmBlVLxukcrPTvTR7x%2Fe87orTcTNYYSCcDP1zm6TwLeHh3UcKGKnYMPiRdvTfB%2FtpaJUm%2FRpkYQ4hfcO%2B2GgVxRWsioclwfron2nV80cAHRVaufZ%2FVXGpbWk4Vmh56%2ByMcEZUd%2FxLj85wHJ8FJDj9TqZIYXAsncLPtNMLSAW2g1TnoJVgOKgX7wCiwiM%2FwBVS4mfCKzZ4DASc97DK4N5NR0E2yLZQYSGLJ3yJnI%2FJA%2BEF3XM5lvLwXh7TwXVKchbxULUEBzBzrIJg4BmipD3ktqA8jnyJyRLm0VXozF9I0Q8V7ytj6OQeFwYf2MgyrEep9Jfc5LAtVqgn6aVj5nqNoNvR9Nhn2Kg%2FAX8zUmG36Qj%2BNuEXW%2FJV1RvVzZwW1tx9y%2Fvq8bmj%2FK33vwt3FT1NexgjMyx5Og5A7ZkPub%2Fy3sDSr8idd9xKqU0CTLKEPe5S35SLDtQPtmarbTDGrtrOBjqkAV7GxG%2BVIUmDr3F7nrtdnCDJeYdqHgOdIqS2bN2rzVKZyEKSG84cfKZYW2iO1x4u6dhq6taCDPSRMZ6sPUYxBdmG1L119B2voFsDbgy19QtNuRAfZToj4yeuWVS1QmiCl%2Bf4DIFLVEXI0Z3stfhQ4iCw6eAvOEPx85mkvrmWtX2Nx%2FxoBACscfasNeTx2NaEGvkv1%2B26ecUqnIuXo%2FjoLEc8fylt&X-Amz-Signature=cc4fe851f0a01772fde5429db542d9e1348ee26b27a11df4db6fdc690ae405b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HKCCCGP%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJIMEYCIQDVizrlmLuUjMwK6rSi4E4N9my4FZn4h%2FOh4y6TGG6phgIhAMHQUfWTvpCwJoe8Wz7g7peQ7h1NIClAu9paqP8Yf5kEKv8DCAMQABoMNjM3NDIzMTgzODA1Igzhr%2FY1A5dwCJoA0x0q3AOVkJZIe9iUF53MYCCiIRiz1ieDmUyGGmV1CS9YimlTgIVKHdq0CHC1F1O8zoDmIJbDoQ2CujOtgG%2F5UKU%2BPu4jZ408rRUPQ5ufurZGxu%2BsMGn%2FEiObifD3LpFbghtNYN9I5Dg8FXhrtOfx2yC3po%2BPMQ2GJG5X9Mw0GABvqKF80CHcmBlVLxukcrPTvTR7x%2Fe87orTcTNYYSCcDP1zm6TwLeHh3UcKGKnYMPiRdvTfB%2FtpaJUm%2FRpkYQ4hfcO%2B2GgVxRWsioclwfron2nV80cAHRVaufZ%2FVXGpbWk4Vmh56%2ByMcEZUd%2FxLj85wHJ8FJDj9TqZIYXAsncLPtNMLSAW2g1TnoJVgOKgX7wCiwiM%2FwBVS4mfCKzZ4DASc97DK4N5NR0E2yLZQYSGLJ3yJnI%2FJA%2BEF3XM5lvLwXh7TwXVKchbxULUEBzBzrIJg4BmipD3ktqA8jnyJyRLm0VXozF9I0Q8V7ytj6OQeFwYf2MgyrEep9Jfc5LAtVqgn6aVj5nqNoNvR9Nhn2Kg%2FAX8zUmG36Qj%2BNuEXW%2FJV1RvVzZwW1tx9y%2Fvq8bmj%2FK33vwt3FT1NexgjMyx5Og5A7ZkPub%2Fy3sDSr8idd9xKqU0CTLKEPe5S35SLDtQPtmarbTDGrtrOBjqkAV7GxG%2BVIUmDr3F7nrtdnCDJeYdqHgOdIqS2bN2rzVKZyEKSG84cfKZYW2iO1x4u6dhq6taCDPSRMZ6sPUYxBdmG1L119B2voFsDbgy19QtNuRAfZToj4yeuWVS1QmiCl%2Bf4DIFLVEXI0Z3stfhQ4iCw6eAvOEPx85mkvrmWtX2Nx%2FxoBACscfasNeTx2NaEGvkv1%2B26ecUqnIuXo%2FjoLEc8fylt&X-Amz-Signature=463a39e850ecf6c8a5dab9239f5e63dc31a9e9743a3c3747b4431a951384e71d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THLKJ6GU%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJIMEYCIQDnlwBGg82cKeujVk6%2F7pPf81DEXE%2BoeqKliVcJ1urIdgIhAK3AiVZja6EdJctjt2DLKkUM5GTiOxWPCzr%2F8PF4KM8rKv8DCAMQABoMNjM3NDIzMTgzODA1IgxdP07xPSKyXfvQSIcq3APx%2B7lVKi%2Fkb8WxiZvyizLXeTD6zUWqdAcMQqSgGw8hrLteQIdgGWZCn3kLMguqrmYjExjGqXOEnzVNV1J0GOdlosy3dtsWx4WprzM2EM8tUJpyQmzQIsMr1X5GF1PJ2AYGxR1sQ5f3qSJ%2Bhxfu0KG%2FN4UN4%2BCjKZ0%2FigpcsZTsxeTQfTibYD2Uua0cYanp%2FGXKOE%2Fnht34X2Novi5A%2F6wg52SHTy6QMgNgYKzTaPo6uYZV5B5cAJ%2FqqVwBt3RZJSgMClvYi6mwqqB3NLpolESKrbW29WxqdQsQHbzXhtGDlIOGOJA%2FEDcSIl2CepM9W2pnBLdXe2hOZRmEDdlAg1BWiVLzcJ7xRxj%2BZLph7nlPT%2BlRBpYicZOMt2CmAYDKdaeK6oS%2FUmcpd5Miv1rHq%2FnN4laCX7iaCw1wxi87PIduujAmUC251xiWJUtCqGTzDfx58EZWdyECZ%2FNYfw3ISA3FRYdM%2Fel9bexoVBwe9ZSRb87NjZR47ON9RHCxRChLp9E5gSrO1JMzjB6y8AEcIMDSqztNzPjxEKeOWcU7xVZhcJnjUQ0bSpd2CekHzLU0uc12G6aTZaSQE%2BH9TgTrnjyWMgU0LgegwwUvRD7v0J8KlCQ7EuEeuLheA45UMjD9rdrOBjqkAYipr0qKWs%2BiaZedE7rJ7GoTzqYT%2FcMXeu5IrnEb2RAhSXcAvR7fxx%2Bv4GDlkizwPRV%2Fu8cDuyxkmMd254A4GsQbPfRAQna%2BDO1H8H7wyt3Lt%2FW7IKBLNyJ2Xvm6EEGIRXJ%2FIF1ylb8TLcXw%2F5V0jBTIK4VWHqWXkF0otsB9sMgt7Vl8eQHBohUAARny7awVjXvotqYK1Yi3kmsdqQAsiWhuqFtQ&X-Amz-Signature=1e4eac85fdb588dec945da29b029bf74d2e7b9e8d0fd0565b928dd738ef04895&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTJ3XDTZ%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCIA5J%2Bm6gKs53iyb47NAhxO0NMNGbKPbweEu4joOYGQzfAiEAtS98VW1vAPSxmkfeu1l86XzOHxSxXD8DG092HWDlNSkq%2FwMIAxAAGgw2Mzc0MjMxODM4MDUiDJIQY60BZveJ0WOGtCrcA5lOE5vrcfpT4oidcSkjwFKxc0xXN9ug9hlIGhHAg5u9t9%2FsX04tP0Xq7yHEsLXcQ1R2RjqellfPGV8q0fDCTxZM7Of1WA06GamQx%2FETrWYGsKucEaZyDn%2BOxhNVkfDn81wUXy0PN58AwJ8JFtsPU2PYhyXbK3PGt%2Fuu3GD%2FPKKSmu4bBRhitxtX%2FevjqfsfFtt0kUmvQmCA%2FOxuH%2BvY2IrnRhuDg1HeXXY0vM2gmrsPyCBjrRKXo%2BwFZ4RExDN3BiedoDMeO9NObn6vG%2B1LRQYuSXv54XOA5%2FLck4ABPwfjqOdFbmd5eTwkPBzUL0E%2BgL5Fof4SPPKh564eqN9nsF8eMu4%2FngIL9pTZXOAt3Tzw%2FUJCCOdXX0upNWbrdCj2auXB%2FfPAPSQlVrtGXEyWkTaKp4P%2FFb83oUUS2UQR1BosbiuoyxJLW8oR3HoNjTGIfp0cdQKdQ0ARC7hH%2BW1bEWriATaSz8bzbxwMfzg%2Bk9fmrrOYS8UOVzetZu3KiFT3locNL5viGbrhlzmfTfuANjiWEtRXaYLvyCaXCzLz5eb7H%2F9NoIdR5mqfHfiBdUExV0DEXjRuVhTNA4x1iMHGXHjnJGj8u0N2WC%2FMCHfh54kqWgOYlFjIV%2BTL2Pa1MKas2s4GOqUBWGtkSa4PPNpmJ2xZwHGRfj2ZqrcaFfe8cm62fDE%2BHj%2FrOOSTb6WAx59aM4CtnA3lgl4YChsil0uH9o5Fb3N0YxTtET4RpTxC7WBUxoo69VG7eUJreABX3iiy3zSnJGUfEpq1EsQOAXhiyf%2FoEeWj6hnEswWBWios6jScLJST1nQzNlsEqz2c84bSQqhEK%2Be58SXy5l54KVlTgWo0x1r%2BI%2Bz8trNM&X-Amz-Signature=5f27804cc067fdcecc026d4afb5a79e734f3f0fcbd86bc07e404748f33b9118e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXW7PM5C%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCIEJJdcKZwmWFygNGfYiZneLiLQi89JdXlRBri7GlfCIWAiEAlnhpGghJP5tfhYNgFjYPGjmLb4A42H%2F5Pnb4mOGD7HIq%2FwMIAxAAGgw2Mzc0MjMxODM4MDUiDO%2Fzq%2BB8kwcUTo5CXyrcA%2FWo0omFaxet1xpa8ErXUKMfOHLO74jVrMtBulSRZp8mZdh51PVV9BaPZ3lMU16qfVAB67LpBeUV%2FDGEo48pbd3UNCjgCvr3NfRYRksCoYjZRLKqbC6YBYRkUxWnGDOAhfNOY%2BXO3vL2sBZiyKedJV0FDjw9cmMUDr0H7iIP6Xc2hIJu2AryogHjxK0LkzHjAdez7Mw6BcvNd5U1KwtyyiU3JnBg4DhhlywX1Flf8rpp%2FiqPJQQCWisj7DGV2b%2BywcYn9ktqxyysqkFP73Fw27p9ZDSGZ6LQdt9dJQ03m5kbR9FRqIMq8Gon9Jad0Pv%2BgobneG79yOy3wIDPxWeyMh2XI3%2FSUs8R0hNGmJ9twjw3UHpFVqciUtbD2qzROMaxM5PZPZ%2FV1pzueeFODmO1aFdx%2BgqF0F2LBw9q3BMFsyyK8VNIB27vTnxULIZI29pBxla0b3%2B6PrmO62DITUIIrPF2qwFFcm8dvpJH1eEYD6yLjigvcgKEtQHC5nQYzIs4EAhTxPXv8Ul%2F63j1LD5x2hZfNmOv%2FpkKjzQKWhbqiVBaiZVCsGFpJzbELffcOLEgk7wc4HjcQYsS55LCENqLdtPznOxn8niOvIGY3Uu6JZTsyWjs15W6iGV9HuyrMMas2s4GOqUB0nH%2BDQ4aWm3EwGxZ4G2Xr1jkKmRGYsSQOIxK6%2B%2B3TiXTgEj0%2B%2Fpi4XLEdfblvlUiI3ZDMyXF9ecv1q%2FONbwGtt8BPKTXcLG%2FV7vQzwH%2B5VXYX79dEItnjPKqZ%2BFDQbEsMg0tPhRNoDKcnOxb0xxkNJWrQ8d%2FjeK6Y2PF0SZXIc89%2BOAMj%2F8DM7c39guKkv31JZfbz29INiRrGSn8UlThAYoQrOdl&X-Amz-Signature=9347255bd0daab3b05239b8efbf644906bcb1f8b9bcb75649a72ec44d63a89ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNEDB4BH%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185719Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCIQCDIDRfA%2B6kEw8VRUBADTRe2whLzjRFUBCjMPBDP2NgvAIgc6l3DvYSXtWRWUEQcdXWByW0QIjtCod2LHeXNtCMgg0q%2FwMIAxAAGgw2Mzc0MjMxODM4MDUiDDIsSFpPfE2PPZg7dCrcAx2ExnB2NVm3GHQ8V83QcCMloX0A3NcDg%2FVtgNTVvRRrfmMlORr2xA5fzNKZkBQGNmaQqMeEXtvOb7THgAzmfYeMT%2Fvaw7SsYaGfOQZgNZ8R6sQSatLIN%2FyErepnXq%2FEa5PPm30%2FeuVyICTBGU%2Bs2eGSfnTFLAMFtwVk8KgVVB0fsOzn1ZZgr1uXy6jvhluKwT26JmFmmB8XQ5qsqn%2BM4xoPYn%2B9KpaCix6p82rDv2V3F0gC3kySK7723WBmeexc3c3HPny5kqd8MbUjoj%2Frq0%2B1%2FCHe6lgRtDK91H9ABvbBGIpIVLBYhO%2B%2BvpcnSOm62cgXIaTfyIWQD6EVppPsQCQw21a7EBYZJbqq1kXXxQxwfBntJR7%2BXsHzzvB%2B49N8mfFkbAYQk4M3RJCAAvhfi1WhkAxoZZOFbVKMPSn1kQS%2FxwcIh%2FFWwPdqMb4Msm670RuYOm6AnOzUbJOrGIfnVy5uAaOt1U%2FkJ0P7Xw%2F0keKwugEfevDN6bhCl5GaF3DP6qi0aL5ur1EnKwdAq%2BTzIXbTbRNVSsFytQADeI1U0cxuIuTh6YyWQPBf8V3NkG0GaunwOw07pRX4h65EF%2BJx9MIjE%2FQpVXYRIdLe9MdWARaX9QabAwHNoXu8yeN%2FMMir2s4GOqUBSS50Wv02P%2FiC5PiYeqrOg%2F%2FuRW5%2B8jsa5XJlAEsoBDv09pdHcbVuwojtZ2Jyrc0P%2B%2BK0T12JMnu7gJyXxCB%2F30A2XFzVBZT0zBPFxa%2FwQlNRKWtuTZAJzaJ4hkH5l0Fl51wCEa2c0Exw7kumXzk8GvJ9z73FuBkPnF2YKs4%2FTTPN6Qk%2BsWeKltFkmW%2F4spLgLAzcMKEugjTY%2BC3VneHHgV7U3FpI&X-Amz-Signature=a5942a8cf9aacd316fa91e7538d28790561701ce1d029b33d19c561acc30ac81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNEDB4BH%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185719Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCIQCDIDRfA%2B6kEw8VRUBADTRe2whLzjRFUBCjMPBDP2NgvAIgc6l3DvYSXtWRWUEQcdXWByW0QIjtCod2LHeXNtCMgg0q%2FwMIAxAAGgw2Mzc0MjMxODM4MDUiDDIsSFpPfE2PPZg7dCrcAx2ExnB2NVm3GHQ8V83QcCMloX0A3NcDg%2FVtgNTVvRRrfmMlORr2xA5fzNKZkBQGNmaQqMeEXtvOb7THgAzmfYeMT%2Fvaw7SsYaGfOQZgNZ8R6sQSatLIN%2FyErepnXq%2FEa5PPm30%2FeuVyICTBGU%2Bs2eGSfnTFLAMFtwVk8KgVVB0fsOzn1ZZgr1uXy6jvhluKwT26JmFmmB8XQ5qsqn%2BM4xoPYn%2B9KpaCix6p82rDv2V3F0gC3kySK7723WBmeexc3c3HPny5kqd8MbUjoj%2Frq0%2B1%2FCHe6lgRtDK91H9ABvbBGIpIVLBYhO%2B%2BvpcnSOm62cgXIaTfyIWQD6EVppPsQCQw21a7EBYZJbqq1kXXxQxwfBntJR7%2BXsHzzvB%2B49N8mfFkbAYQk4M3RJCAAvhfi1WhkAxoZZOFbVKMPSn1kQS%2FxwcIh%2FFWwPdqMb4Msm670RuYOm6AnOzUbJOrGIfnVy5uAaOt1U%2FkJ0P7Xw%2F0keKwugEfevDN6bhCl5GaF3DP6qi0aL5ur1EnKwdAq%2BTzIXbTbRNVSsFytQADeI1U0cxuIuTh6YyWQPBf8V3NkG0GaunwOw07pRX4h65EF%2BJx9MIjE%2FQpVXYRIdLe9MdWARaX9QabAwHNoXu8yeN%2FMMir2s4GOqUBSS50Wv02P%2FiC5PiYeqrOg%2F%2FuRW5%2B8jsa5XJlAEsoBDv09pdHcbVuwojtZ2Jyrc0P%2B%2BK0T12JMnu7gJyXxCB%2F30A2XFzVBZT0zBPFxa%2FwQlNRKWtuTZAJzaJ4hkH5l0Fl51wCEa2c0Exw7kumXzk8GvJ9z73FuBkPnF2YKs4%2FTTPN6Qk%2BsWeKltFkmW%2F4spLgLAzcMKEugjTY%2BC3VneHHgV7U3FpI&X-Amz-Signature=38aaf5b87d132309817cbfa0b967ff1c3bd74b8d4f212a14a834b2163ec9cc61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFE26AEU%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCIGXKTkHe9hI%2FSsX%2F9wFqQHW7tKtjcnW0R581QP%2BHCU8CAiEA8IXSQVyjt3plKL3t5qkCi59Mu%2F6yTYqK3kcrOy3Znb4q%2FwMIAxAAGgw2Mzc0MjMxODM4MDUiDCLxFrxpwmMN1nrJeyrcAzN93Z%2F%2BJ%2BwEHqPpVMpr5JdEVMQA1LxpdXnt3DemgMs%2BI4tjvO69bYuzyaScAKMjCd8eqK%2FVwJ6Fkh6AE3V3e5RhVufXsOyY%2B0s94WeqWWCB9AYBePBnZ%2Bu4agB8gcrDyD16Yd0oEXzC%2FOnc%2B5OLd3wfATFIVRzGrDhyJwkDxp0LZyvN9LrAGEOzvaB6LElqacKJykeyDWgKjxQG9BsWGOUvHgTgT5bm2CyhQWIvGDH7LqkNEAeef060svnb7kci5GULYwX1QURjc%2FQsnM9oLy67GJNoVp8ltD%2F7e7cmK3d17Wt1%2BRuwGTsr7cdDEKA85hcGdHipdIMouO31bQiBvu7lluP8dH6PEY71GhCUST5qssL4TuB1zxItVynLTnQeKYGQMEKu1nMEp5cWqfSFOc6gyj9uUiCK%2Fop6pfQLRVVurJJTsFQXVZ3SUvvmIiNnJ1olE2RBA23uhX%2BU2ym6jTqNFJX7j8kqpyAwiN1Mf174ro2kSsXPxbnsLqbWKp5Zg3dzAvpL080oIcCAgLpGShs2XjDoqVlefj2tD4BlLM1RGB9DDbqkvbBFKJDOhTbIqbfwKLg3ma6Qlci929DbR7TwUkHaxUW54OL5CZRLN3C8qDdzhpjm45oXkp3XMMiu2s4GOqUBWgOkrWPxYH8ke5bYPJgBTJd64Ez3DcqNFdWf%2FOQ5StjgVSBI%2B9odXhlHU6tvkaSRWjcnG18FQ%2ByI3xQcnIU14YxOiNniUQIVX%2B4Kc2TnlsCuMaZZKKQGghjtlk6RJp%2FxOz6iR1v742prlD05eienA9f%2FokHlBA15Okv5QGKrOutg2wExyYhcEMpz9576bzZKwgYMGXEaVvsiipIVYwhPJfMTqbLW&X-Amz-Signature=a6a149b6b10c92e2f455965fcb6bdff60f2379b84e22c219026ca44df016f909&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLLXS4MM%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJIMEYCIQCHbDCtMGCGgE3YEhJNaSoc%2FkcTFmZ9NFdjHfxciougvgIhAIaqhTGeYy%2FHymbgT4g9G%2BWN7AHrxwE2FFvzk%2Fa0zd27Kv8DCAMQABoMNjM3NDIzMTgzODA1IgwltdfAgzOD3uKHJ6gq3AMsPR6y2tWIRZlLXPJF1i5OrzPL%2BFSkriwDztCllHItJDzd7%2FDm9vQKsOAGmeM%2F4YnJP7UryBAozcFIscWL2q%2FT%2BA2YXJ%2FY%2BesMxfvikxHsq%2B0dSXbfX4ms8DDZcse4XYIcZyP9LA3iQfpDIinRl7FhMN6iO81QPxCVv7a1AIt9yPyzX7iN394iGP65t%2BRaXi57yx4GiWO09GskpVOWNuq3VbN7A1TOUARmfz2laLvYDy5SA44xaZIKOJzJYfy95oMTQTbMXyblpUVSo7zNBgRYnUkSQDr2jV%2FeRPfkMPCSxdwv58VLA29u22S8Y5xm%2FtpUsUMn1zgiGR8l03McS7g1r5vb9zahVpz2sanvOM5hJ7wvN6s4rin60bysaoyh3SU8D5pA1GY2gV7zqVTBOxp0tkUkPMw8uAToFwC6EzGR2eIy%2FwQVKR%2FpBlAOIhZlHBoAQWkDUbQivPMXpAyxZ%2FNP35KYBpTQwPtuTFqbAkN1C5QvNUb4ZN0rl%2BBQsZAkjf6BxkaCvHvSDGEvtA54L1o7fzUNdmtmJgJP4lNnTyEUrla7O4phv6qRr5vxuWDasxYlROnCyDj644KwHFAePBFczfUtTMC3tYAG7IKmdYN1ezzhre5ISS8WKS%2FEcTD7rdrOBjqkAZa45Ajz5ny0opo7jQgQKOHhOgjjZlq5aL1gzbNXKEh%2F5hHgr4%2FtPaft5g2kGH14aFtr%2BNvA%2B%2BFheUnoKijL4WzJFoPXsgfBZoWOEArkZB3BpO4AKorqGR77wx9ksrwTwuGritSSEo4P1M9B8z8g3H8wdMGSu2ZYujO%2Bvvpy%2FgPZLNcvxlz3AnJxyxT4MQP2Gva3uwjrwwdNSeTtgoWNp3kPXAPJ&X-Amz-Signature=bde1d53397e5ab62f87d6f3e2c290453e2c47a93b4e66180c7db5f1aa593648f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLLXS4MM%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJIMEYCIQCHbDCtMGCGgE3YEhJNaSoc%2FkcTFmZ9NFdjHfxciougvgIhAIaqhTGeYy%2FHymbgT4g9G%2BWN7AHrxwE2FFvzk%2Fa0zd27Kv8DCAMQABoMNjM3NDIzMTgzODA1IgwltdfAgzOD3uKHJ6gq3AMsPR6y2tWIRZlLXPJF1i5OrzPL%2BFSkriwDztCllHItJDzd7%2FDm9vQKsOAGmeM%2F4YnJP7UryBAozcFIscWL2q%2FT%2BA2YXJ%2FY%2BesMxfvikxHsq%2B0dSXbfX4ms8DDZcse4XYIcZyP9LA3iQfpDIinRl7FhMN6iO81QPxCVv7a1AIt9yPyzX7iN394iGP65t%2BRaXi57yx4GiWO09GskpVOWNuq3VbN7A1TOUARmfz2laLvYDy5SA44xaZIKOJzJYfy95oMTQTbMXyblpUVSo7zNBgRYnUkSQDr2jV%2FeRPfkMPCSxdwv58VLA29u22S8Y5xm%2FtpUsUMn1zgiGR8l03McS7g1r5vb9zahVpz2sanvOM5hJ7wvN6s4rin60bysaoyh3SU8D5pA1GY2gV7zqVTBOxp0tkUkPMw8uAToFwC6EzGR2eIy%2FwQVKR%2FpBlAOIhZlHBoAQWkDUbQivPMXpAyxZ%2FNP35KYBpTQwPtuTFqbAkN1C5QvNUb4ZN0rl%2BBQsZAkjf6BxkaCvHvSDGEvtA54L1o7fzUNdmtmJgJP4lNnTyEUrla7O4phv6qRr5vxuWDasxYlROnCyDj644KwHFAePBFczfUtTMC3tYAG7IKmdYN1ezzhre5ISS8WKS%2FEcTD7rdrOBjqkAZa45Ajz5ny0opo7jQgQKOHhOgjjZlq5aL1gzbNXKEh%2F5hHgr4%2FtPaft5g2kGH14aFtr%2BNvA%2B%2BFheUnoKijL4WzJFoPXsgfBZoWOEArkZB3BpO4AKorqGR77wx9ksrwTwuGritSSEo4P1M9B8z8g3H8wdMGSu2ZYujO%2Bvvpy%2FgPZLNcvxlz3AnJxyxT4MQP2Gva3uwjrwwdNSeTtgoWNp3kPXAPJ&X-Amz-Signature=bde1d53397e5ab62f87d6f3e2c290453e2c47a93b4e66180c7db5f1aa593648f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SENJXO3%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T185722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJGMEQCIESF8dsFJwx5tmufUZeZmQKvKl1q0LvkJg0CNJOdf90iAiBEcWX0WYDdVUGIwa2JsAb19O8s8kfHTr1WzcaPgIGKWCr%2FAwgDEAAaDDYzNzQyMzE4MzgwNSIMW0HjK1WHNIUB%2BgQLKtwDia33oCw6Df5a82NvRWB8PYRCDYXN3KzXGWO8OwnYtWnkP6LqRJRahWkS0kTMWVfcRvsHktGtUP1hUaPZ9xMAdiuqOcmQwyZvwioWFf74nXmEO%2Bpu4bC33R%2FarjyWrFWgWoJfjXdkmXbbal4WTkIJsjO1e%2Br42oJmNBGNuVV9stn7GToIeWvBQbEd6O%2Ffd3g65mJ416hD0CxPoekuniNIYWJuA5B5ifUldMIOQvOYzTqYUxd08ajNcD7n283kY9SVoygU1rOhwm1wp0wDfFcUHV8bYgnuECH4REmKquIq06BQmTkl5xHom73VIW%2FSNTSfFxATyCILv0pKgf0KPjkfK4gSe7HCKwHL6YfMI101E7RZJbvu81Jl%2B8m6XdfVgUjYB6IzzGbQDC3xK4oqNRJc1Q87MWBwhMbsruhxBXydDm71m8w7pcFO19QBSPjaF6jl5y0Ux33La%2FhMEEN1TWtIylf0hNBTHcCFTptDSKSgHi%2FBHXqDLfSv9dkcixzTdOqEfFDDDjmCENJWTmLyatnjdiWyaYJFxuqvcy%2FMzwUFIWdxPKqs1GGK0jQV7QOFyMSkdGeqLnkqTOQAJNpcvOX%2F8dKUO9rWFkftWuTQvvjLDb%2BwDVVtOy7fTf0J4uwwxa7azgY6pgFMJCPkSU63sKsxvu9MWSSC4VADVieLMsFm6ETPnF1NjdlBKqBYF8Cec6k31ucK1Fuphceien%2FKEgHzewUYTQBO69sE48050cu8tlfAQoWNXBeEzFDLUKwZ6dK3fYbROriCHoHGOhIfJXX%2BrSH%2Ff%2BA9JLSZBGwudjQ%2B2w5kPrRlhg3WHiCx2FFm%2BuY7vJQa3aWQpltsuHT8HjjWgrOAqH%2BnCIAstGv4&X-Amz-Signature=d955f2f266baf010a18bba48f305e1d0eb176fcfd06acc5533c460fc9d12ef6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

