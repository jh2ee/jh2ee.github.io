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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SR3VHUTT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIH1G2apD9M1VL5K2iVYhQekk3WNbre%2FtSfn2P3qU1qoMAiAzapbMPynMfn99vVEWmsaR9Omz600jeJ8%2BB8PZ1PVctir%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMS%2BoyuS%2Fmy1mS8NnTKtwDpDOC4bCB7%2Ba1ml8P07bsUcfo5j11HHBV7uhxCnsAqs2Wl98uj%2BjfN9u%2Fpwi3gVhIlyzxE6hJNw69a%2BtaGqGoIfkCC4ywNbzqbnG9NQb47UIsFZsH5Ihyq1Vsqna4BTLER13u0X3CThIrwYiaNh%2BEbOp2zszJpfqoLIfYutfXVC05PjDHJ0QewTMFVLacSf8og%2Fm36FoqrM%2FkKi7t9aFHEVBciIM7%2BphTjCAH%2BWfuKpCqWYS4OjfVUNkVdFxjRyX6nFbckbMqFnEq0N0MJdGOrvUSPRM%2FReloVQZZg8W96lIBYXoQlZ19PCxkFJC9OAkGq6nwymPSzosRLSR7PuC0Myip3zEX36CQeMrACPz83qIuG7WK6acFK5QVegWGqJyrd2JfZ734xI0CfA%2Fl9m%2Buz5oRBNVnguLFFodyN0r4YvBuMLvcc5Zk9F3R%2BRsTNh1yjhOJdN3R7RgmQy1OIngF44MW3NllI2Re2Lwhd4sB24LGSrGLts6NqVKSb2OtUV9yO5SqRqKy5wtc8fFxOPPzh0CtijWSq9o3dhWmrR8FAVEzTtpE1nvsGEHmP2UY3lH2sVi4p%2FNlkBVDs%2BR9q0FF47%2BhCCTpMQEx4MnswFApZsYUNxV4q4ZRV5hinWQw2ay5zQY6pgGeqZC4GWwnGrbwT%2B0x5F6E6Dl3g4hZv7RBwk%2BkwaT865nNxi1E0UiLdNZxazku8M1mmpSkqPHuaMcOqN9s4o4%2FbXEDrS8MElfAeh4mIMfcCFtXjLcA9GxZkbR4OWOCDLoOMgUTfUfvXPOj7OG%2B8CyDgQA8lkxjWZ3wFQ%2BwA1HY9znaidSCv89vZTspXNE9%2BdCSAyNw2EwevQx0RbhLY0yCPjSL2s51&X-Amz-Signature=7bdcc44fa9aab898abca8e081ffcbadbcba7306d9ab71de8cd401c38bcd66c93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SR3VHUTT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIH1G2apD9M1VL5K2iVYhQekk3WNbre%2FtSfn2P3qU1qoMAiAzapbMPynMfn99vVEWmsaR9Omz600jeJ8%2BB8PZ1PVctir%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMS%2BoyuS%2Fmy1mS8NnTKtwDpDOC4bCB7%2Ba1ml8P07bsUcfo5j11HHBV7uhxCnsAqs2Wl98uj%2BjfN9u%2Fpwi3gVhIlyzxE6hJNw69a%2BtaGqGoIfkCC4ywNbzqbnG9NQb47UIsFZsH5Ihyq1Vsqna4BTLER13u0X3CThIrwYiaNh%2BEbOp2zszJpfqoLIfYutfXVC05PjDHJ0QewTMFVLacSf8og%2Fm36FoqrM%2FkKi7t9aFHEVBciIM7%2BphTjCAH%2BWfuKpCqWYS4OjfVUNkVdFxjRyX6nFbckbMqFnEq0N0MJdGOrvUSPRM%2FReloVQZZg8W96lIBYXoQlZ19PCxkFJC9OAkGq6nwymPSzosRLSR7PuC0Myip3zEX36CQeMrACPz83qIuG7WK6acFK5QVegWGqJyrd2JfZ734xI0CfA%2Fl9m%2Buz5oRBNVnguLFFodyN0r4YvBuMLvcc5Zk9F3R%2BRsTNh1yjhOJdN3R7RgmQy1OIngF44MW3NllI2Re2Lwhd4sB24LGSrGLts6NqVKSb2OtUV9yO5SqRqKy5wtc8fFxOPPzh0CtijWSq9o3dhWmrR8FAVEzTtpE1nvsGEHmP2UY3lH2sVi4p%2FNlkBVDs%2BR9q0FF47%2BhCCTpMQEx4MnswFApZsYUNxV4q4ZRV5hinWQw2ay5zQY6pgGeqZC4GWwnGrbwT%2B0x5F6E6Dl3g4hZv7RBwk%2BkwaT865nNxi1E0UiLdNZxazku8M1mmpSkqPHuaMcOqN9s4o4%2FbXEDrS8MElfAeh4mIMfcCFtXjLcA9GxZkbR4OWOCDLoOMgUTfUfvXPOj7OG%2B8CyDgQA8lkxjWZ3wFQ%2BwA1HY9znaidSCv89vZTspXNE9%2BdCSAyNw2EwevQx0RbhLY0yCPjSL2s51&X-Amz-Signature=7bdcc44fa9aab898abca8e081ffcbadbcba7306d9ab71de8cd401c38bcd66c93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GA4RD5N%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIBCCjqxtfMGD2b4Q1MlbV8gRQwFpLdreD%2BxkQmfEhHa2AiBpH9qWlVZX4pOujc5tqMMVgrFPHdB82wZv6qetg%2FUXnSr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMjovnrGTbOBYRutybKtwDZY1LjJx40HAJdaTP9e47bhBVTH3im3z3F3bYlyhC9OLW6gmTTcuPxfi9JE5dNaqYeQqHFwg0vMmbGaVyUGHTGdp0jiY9MLsGgg0Ewfp747ETrxNFSt84m6gU3FD6F5gCiM5rAt0Z8rEmX2EJ197sLA2Ff%2BE0KQlnye%2BNvoJ%2BJVqbBDdMMWKCtdCdA%2B7DQI%2B2GWZMszh%2Fqit7BHWVqO29JqJcyDCNpQVv9WDaMQ82da9ghOd9CAl7efFnHD4Y3q5FZdtOUYVKrxn8JpF01iEQdA84TywZ%2FxXNjrO55W4HWyPn7govrg5iOelGOTaTgMR3e3b6qVl%2BntrGDSuTv92SVtteKnwGwKsD2jtztp25nlbjmAP3uBjCxtQt69XcaI6rkLM4rDw4pKqoGSVMm0H9BLWJKRoJt%2Bloj18AuAzU%2BTjUfMd6lFsgoon7SLJeAohqAAkHkOUl%2FQwAyJQEV7%2BBZSQlWdPCgP2S3nkU84%2F4uFBq2QuXSXD%2BSHQAlYDKKrZEZ54b4GSdrELZOcNQ9L7lXvovJRqgh%2FNpjP2LFr%2FhhIc7QWy6VTk1MlRdyOxuerFX%2FJH2N0MWxOJY52A1X2aqL652OHu2hyCfolOk7KLRfeYZnd%2FuBc1QiGBN04Uwya25zQY6pgF4riyGuonLQ1jsjetMkgA8ONQ%2FpB8wQmDAB0VpE%2B0hL1KjJHumfNli06kSRYgAXPHVsJDGw6JDHRKLncwAkY22SZ1XGRyUQYSNgZTIUs1SKK%2F3sEEOf56ZsoKmERFvn21ZUOuOjoXAm4YWX2FWRGUCKllKgvZWSHSmFG9%2BmL%2Fhz2tN06Wb%2Bo5Yz0AY5HZmuLwh4GBxaZ6Id6WtxUScO2xQhRZ2g1fP&X-Amz-Signature=5a762a27d6375bf6f009df7df5e63c92b019644e113d4da758f10fca3ef326e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMCSKRJJ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJIMEYCIQCq4r5T8JlTug5icrmLqwzE0drx%2Fu6KLhO8Mr8IQyYhlQIhANDkSnpraC%2Fth05aKR0AQQStD6L6hGLk8BBzEAwPzJ%2FsKv8DCCYQABoMNjM3NDIzMTgzODA1IgxJ7pdZ0EY%2FfMl7Xy4q3ANljhQ%2FIteLj1t4GfqclM%2FxVLX%2BPzJCds%2F4J90bnf1V3feRkU7kUXnBfi4GIIQrJhEpCkzhDxEifbDeWH70%2BEhxObP613KyPYd4Y1SDxNGRcZhlTB4i5vL1JcGexPnGLbPGSkEkXTx%2F0bfrXwGQktajRwehNKXn6YOPsZgNjorLELYX4ub38oAFVvK6FsKkWDoczG8x9bWV1BNvHASZTYByMEK5IjxAHHLsn1iw272I3UB0TWWp5IW8joo1UpX%2Fo9cq1NuUkSVHAWhhg7V3EYOknUawr5uUQWJV3fIoqCncRUCjROPX0uEJYTEyYVUJ1scdmiSItla073dSHCOme8gt%2FKwB9SIbfrGfvBtIE4%2BKWqUC3SDkcl8HpiRUhyPo%2F9wnbvr0w0JQmkKdUKwt7V6l0WcAZy9Fcvl%2FWGDxu%2FIAMUjOYD%2B2Lg7QBIFd%2FnAf5nTCnz110awRI%2B6aGeHeq6SEeTAJTi7ALkYS0I65Fq16fcp0cQt%2FE4sxEkc5lx0W%2B9QzYQfQg5WxGFtyeFMDS3z%2B9Kp3W7APSaFCMEVgO5%2BbaJxAQoLOjfNh%2FI1MoTcNj2C3CnTyy2KFqDz0Vv70n3RABexVNyzQGAWB8TSRtRwMWsQ6eXYCzM8zN0R%2FMDCtrLnNBjqkAd%2BWNAECuUbDE%2FxBmiiXAaV5onvJz%2F9XfA86RMxM9XA8UPUWymohF0yTPVUeYHTMzhtmO0cHRBoS3ErwR7J1zWtE0DQAJHHvTux%2Brwba5X33HXoYTaBLS25hfI0AuyNRAxhYo5KaPwnni2TqQo7Vh073lzwS0OR3i4kjD8xr7ROozIlK4VgRacs%2BA%2F9qVrFeoKEO1g60XlxTybryBS19ZyaH5ook&X-Amz-Signature=0867a264c806d7da64a3949f9bbba9c4d846899a0e564be943dc71cb222bb09d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMCSKRJJ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJIMEYCIQCq4r5T8JlTug5icrmLqwzE0drx%2Fu6KLhO8Mr8IQyYhlQIhANDkSnpraC%2Fth05aKR0AQQStD6L6hGLk8BBzEAwPzJ%2FsKv8DCCYQABoMNjM3NDIzMTgzODA1IgxJ7pdZ0EY%2FfMl7Xy4q3ANljhQ%2FIteLj1t4GfqclM%2FxVLX%2BPzJCds%2F4J90bnf1V3feRkU7kUXnBfi4GIIQrJhEpCkzhDxEifbDeWH70%2BEhxObP613KyPYd4Y1SDxNGRcZhlTB4i5vL1JcGexPnGLbPGSkEkXTx%2F0bfrXwGQktajRwehNKXn6YOPsZgNjorLELYX4ub38oAFVvK6FsKkWDoczG8x9bWV1BNvHASZTYByMEK5IjxAHHLsn1iw272I3UB0TWWp5IW8joo1UpX%2Fo9cq1NuUkSVHAWhhg7V3EYOknUawr5uUQWJV3fIoqCncRUCjROPX0uEJYTEyYVUJ1scdmiSItla073dSHCOme8gt%2FKwB9SIbfrGfvBtIE4%2BKWqUC3SDkcl8HpiRUhyPo%2F9wnbvr0w0JQmkKdUKwt7V6l0WcAZy9Fcvl%2FWGDxu%2FIAMUjOYD%2B2Lg7QBIFd%2FnAf5nTCnz110awRI%2B6aGeHeq6SEeTAJTi7ALkYS0I65Fq16fcp0cQt%2FE4sxEkc5lx0W%2B9QzYQfQg5WxGFtyeFMDS3z%2B9Kp3W7APSaFCMEVgO5%2BbaJxAQoLOjfNh%2FI1MoTcNj2C3CnTyy2KFqDz0Vv70n3RABexVNyzQGAWB8TSRtRwMWsQ6eXYCzM8zN0R%2FMDCtrLnNBjqkAd%2BWNAECuUbDE%2FxBmiiXAaV5onvJz%2F9XfA86RMxM9XA8UPUWymohF0yTPVUeYHTMzhtmO0cHRBoS3ErwR7J1zWtE0DQAJHHvTux%2Brwba5X33HXoYTaBLS25hfI0AuyNRAxhYo5KaPwnni2TqQo7Vh073lzwS0OR3i4kjD8xr7ROozIlK4VgRacs%2BA%2F9qVrFeoKEO1g60XlxTybryBS19ZyaH5ook&X-Amz-Signature=fcdaa53a923840d39369a9b5c348e2837ce18d7aca28e87bfcfa4863c58944c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QPM5YNU%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIQCiyfw8BMSSjjYPNvI4d0CBJNAJ7KqwEJT4UTLMDjVsmQIgZU7og9zWX8NiOyJHGvPkOC42TlKBTEgCaQDyPVCOyYQq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDHvpCyz9IS1gHDleZCrcAzgnOPF3IFL0yT7l%2FFg7dp8%2F87jzJgw1ZXGnuOKVOSzQwC1JhvhAJkAbfzfBVBwQileLdtQsxUbyrcFAJ9GWlauRRmLpZFAAaDSZHbafS%2F7s5%2BGgci4dI4deDyEJXOFrlkNnguf%2FEh%2F8GOwMQ7zypYCUTypntNtAbcrj6xDazSxAsI4G91nbHxLwk%2FV40CoeUicDcJVTxAajkU4Ze3t2Pyu9gwbjJt08y%2BLkEZuZyUqghmYho4uQ%2FdjQO71%2BwEd5C4z76YNvFZHCAZCwi%2BNdg4b8eEbyNcy3copd4LNZbl5WT8nd79b1h4aqwY%2BggYuRJcrG9CiT37guMzJN6emq1h3wIeqQi4tS7KmB0VuJMvzk6CB%2FPC%2FKLU0W%2FKcbNe8pN8AOSlnXB4zkuS4SmyEYft36ZJxB8z%2FCP4i%2BjY0J13wBM4Q8ew%2Bvi84KZMopOik7wAy6zaRkguZTbucIl10TjrNsjgEZtoD%2Fmh%2FTtRTtmcwAGUUd%2FuGGWpH1hLjWQ2w7K7EeM1prMol4cKRVSVuL6EMyCNXVUWXYaG%2BaD3Xp5V7dthsENAx13aQ2uta5xSoJz5LCZm%2Fek%2Ffvqkc4I1UwL6vBtOwTiHRuJp7U9BCQkkhQlOIg92tdBAXLlqA4MNutuc0GOqUBgx0RqDsicjNmFnNfMAFejL6avvziL%2B6HKXFDRfCRwTzjhcLNp5QiIq%2BTGDnP%2Bh2Yve2bposUwXmYM7CjgzFES6bphYyr3z7fLvliPIqRGu2xS7sk%2FZ882zpQmPetfL5CnhoOltintHYVXeJ2QvVT9tNuOGmZeAkFuYOa1reN247wSnIcCcU3sZIAbBZnQqDDnQ%2BJmGdezvW4tIGCCI1uHW3f6nNy&X-Amz-Signature=416278869e94722be802cd87593e5b034ec00bd0eb691bcfb2d7d3e35ac62092&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6LCGDIX%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIEFvk2BZH8XtXGPHR0zdn5ec8aFh8TqID1nQrPsS8qCeAiAn%2BxrFGz6MRCOyPAX5hQxhn6CqlL2XXpgvjRs%2BGazbhyr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMjmFIumuEh63idwTBKtwDFbSI0pdsFKpQ7oi%2FVZhd58yvynsYh3Z8ulniwVjYXhq6xpGZQVWjmbSdlGhnoVbjigxacc2AcO2WyThXk1SqtE0P70P%2BawQPX9oKvUlPDHyNU1AoZqiSYraRRg2VtsdyLxcl0wpf8rQ1yA7kC1%2FkZ5ytleqYB7Q5JUaORw%2FmTjxT%2FxN0CLehd3CPB6oSfk2LgBUCsatQy8enaujlNkGGMNF2WUysudGI5pn77gwWS%2FfHtiOufvKr2fG4osN7wMvna7PogXAFOAda7Pd5rXuZxC%2FWViLKN9VWYPbBB2t1LmRr2OQ7k6OB3jF2A1RvOG52JoMP07rWLYMMP25KpXB1lXIX6QFRsibRDaVjQXRvFta7ovRGz%2FRI4aUZ5u5vleSCqTuIDJGbcSGuEoDQqM350CHfehFVvawSdhsoKXxFkb%2BeMeHfIuoj8cN9fGhy%2BbcoG9QpOlUaqVPcr0%2F4UjzVfa3Q3pWvRbHgk86Z2h1nQMM1OXOuLyt9M0H7SOlzxov1LRqTABcWnTPoykb4Za8H8zt%2BXkdKhElulQBIivAwgvRyltGPAWNOGz4PmbidKAoAUOA5ASLIAiO5EGw%2F4xP87FPL459zKfJ1hCUL%2FzT5auQgnYDhralXfDNIuYUw59e5zQY6pgEKNsEw0e7j%2BZIgLEUG9DFUmgxcxuZwGq%2FCk0HUrx9uxrdJplQeSkjbBnpjURJhb8YB6mL2%2Bpmsr2i0HEGRcZKmCtHWWcPCMsx6FiZ%2FncDuyV0E%2BKkxbH5PILFR5B%2F8UtFHwHW7Z8Iw1sDNdmRACrSFKBA8GU4gjE9KYVNBBVedOQrQ88t4K0Je0GoEQlo4L8Nw7EcskRKdslWQVq0yL9Pb6oy5YPgz&X-Amz-Signature=1a5d1aa29db2c951e655f2e8a7de1559a0864aa13ef7d6865c2ca0b5f6af15f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRN3H7QT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQDmjCoLBumw97xwjvuLEW8Lg2e6Sl4YT5SQZDTycfVX8QIhAJHJrJXAm3AhvCRlLRsjxCtIlZMqb2u6bNAymttHlTURKv8DCCgQABoMNjM3NDIzMTgzODA1IgzNs9PncQGVTxsY0HUq3AN%2FjlMlWTx%2B9SxoEJNUuYZ3GrqfoZfLr86Xx7%2BubT%2BTLJPM2b4Qswcs%2FcBXZIAf6EcvZ3mkv7hRX%2Bze0KwQzmooaoCrgWiM0eOSyMFEQcfgKygsSwX4TZNbBLmlJLzzDkrJoHByArNiobPdE90Np6DbiVcLrMyy9KcveTjE5qMfQ7L4ULJ9WoIKyzTaw%2FPnumQ8mRROKi4AY7TY7MUidPc89AwocqAQDTknUvwVRwBsfP88vcWpKkfZc7q1NkvgFrtBehAr7WEJgAXc6bEva31S8pGNb2S8gJTxGhb0QLyGF3AXp6blA4dxCY34zpRyS5pbSoHfYIi%2BkXghsy8TCCLbLO5lU1TjxqgRDiAs3HENjVcbD%2FVR2XbnkFa2S2ef8IqzlQebxWVBHU02wmlr96yNZgTiKWSicg%2BDLBySJ8kr9Uudb5sZdSVa%2BWfkrv1ZBEaqokTpDjVIsBjun6OPjoT9M6augaEeduF8T%2FDGhgwlrpRKkHONZ3QG1gT%2FJ%2F1%2BlLqbfaFaS6exuTFt%2B9cPRsBl7ZEKIYnuYq3%2BiGhWteUbDDvoDwyH3Sd5aKDKHpGQWUjNh9VCMSxyfKtL0QL5P1REpSMBDyD8T3ni74XOUC3pT2bb9l5hfpVcWwMGxDC817nNBjqkAY6pCgrloQn4pKjlgAGkNkqjTV4IEBx94rwCAh%2F%2BLbFMyniBkCYHmiAnWtFJytuorlNUjqePCyfOY5e2hf%2FVs1HgR3x6sklCl9r77tZnJNbVMQ3eCYdqRyfNUZN8t%2BZdAmI7%2Bh1%2F66VbnhutggunERLfkrBQqz4uwptbWuKok%2F7kPwsOuhXm5ukxAgw5blC73B8P8H3vIvbjNbBPCdeWAfycFWg6&X-Amz-Signature=062c69ff9b68f82e703c84ae07161909d4fd3fa6cd395ba0d7a3d473b825b311&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZAEXMVR%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQCKdkL8eDvSTH6AD54npvzpAA522HXhSF%2F8mMEu6GJBbgIgI8Ws8utCqmCfttAlnkWKV7dp5kiqnTHl4C6DpwyLWhIq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDAD%2Bynqn4HrprXqeLCrcA5mfjAOaivKlWnytVe7RCD1tcHlkCQ1A%2F9AwGHpV3WH4ExbhUxhb6CXlcrxcdfvbhhaucFlC%2BxnGtUncOyhPTQZWmUzK5BR2Y%2BdEs77qKTURqjy991YuPWWSZ2T5%2BvsydkG3EfYemGJ0Fs8ZQLHSyqqz3Ee9k99GPD3KagZvOWAyXSgQbgAm%2F0Ioh9tz2rmFxG2y1UHflwF5l03SRwySLOuPZ7sG9cosf%2BLU6jhnU7Z4vCBMDPbwtQbMiUPTFZLl9flcSG4UKBqbxBMmtl6ySgKpRpk7zlf2%2FnsH6WKvYYeLHZFjOCxXyf2tFyVCV829hYZ8YP4ZuzUuz8KZGPIs7mnLB%2B1R%2BmG5xyfZwL4PNY9jCxUb5AT%2BMyEjF5n%2Ffu9du3MKbKFGYwqTDkDBQ%2Bptj4uyG4Ge%2BCQ9oOR9JCfhSE4SIBEpzUM37NlsSLA1DhAM%2BkEDTqTCL1St7Li%2BMY%2BQS8uoQ%2FXTFpeYuqfe8RSwhbzmTAdcIIk8%2FlDciP1DkIOMf0RrbMjbtDo%2B6BHshkvJ8V3hNpS9rDL%2BtPrTIwZB%2F6YUXZqQwAjdMXVXwqCxf0kXblOk9jK3%2FoNyMLE6Kni1ipcueD9rmj9NqxjToJn%2BP5INzYSNoehntrUFOdXdMMLWuc0GOqUBedctLfRrzUY1gqPten60NYkzaFIdVRVY1GqulOwg0A0WZQGGRF6HMS4LvRi6pnM6D7rkpx5b%2BenF1ID%2BBE7cGjvKSURFlnea8Jzt8woKuw3FByT8VgLatMHGEGLBaXX3xAKxaLugETH9CyMr0VHLL%2BG6FEzDqOSB2uqoBThwCx1Mza2RmXAQtBZDmOr%2BBzFImO%2FyOw9cMJmtIGELAvPnLZyz8M0z&X-Amz-Signature=b38aece61c9320ce72ee14ada670ffa3d57576be52e6adb253761b1c32e8433b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZAEXMVR%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQCKdkL8eDvSTH6AD54npvzpAA522HXhSF%2F8mMEu6GJBbgIgI8Ws8utCqmCfttAlnkWKV7dp5kiqnTHl4C6DpwyLWhIq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDAD%2Bynqn4HrprXqeLCrcA5mfjAOaivKlWnytVe7RCD1tcHlkCQ1A%2F9AwGHpV3WH4ExbhUxhb6CXlcrxcdfvbhhaucFlC%2BxnGtUncOyhPTQZWmUzK5BR2Y%2BdEs77qKTURqjy991YuPWWSZ2T5%2BvsydkG3EfYemGJ0Fs8ZQLHSyqqz3Ee9k99GPD3KagZvOWAyXSgQbgAm%2F0Ioh9tz2rmFxG2y1UHflwF5l03SRwySLOuPZ7sG9cosf%2BLU6jhnU7Z4vCBMDPbwtQbMiUPTFZLl9flcSG4UKBqbxBMmtl6ySgKpRpk7zlf2%2FnsH6WKvYYeLHZFjOCxXyf2tFyVCV829hYZ8YP4ZuzUuz8KZGPIs7mnLB%2B1R%2BmG5xyfZwL4PNY9jCxUb5AT%2BMyEjF5n%2Ffu9du3MKbKFGYwqTDkDBQ%2Bptj4uyG4Ge%2BCQ9oOR9JCfhSE4SIBEpzUM37NlsSLA1DhAM%2BkEDTqTCL1St7Li%2BMY%2BQS8uoQ%2FXTFpeYuqfe8RSwhbzmTAdcIIk8%2FlDciP1DkIOMf0RrbMjbtDo%2B6BHshkvJ8V3hNpS9rDL%2BtPrTIwZB%2F6YUXZqQwAjdMXVXwqCxf0kXblOk9jK3%2FoNyMLE6Kni1ipcueD9rmj9NqxjToJn%2BP5INzYSNoehntrUFOdXdMMLWuc0GOqUBedctLfRrzUY1gqPten60NYkzaFIdVRVY1GqulOwg0A0WZQGGRF6HMS4LvRi6pnM6D7rkpx5b%2BenF1ID%2BBE7cGjvKSURFlnea8Jzt8woKuw3FByT8VgLatMHGEGLBaXX3xAKxaLugETH9CyMr0VHLL%2BG6FEzDqOSB2uqoBThwCx1Mza2RmXAQtBZDmOr%2BBzFImO%2FyOw9cMJmtIGELAvPnLZyz8M0z&X-Amz-Signature=5733b606a02379953e70d5c63661c3c525f1f315e8c57eba5e14b71fe5433cc6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XDWN3P5%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQCCPb2u0py6wo06GqsDw162x8UwmQEUS8Kq6zYeTL23mAIgW04ZC0Lqp3pwVksbvEK0F3%2F5oMasgJJG%2BnaZnN6KXdIq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDHcgl8npLYgVENxJpCrcAw9yhRcHK%2FgR3dLB9INIgCf6Je%2FvSGFTCyDDfeScW8GK8wfWRFw0iZeCoyA29XhaWUMIfuv8o%2FHP6TTj783DYRM6E43IPHRmh0ovEuqs682sPeUw%2Fmts5uD2LLBIVjPKcnwaZCzxkliEnDn7wn06283JiYfxlp168oHZQ%2F0tVLisw6FZuzf2b%2B8VJQOWxncyvLcaAI0vtOxblEvWR53MZSC1%2BnRlC8BwO8AMB9alfEBH2KY8c9KkWCn7bV%2FXs6Qchon0XS6D3pEfmQXsiDhyi%2Bk6HC8nMxqzMuo%2BKCIv%2Bveh5M4YHOZ2EaWiM6DRGZTtG2IhcNutD8fEdrXZN86FYOE6d0iRgHWc0kukt0SU2OWK%2F3Fas6CmaylUYhBnrVOWDC8pOtpc9S%2FLpjE%2FmhoBwkXYj60ZOifb8FABScRPi%2FJmqdlYO83ywZaRiUeCpC9F3JU8zC8lB%2BW9RE5KAYelk9aKjZGx4lJQoZ71F6tJRgH4dhqgGQO2vApjW84bzF6%2BTE3xUF00dH8bKYi2eFdYfRYbQLwsflc7L3KaO%2B11c1Jp9kgELZ4SMJhPerigFe4HbaaUrgGgv9K0z8HNtfgLTSXVu%2BNtik%2BCQ9s6mtlPMwHWkGeiWvW%2FhWjBDVUFMOjXuc0GOqUBHBvtFGHhUQG69%2F6n6nlDIVekU2dj2T5pcYqjcWXS%2Fm%2F2AOnkzfdB6UDFwVJNwY2oS7brFuchRVO%2FYFWffX%2BF8K%2BfzzaUTXatO5kn85%2BxFp3XN1G06ftX40fNZ3cqUmtCS8Mf61zB41lJB4e5wQ07PYJs%2BbSoICFDxKyZ1s4GGMfvSPy1ozyzAXHU21pyQqxJG59RBMOa%2FsYloP34ccHNjBEBzwGQ&X-Amz-Signature=87adda7acc481cc049d7afa8de82e842e4f58090ca2f87e1d15fa58da0934aae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJU43NSF%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIQCxCMQMUeNSiC%2FE7Hd6MEw7F5WX%2FM0BgNBgRRJpxRX2agIgUMr1vZr7ojNETjG9iZwFlIPvd2J1YFXuAc%2BCBxoFo4Aq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDFQViBcNLYw7Ytu8tyrcA0eutRW5Ebr2zaawnqFhYacXo9A6FWX66w3y0yCI%2BwSsKFov2v1joyyL5qe3xlYC1EtTZH9X1PAHoPyWsFmNJlf4qgE7avfh525theHro%2BhU18AXXJddgjOdGIfl0Bjm1L1qc2zeBxlYVw3rKB5vG1zO6CkTF7L4CKYAiHr3NaZeOsan5eLngahz8wCE4LZdax0Zb4MxxevRn7HmqLEUf%2Bgd5JQ88aiIyD5ipQPLBSUgZj7OmcS3JRBru8YyTYlNKVLA976ynqVKY%2Ft1HsOm%2F%2BPybfRJfRlAie1iJpUt4HYapvWqXsSk%2Br7AlJOZNcUTaXedOZjTwjSQoU1UpmWDqD84%2F57W2T4yw4Gy6l0pHkSeQ4AbbhdicexjGGK3Royz0bfTu2cnxI4wjNj0i0wZSIZXMiL7BEUfHKkSETbKm6K%2B4%2FdTBkiK3Ykxv6u9ImysXMruMbiVu%2FTntMrpBbF%2BlFDOp3Yu8LA9UjoQ1d1k49v9E0Vb7tJl7b4BjOw97JgWPGGjMVTK3DOFywVSU3f8r2oiX86kczzPf7aT1pXXJBAwVUV8ZF%2FFpvLyK3xwTxp1h4v4kzD5EB5Ak8WUInr20PHl4YdqEP2iD1F%2FYQsAwzUut0RCnjQ0K%2BQnUvsUMICtuc0GOqUBYfpBOhiMQep%2B%2FbOR7kvPSwpdjzUbubmrKU5Dn2%2F%2BhOOZFJnk1zRgRthOtXmJI4J1tC2BX5uzU%2FHI7G9XrywFi7L3VrViElXWM4i6AVHtfSi0hQPqIQEvrFqN2L8Ybaz19gTQ2Kg7ZYUhLngjliYHXqvaM5c2pJH1zz6fEuy25R0LOSBZgX2S6km%2BQ03YWQl4a%2FHMGhEGl%2B6mCbUrx9L%2BRiCnpGQu&X-Amz-Signature=57008788e5ce6e108f912edf6b00546f1c841448eeb1c0653487b1eb30eb66b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJU43NSF%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIQCxCMQMUeNSiC%2FE7Hd6MEw7F5WX%2FM0BgNBgRRJpxRX2agIgUMr1vZr7ojNETjG9iZwFlIPvd2J1YFXuAc%2BCBxoFo4Aq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDFQViBcNLYw7Ytu8tyrcA0eutRW5Ebr2zaawnqFhYacXo9A6FWX66w3y0yCI%2BwSsKFov2v1joyyL5qe3xlYC1EtTZH9X1PAHoPyWsFmNJlf4qgE7avfh525theHro%2BhU18AXXJddgjOdGIfl0Bjm1L1qc2zeBxlYVw3rKB5vG1zO6CkTF7L4CKYAiHr3NaZeOsan5eLngahz8wCE4LZdax0Zb4MxxevRn7HmqLEUf%2Bgd5JQ88aiIyD5ipQPLBSUgZj7OmcS3JRBru8YyTYlNKVLA976ynqVKY%2Ft1HsOm%2F%2BPybfRJfRlAie1iJpUt4HYapvWqXsSk%2Br7AlJOZNcUTaXedOZjTwjSQoU1UpmWDqD84%2F57W2T4yw4Gy6l0pHkSeQ4AbbhdicexjGGK3Royz0bfTu2cnxI4wjNj0i0wZSIZXMiL7BEUfHKkSETbKm6K%2B4%2FdTBkiK3Ykxv6u9ImysXMruMbiVu%2FTntMrpBbF%2BlFDOp3Yu8LA9UjoQ1d1k49v9E0Vb7tJl7b4BjOw97JgWPGGjMVTK3DOFywVSU3f8r2oiX86kczzPf7aT1pXXJBAwVUV8ZF%2FFpvLyK3xwTxp1h4v4kzD5EB5Ak8WUInr20PHl4YdqEP2iD1F%2FYQsAwzUut0RCnjQ0K%2BQnUvsUMICtuc0GOqUBYfpBOhiMQep%2B%2FbOR7kvPSwpdjzUbubmrKU5Dn2%2F%2BhOOZFJnk1zRgRthOtXmJI4J1tC2BX5uzU%2FHI7G9XrywFi7L3VrViElXWM4i6AVHtfSi0hQPqIQEvrFqN2L8Ybaz19gTQ2Kg7ZYUhLngjliYHXqvaM5c2pJH1zz6fEuy25R0LOSBZgX2S6km%2BQ03YWQl4a%2FHMGhEGl%2B6mCbUrx9L%2BRiCnpGQu&X-Amz-Signature=57008788e5ce6e108f912edf6b00546f1c841448eeb1c0653487b1eb30eb66b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UENCKKFO%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T064423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIFklITOHgYzifXg4uZ9%2Fpq%2Fe5S8Mp5VoEmH1DBeipCvYAiARwr168kOCLgxz6wcZB7c71rrXNIr%2BgFUZJAsB28kYkCr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMBPU8uACPUsb%2FGkaBKtwDR%2BlnEl%2FxFL7DaO7WHID9Cgg7R1rMPLml1PbiFfwQY75EMUQmb6TCUbwpx6xJ58mKOSMPUt7lq%2BfoO99UP6re%2BETgpV8GPN4ADHM79Vpk0YhuyvXxLFTRtvIIsHxtR%2FnuE0UbKujYCgSBMFYbeH8TTSG3oi3HpPN8z1aZMU1h8jsUklEOyX%2Fa1BCyialM4cxuUofA9D8keEWuySEakYM2oXk5%2BX1Qm0AVw9iqgg0lO2nE9bbGTW%2F9oEXqrT0djFru6eL4Uvm2tsq4Z0xtCQYhqf%2F9SRuBIMcpse3YprNtaLazmUjwVpXVIC1LhM3Qd1tsGv8u3drqmk4k%2BOrSahhzmiSki6UX2zfZbrG8uMwpspZQswifBhf5tJW0lmteKZQA0qjrbPgt%2F07i2uk5wWFdvCdlddAoHP6ew3ilhBeNgdzQQf%2BWOuf68bH%2FtJ9iVHC1zVVKC19oYEK1eZrhcZycBgzxo5MksERDoewafVDBBTTpH0w3VSdhhJgUocxPtArJoJqQhG6QmxdsIMporrJsZT6oBkXfPmnjNvPKe4p8rnCezca%2FOFXxwjcOMLyOLQQBrYgZkUorZ02l4myejqKSnDfFdnqMFokUvH64oxuVt6mCkurKoSvFskeyXTkwgK25zQY6pgHKuW%2BVjauSmYYHFIxpMaN5V4U9A1oN1Eejsqgj2r1Hl5p5Eu093IgkhMPNNJxHcd0pVT%2BjFXBBLabjZ89jB%2Bcyb7tfZwI1KjjapoMzT%2BK16F6P%2FkmwT9W2KWnMJtdjRaQWLZJeSZgP9obUQY7jNsgWJHqgz3Wk%2Fk%2BE8bLm3ju2wYvDushgXHqGJnODXETVgCa7fUPr7PzFQ0oI%2B4wFste7YjyJryN8&X-Amz-Signature=222bef79cd543aeda69bf5eacb24fda49a5a345271ffb93303cad173ef23f91b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

