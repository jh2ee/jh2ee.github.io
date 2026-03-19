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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KP5FQGW%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQDA3CQ4FrfPCcUK5W5sPLwvu7RV8UWvPGDMahe4EKFCagIhAOcPKuBvAVLJh6XR8uJQEgb%2BNh07UtnVwJ6obpMhuPuYKv8DCBwQABoMNjM3NDIzMTgzODA1IgzaQgAWwn3FP0I3LbQq3AO1oibVoI8ZyIrLGUY96WiU6sAox25puEzsDR3enfkhPXdpPAdfnTy%2B9e4N0nlnRpIZkGnlMdsKwRG1%2B%2FaRp5vUh%2F2GlcDe5LYAMxZN4juUsKkCYWfWe%2F0m0o%2BPzheA2Wt84kBJ341C4TUd6Y1hKbVibiYoM2stDdarzxusgmA4zH786XB8HrW2xEiKxGRD31vI%2FmYByJuZohJ6KsRVkpND6tzQiyQgAost17pIi6psUEhL%2Bl4t0NSHy872DOZUSoJ4fQ8sXSb%2FwSSWHYk5kINBnFfons0w%2BmTeQo6VVw5z7uReCzxYKzqZdIDPsno7y%2BjEJBbRs2PAnEEzdxqIV3W9wbHjwyTDIc9pK2m%2BOKmmGjlwfgxF44W%2BvQjNNDu%2FZNunDWREfIrmJFSXotqL9X9syVLx6et4rCAPV9h4kBgagzYEVe%2FR2W7bKyqXejpNyPVft9tg6DfgvrXv851ngfsrRHg3ExcLzDFaMqf%2BfG%2BXrmYaQubAazowa8XPemnGrrSS2qM4%2FUt3a%2Fu5ifYRMBL4TFXT139%2BuDA%2FLEkwktpJL1nJVuBWOBmLy%2BeZaBF0pYDiYw9GUWG6IflwAPqRDaDH7goDqu5YmiBlwNNzVOVbDPmOmme5WjRs4SmVSzCXpO%2FNBjqkASYPbR8W1wfgTt4s3Cycx3lC8pFm8Nb%2Fdp%2F1lvQ9Irm1pZjH2Kd4SVT9htLFSh6o5EbIsbZlAL8jldkOOx5NqyyWdmj3wjKuXF5VtGRLx8thjqplJPzTYgfJycl08kR25ctXd2%2F1rUiNDRs1hvncY%2BGfdNFkT6QdVBDxGob9CK1t%2FZ8%2FkJdO0%2FvK6ru0vNA63W%2Fgzu3S0k3%2BapSZD%2BMR4KPACJHG&X-Amz-Signature=d07905afc7c88190ffdfe14376db61348a71aaa2f5a2abd9631110ac01ed65d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KP5FQGW%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQDA3CQ4FrfPCcUK5W5sPLwvu7RV8UWvPGDMahe4EKFCagIhAOcPKuBvAVLJh6XR8uJQEgb%2BNh07UtnVwJ6obpMhuPuYKv8DCBwQABoMNjM3NDIzMTgzODA1IgzaQgAWwn3FP0I3LbQq3AO1oibVoI8ZyIrLGUY96WiU6sAox25puEzsDR3enfkhPXdpPAdfnTy%2B9e4N0nlnRpIZkGnlMdsKwRG1%2B%2FaRp5vUh%2F2GlcDe5LYAMxZN4juUsKkCYWfWe%2F0m0o%2BPzheA2Wt84kBJ341C4TUd6Y1hKbVibiYoM2stDdarzxusgmA4zH786XB8HrW2xEiKxGRD31vI%2FmYByJuZohJ6KsRVkpND6tzQiyQgAost17pIi6psUEhL%2Bl4t0NSHy872DOZUSoJ4fQ8sXSb%2FwSSWHYk5kINBnFfons0w%2BmTeQo6VVw5z7uReCzxYKzqZdIDPsno7y%2BjEJBbRs2PAnEEzdxqIV3W9wbHjwyTDIc9pK2m%2BOKmmGjlwfgxF44W%2BvQjNNDu%2FZNunDWREfIrmJFSXotqL9X9syVLx6et4rCAPV9h4kBgagzYEVe%2FR2W7bKyqXejpNyPVft9tg6DfgvrXv851ngfsrRHg3ExcLzDFaMqf%2BfG%2BXrmYaQubAazowa8XPemnGrrSS2qM4%2FUt3a%2Fu5ifYRMBL4TFXT139%2BuDA%2FLEkwktpJL1nJVuBWOBmLy%2BeZaBF0pYDiYw9GUWG6IflwAPqRDaDH7goDqu5YmiBlwNNzVOVbDPmOmme5WjRs4SmVSzCXpO%2FNBjqkASYPbR8W1wfgTt4s3Cycx3lC8pFm8Nb%2Fdp%2F1lvQ9Irm1pZjH2Kd4SVT9htLFSh6o5EbIsbZlAL8jldkOOx5NqyyWdmj3wjKuXF5VtGRLx8thjqplJPzTYgfJycl08kR25ctXd2%2F1rUiNDRs1hvncY%2BGfdNFkT6QdVBDxGob9CK1t%2FZ8%2FkJdO0%2FvK6ru0vNA63W%2Fgzu3S0k3%2BapSZD%2BMR4KPACJHG&X-Amz-Signature=d07905afc7c88190ffdfe14376db61348a71aaa2f5a2abd9631110ac01ed65d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WR4ZFKHV%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIDzbUXDhurNdtapB0VAdZ2Qz5kaX5v%2FtgZZ9LRsFITdNAiEAut%2FXJ5xXgieLBEEuLIm%2FJ2RVnBUbtnVXd%2Fz92bVGhu4q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDDZ5xnKosKB5UgIfuCrcA78iNDqoeEqrv3MnevuZDOjDjhTTAgc758oY4XKDs%2Bw3v%2FpY0E7GJM19ko%2BlMcB1x0JnBubn0%2Be8vIB2exGJD%2FLWv0curWCOH0FIsRpJh34fPS76mqQdNOjmD9wxxR6DkoS0gsA9BoG5TtAN9OfjmSbmwWTsahSLkM4FYGDhknF2VvqF84Uqo80NUHnxmvy5PXjTPJTcWXHG9dJizB%2FkhBOONUMd6SmAl12QsdmQ3M4%2FozLiK2pvMcmH251ZriIl%2B8kFNWqjlaY6WZZJmFTjGdWc3wECVPM%2Byyzg1g%2BRcQVREELrIl%2FNlxaM%2Bu8lBK0Noi6HuCeHHJkSaW3HV6ubmywWYEpvGTo4Bpbqn5dOkQW8FZxWZRo4f2j4I5yFsRqlgjfDnzhGcuVwAnhYS1jHJfVpel9oZfcF9wLTTSQcsHLAsvWwkyFZoCizZwOAu%2FbuSkZ60LSB7UYLgeqpykhHeZqlQgzCY2RXqXuaSKZuWoo%2B7TB7duppdM7mzs7kAJifZvyHjs6SMVTCfmEpELNAnND6DgwmBbvy832nsl5%2B0wnTxSzuacAy0hlHfFyyE04fughkImJN3jIvpaxGWPclVBXer1cKl3shP8bBQB3VYG0LhYJ0YiUN6bfHXPO4MJak780GOqUBkfCrs4T1%2BnBM4JrE1MWwa%2FUMsLbgvsEI5pXcgXg2vpCDDuZ2lpwvl5Q9XI2SeK%2BwMLMfFHDoSYEjCrtneao2XsKhUoWTikQJx6l%2F02PzS%2FcLIFFBy5WsHdvGDXiSW1BOJQRO2h1RvosTO6P%2BwMLlBbXevM0%2FA7D9gBy2VDWcNkQCuG3P69jhZ1krI9P5mIp4GdyDTUR9NB7I3ngnaAPrqLTsw%2FVl&X-Amz-Signature=48af342272d233f87ae798a4ddf46f422d4f946f76b8403c3e3f7af940e652d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635FPM7RV%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQCvTq%2FkTBNZx4sLxEB9869TWqBRg6sLIF7iWsIia6VZ0wIgBZ9%2B9%2BWoDZM1HnaIPGHmLlnI6HJQj5gBTQ%2FOaqJrCJ0q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDCW4WzxXRM1KiiMOMyrcA6ifhA7%2F307iPqJ9RsUys7XBFNTIs4NtUE0sWOqQVmNSl3HUC0Q%2FA4sRKXmt5qzK%2B3jqwvofFtcP7vNco42xAcBYLxiVyGjTWOh7HhWNeqfPIQhtkBuyK%2BwlAcjXVV54XPKKAwk9Tx4C6S1ej%2FcY%2BtDpL5dOWqlFcHS1MAgNUSlrJu0rgJab9ZWiEonYHp2Cw6c7dQfoE4YTscpwwLKYglklhhe6%2B%2FQ2b7FvuKOD9HXCpmkMmeBLjTZ%2FlOhZmbVsVObeT8R4erO7iWEKwy6TV8Faa9VAOoF0zECFlNX1tpruy1MC%2FHn5WThyy9HAsxnBQ5CO995QznmdXpbLOG5u55MrZiWjEI9SQQLQyttkJ3uSWZHMquwCIn1d3G0giN%2FlVxHV2V%2BFE0NjwSjsnFFKylp5F7ZxcxqtQYWAhvcTLoAO0eMtBC9f8fWlGOU8U7BaXeJl3X52xZ0c6qHZI9exOosVEnsx%2FCWg2T4FUVAeY1F4LzBvJbwvXDGq7ZRkq1Qw4RyPIHvjrHXRl1omqnx7cX47JU6RQe6lXwtAy5j3JfWMhnZh7onvvyDnIUq4ozxjtnb%2F1mqkj8fFr8v2U3UcsSjEWT4pP5%2BAG3RbPr%2BXXGoIrhCeHCAmhSLFvNr5ML6k780GOqUBrEwh9Ks12FujcnjnTFHo7TDbhIXcirRPZm0ahGfIjwKLhTeYqzTvoL9j7j%2B6fZDcJbDKHbgn%2BiVKS8f8Q9I%2BJqiP8hfsBTFi8pGu%2FdYSqPhsGZRkc%2BUXVGCBBbuxAEao%2B37xMJ6nXG1JIR9TRIj7hxYyRBUuwoY8qEeh%2FIiElpQZjkZqYZmAc6mNh8GYD1XQrOp3451mMglFumEKW9R0kexdEyXU&X-Amz-Signature=e65c4752553ce324c83d3232e6639fdef7e7d6b5f260bb667cb717372e0eea5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635FPM7RV%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQCvTq%2FkTBNZx4sLxEB9869TWqBRg6sLIF7iWsIia6VZ0wIgBZ9%2B9%2BWoDZM1HnaIPGHmLlnI6HJQj5gBTQ%2FOaqJrCJ0q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDCW4WzxXRM1KiiMOMyrcA6ifhA7%2F307iPqJ9RsUys7XBFNTIs4NtUE0sWOqQVmNSl3HUC0Q%2FA4sRKXmt5qzK%2B3jqwvofFtcP7vNco42xAcBYLxiVyGjTWOh7HhWNeqfPIQhtkBuyK%2BwlAcjXVV54XPKKAwk9Tx4C6S1ej%2FcY%2BtDpL5dOWqlFcHS1MAgNUSlrJu0rgJab9ZWiEonYHp2Cw6c7dQfoE4YTscpwwLKYglklhhe6%2B%2FQ2b7FvuKOD9HXCpmkMmeBLjTZ%2FlOhZmbVsVObeT8R4erO7iWEKwy6TV8Faa9VAOoF0zECFlNX1tpruy1MC%2FHn5WThyy9HAsxnBQ5CO995QznmdXpbLOG5u55MrZiWjEI9SQQLQyttkJ3uSWZHMquwCIn1d3G0giN%2FlVxHV2V%2BFE0NjwSjsnFFKylp5F7ZxcxqtQYWAhvcTLoAO0eMtBC9f8fWlGOU8U7BaXeJl3X52xZ0c6qHZI9exOosVEnsx%2FCWg2T4FUVAeY1F4LzBvJbwvXDGq7ZRkq1Qw4RyPIHvjrHXRl1omqnx7cX47JU6RQe6lXwtAy5j3JfWMhnZh7onvvyDnIUq4ozxjtnb%2F1mqkj8fFr8v2U3UcsSjEWT4pP5%2BAG3RbPr%2BXXGoIrhCeHCAmhSLFvNr5ML6k780GOqUBrEwh9Ks12FujcnjnTFHo7TDbhIXcirRPZm0ahGfIjwKLhTeYqzTvoL9j7j%2B6fZDcJbDKHbgn%2BiVKS8f8Q9I%2BJqiP8hfsBTFi8pGu%2FdYSqPhsGZRkc%2BUXVGCBBbuxAEao%2B37xMJ6nXG1JIR9TRIj7hxYyRBUuwoY8qEeh%2FIiElpQZjkZqYZmAc6mNh8GYD1XQrOp3451mMglFumEKW9R0kexdEyXU&X-Amz-Signature=6cbbf6bd68814c4fe1bc8fabebb524fcac20567db2c7784b62d0bd5c9d601000&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTE7I5WE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIB35zaO2DJu7Mkek%2FjLZJwkMeaCiZIvbUL0GRIoDvRNEAiBeb0TjjLeq0WArqkLXM0Ry6euXGP4g%2F7JxEA%2Bmp%2BfXkSr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMuR%2BkOtwBeuqzOQFpKtwDWE6EssE8pgIkqRAiEEnoGRbtHOEbB1f0q0mxNp%2BsLugIyJ0s10vs2mjIhZn4u%2FwE5iuZQlg4JFrUhJ3ofQb5meHEd%2B36GwIU0Ic2vV%2BJZck356XRZAdBC%2BDL6RzzjGP3ldGwQd9OgcpuHjLkJ4CYIn%2B1QLNFEkpoLuGLH9PQr%2FVmUbJ0tlC9GQFxXt3ApQun4MumkQgl8KDVUpqd%2BxClmHgMRfwDTdOCBw7KdZMbIAI89xQd12s%2F48BwdiPcjsLLFIPSaW1xphcAFP%2Bmr6AiNMYju84qUDc3yFAFgyimFQOyLvdlP3hYvg3bj6M7c7bcu0wJntEU7yyjBg%2BL2vRrud0ZiXQffPCHEGJIUpWpWin5qg5w86%2BbqPf%2B8v8e5zgfMuwkZsMBeHbYTndJJ2LzrUMwCFKqYmbvU9H2ZQdm%2FxNzRXCxDa8c5l9EVZLptv5ydfWMzrWLEU11s866fv7XlPJwCz5Vm6EdS4pdyppGYI7%2FjvAroM72l50PRT8YFqi1YfWrEyt1TPRSc45Zpv0k4Wlb0blj7mnd%2FfkA%2Brg1NzV3Bv8az0yVUjZHehy8g50bA6PW9FtqftU%2F%2FopF7lFCSTSDqVj5p8wlRtzs%2FjGYaIpeKu9GAzHin%2F0DnGcwzKXvzQY6pgENf1uPabBUMhpKUqtevSrOMu89Gvh3Cz7lSb1iGpe7bWBhtV1PQ13Gk9S7r%2BRJclXgSJYTwfNdwiVZuudepXzOsWAGKxvyvYf0diqBtl8IDe2T2tl5N6tJXk%2FNoT7zItdIOvIockzMqL%2BMeEGBXPIXrjDDmk9JBjHs7EHjcqWs9hu7OWNyFba0Y%2Bg025jA%2F9Dd9DHKghqkdXK7RKbK2nrIt82oB%2Bq2&X-Amz-Signature=b5637ba922b342a37803ad223c963968ebc5f2921d335ddc8fb3e4ce5a5f0034&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7CYAUIC%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQCIiyTSn7mzuUvpXNIqa9A9k4njF5m8Zm5Knf2c%2FbBs4AIgbxT7QHcLPR%2FiJ3rkaZM8LarOSxNhqVpMeu9XMHXEQi8q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDIcCfCJpVcgIUuD2ISrcAxcsdaHICXMP704fgVao66C1ZmyeiMAXLuKH4FVqwcDbkD3WxsKG3Sh%2B6dJt0FTIqMDVM2mM1JE5FQaoVMWTcfMZMMEFvSqj2HZV5t3YTUUMgGzE%2FibT1suVbp9eDy9k4tYDl8j4At2YTR1REo0QmLVmVj7RafCkUDvuM7Z15XC92%2BOz8IdWlvYWQrjdRT20pydzKQfO8DaWd3Yspv7O5xWA0iVwXt435xSnsbuu6OXF1Uw8zdMziDXxFC8q%2BT3B4%2BYms47IJJBMKPrNJwSIj%2FLOK8WDDj0y2gcZE8KQJeUtI0ZQRNywaP1IB4Z6KsLjf5nZCOin3ovBnfAHsVcNuXvLkumHy1r8NF0jEY4FbvvL%2B8wW9z7AL3BbimuTL%2BWu2K5it1yLg5kgVgqcJ4Nze8bNRZXmI1qZ8%2BThet%2BaCPtainYm5JyUMoGG4A7awBckGOTZ4h8FbmomZ1SALBi7a3gXw3dZWKsv1yCD1CbP0rOcrd%2FNVuKuKRn0pCT6K6LtJ8nG8EuMjSM6eFvgJA5wZPKPKdcSkew68eQPgWnRoQniixAlwMgbIRnX0WcSZvqnBNYdf%2BAZgYqkWViZXaa7uQADFSHJYaWD4HUkFMWQwrzxltHiraUhECOwcqshMNCl780GOqUBBwUwZ8x%2FTNZJ61cyuZJyc165x7BazWWNCCtdQ%2FlBFt4Uf0Mi4lv3%2FURyQ4hzP%2BnGmP%2FSTzTCdsdfGTbczv8SBaD%2FjGqslWArSiC217SSqIkM4zMfpU9FvLAciDSZTRXzYQiTLQ4Tu03%2BjN3lsK9R2PnJ03JtW4n3jDb5s6iE2EFmdlZk95HlQ1%2BvynyubvzzE9ZumjR1%2FjbK62EBsR6zdW6PGNlK&X-Amz-Signature=d7db62aa9bcb49218bc85d664b9ceb0166ce1352ad6152e7c26316bffeff9788&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663S4BKOLE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIGICkMZxV%2BMUFRLLZgxTmlvG6DL6nqI%2BQdF1%2F6ZNx91tAiEAvLlavaKwyOA7mWQ%2BtAweULRB64QvdX%2BtCtYCuVf73sYq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDMBsTjp%2FVgPIi5q4sSrcA6HP9El4LMbw05tJ92dmmIqAqyyoFCPG2Tv0YyKpRMN5oeqDbLG1IU2uVj9T4iqoK7OUvCu31JDDiDBlXLBTIbeV0jpSShRYVdK53KCNt79RhduQJS4%2BqSRZkXPSkY1nlzaWF4gWH0tyZ02UBmexhu6lDiIj0fJ1taRnB3H2y%2BBZpbmYKMh%2F2nQ5xzcueGRx3axOwH%2FpVNWPl%2Fjtr9wFZk4CcKScyArGhDiEdPK07%2BuJAa%2Fdu3ZuIJ0thtvMJOK5a6nJYXwn3gyyYZPCsgGAgPzS24xO4X1S8nKSk9xwOG9nOXQIrbK4tyIIryrKLrFvi20vmPo5Lbweks0MGGS%2FjIGAeqthT%2B4RPFsdbnn1bUCsqVt0kUaSSD1xeQw6EOKsDcaPHqSXKtP5Gw9uZWEAhHq%2F6NoBoeyQnEyYwgCBZxKrzUlkBoWJnDONRvtnPD9kHytdf9CTKvAFVxQIVm%2FYmwxvltTb19CSjYOc8S7wIh31g6ei%2BOUuWd1P4RTpenFmZLxs%2B39Vu3oppEXZV7fgaTu4C5Z%2FlJH7PgwfIcWsQLM4LKESGEHVHDBaTUYdW54YC%2FRk%2BaW5RMvidJhIeFqF9ZvEjpkKQcxhTWceVBzJfCBOSb1EnV6MALCO3EUNMIak780GOqUBEPow4yxafDRGo%2B99PS7R4NttW%2BkIEoGg6WLkAOva80FX5WouSW9SP3%2Fme9Vp%2F%2F%2B8CZAvE26hamvMW468FdJ86nn%2BqtkfS9dLgb4pAvRXv4VsYBq8Rgcwg93lKPqI0seLelIxYUCjzvOXVSwUofginHfY%2ByHZNCVxd3rhQYHXxEc6EWHlj9JF4b9qEJH5drlXyMlzaP%2B3nd5znaUPxh7N7%2Fu9eSL8&X-Amz-Signature=c67fff4a972cbe62450f0834434aba5904e2427c61a63ba452d1571454beb630&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QU2GCUJ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIE1XElEZJSVW6uuow44y8GKusXxCK4S4NJypgx7eCZ%2BeAiEAsDsPD%2F7e8XuJSJq8pL%2B4L9WjWb0qYyhN90yJV8QyXEwq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDPQWs8LkUIhSmK%2BusSrcA3cld8gevfiqf6NCVIPOsC3pLDPzCnwHSa4iaxgTZtraXedoTOCWQ9St9RM7I04uvrczh0eSuzF4Scgq9Ur3jWcOHLC%2FG9X7DU5BME8aI3X8jmo%2Fx4umqbPlD57WzEIkernPFH8rzVKmHsjfAQebbba5RWgkPnlWKa9nqHbI8ZBMalAbsWGah4ggayY9MuIfsEHf8ySui0nIXQ9IAxUxIpSoB0Qn2zH1s9hbfhEOssJhQ3%2BE4uIJxL0501TwzzitiPv%2Fc%2BAy%2BA9s%2Bnk0NzKWfIqARdC%2BsQyshYpGbWPPNAS6DEy8dFsrdcpXt4TF2IJEaN5i0l%2FKZ%2FrCmsUw9FWyjaet5Ex7iXTqA31tDkmatT%2Fnyn4dsM42TmhfibirH%2BxIhqTP%2F3HwVexPJLWwG3l7A41xRPPWZpIxreuQXnaqP6Dh0auAUf%2BsbaoMBOVFDlqKQN6ALogrcblxqjU8zOA5S2HjoRnrW6FvQqNOdf3joa%2BbCt0A8FtMmW7W4ihSZTvXyUo16y9gDj0kuv4N7Y660k3NAO9ODxIjVnR5IzrTDNnT5kidSLGsmIpw6ZoI0IzWO8IfpTotBQ6iHrjUtwr4QBpjLDCO%2FNM4VXtORE3dap8mfCdsIrJLfLfa0tPpMKmk780GOqUBPfYnqbCCOBn04iq1WsCkNh4iG9D9woqWz32Zgi9GOhPJlCjBhKaKNrbFaUbFY8MVccze2ddoLCvfBqzaqlhr5raFlOy9k1Fo8L%2BvKJ7jt7kM5ZgTki7LDDf0a%2FidCdnsACTtyZvhciWTG0Gkl8CG7nrBGNV%2BZdYgwvpCgETDmuF28SrzgzgZZufyPVeaq%2BrFA4IY4iNZ3BXj1knVum%2BnzeClpKD7&X-Amz-Signature=173d99f539da321be19d6bb25c58f966b145b8fd95208270abb333fefc2060c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QU2GCUJ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIE1XElEZJSVW6uuow44y8GKusXxCK4S4NJypgx7eCZ%2BeAiEAsDsPD%2F7e8XuJSJq8pL%2B4L9WjWb0qYyhN90yJV8QyXEwq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDPQWs8LkUIhSmK%2BusSrcA3cld8gevfiqf6NCVIPOsC3pLDPzCnwHSa4iaxgTZtraXedoTOCWQ9St9RM7I04uvrczh0eSuzF4Scgq9Ur3jWcOHLC%2FG9X7DU5BME8aI3X8jmo%2Fx4umqbPlD57WzEIkernPFH8rzVKmHsjfAQebbba5RWgkPnlWKa9nqHbI8ZBMalAbsWGah4ggayY9MuIfsEHf8ySui0nIXQ9IAxUxIpSoB0Qn2zH1s9hbfhEOssJhQ3%2BE4uIJxL0501TwzzitiPv%2Fc%2BAy%2BA9s%2Bnk0NzKWfIqARdC%2BsQyshYpGbWPPNAS6DEy8dFsrdcpXt4TF2IJEaN5i0l%2FKZ%2FrCmsUw9FWyjaet5Ex7iXTqA31tDkmatT%2Fnyn4dsM42TmhfibirH%2BxIhqTP%2F3HwVexPJLWwG3l7A41xRPPWZpIxreuQXnaqP6Dh0auAUf%2BsbaoMBOVFDlqKQN6ALogrcblxqjU8zOA5S2HjoRnrW6FvQqNOdf3joa%2BbCt0A8FtMmW7W4ihSZTvXyUo16y9gDj0kuv4N7Y660k3NAO9ODxIjVnR5IzrTDNnT5kidSLGsmIpw6ZoI0IzWO8IfpTotBQ6iHrjUtwr4QBpjLDCO%2FNM4VXtORE3dap8mfCdsIrJLfLfa0tPpMKmk780GOqUBPfYnqbCCOBn04iq1WsCkNh4iG9D9woqWz32Zgi9GOhPJlCjBhKaKNrbFaUbFY8MVccze2ddoLCvfBqzaqlhr5raFlOy9k1Fo8L%2BvKJ7jt7kM5ZgTki7LDDf0a%2FidCdnsACTtyZvhciWTG0Gkl8CG7nrBGNV%2BZdYgwvpCgETDmuF28SrzgzgZZufyPVeaq%2BrFA4IY4iNZ3BXj1knVum%2BnzeClpKD7&X-Amz-Signature=b7b6d678c3948eb5c2afcbaafba19be1f15d94c17f6eb194125ae39b1a91d868&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMAMEK2P%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQC4jgMMKIFn19T05iGjQJ%2BdHuJcx%2FxYzjbOOOIuj2y9sQIhAKqhHNV%2B%2BBeZx4Sub%2F7UcsnMH8gmjF7ekv3%2FfpyGnLbvKv8DCBwQABoMNjM3NDIzMTgzODA1Igwkw2Iz6J9o09wI5dwq3AM7GCUsLTAGNfCQM5CmT5lXCBc%2Fr56kD2ulziM91BRtFlOKuYf3JjlgaOkJdw8dv9KXleaje4FW%2BStXW7Ce1DxEe1q4%2BNqRAj3vf%2FatcKfTwwj%2FB1P8gp%2FmmGHTZ9nZ%2F2JXkzQ37UROoueoykzoEfIuSpFY9Z%2BPw3bJu2mGOpf6WLm6m4Ef2dj6L0Og3o2kBTQUseBy7Hv%2BIkoZ3KH%2F8EZHval0%2BA1i54ODcffrMbqWqFGuiBX4GacsnR8NdvV46fGPrQhCVs5GxRJe6HRSqTybH0EJjoKF6yuBWMCMTtgp0iKqjwDnW59eLBAu8UIpanHY9QIAcQ0QyDMMQVDqznPGjtvxLvLBO%2BNUwZiEq0TizXEBJa2KNh2YsEDI%2F2IVmcE4XKOzEE5A39KqwLlwtC9n9dQAVzht2GbWeALt49pvHN25g1pg2QqC0gbk9y4kzO2%2FneSnG2sjaM4IUbD17knLc1snGK7%2F%2BT%2BJzFav%2F4gsVT2Z%2Fvacb39XmsKnuzDpo2rBEAaCop2wDo8eDhPRdVwbwbT8TiUMKFXkb3Shv3u%2BdkUgky8IUx58PqJj4uFAUkPhaVfhd%2FUn12tx%2BEJMxvo8PuUn6LpiJouPm5eGdiq780%2Fx030Qbcx%2FNa0cyjD0pe%2FNBjqkAU2nikqMWMD5uAnK%2B60F0jvJAjwb1M6tWnSi4qcAHwUSkUxbvzG051x8XMJUyIw55p8nPB3nls%2Fa3UuRhCONmi0d%2Flh59WctJaYefk7os6ziyaOb6iIeN4keb8uEjN8zBV3gTcAaCUVc1uXPBAbISgBbi8mANKimRB22bEPdo2AB8DQBMbaOQRhXqCtcNrtARM%2BadUIbMWwaM4dSctlZ%2FMmGr%2BuF&X-Amz-Signature=72b966c73b860e7d0e9093f0d7dd08eb20f710307083921319e4d90b769941f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYTLOURE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCICMemTRa24w3HYdFZVy0ZWBY%2B43fqL40js3r%2F7hOwJfcAiAkkrcN%2FVLvcl65N5hh9Z6jq1TfksCuyD4uAJQ8c33Hyyr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMxw6pGIFU6CVSXGJUKtwD0gaZllZJxPDs3t7ZcznDmJLTkP2gy%2FU%2F7%2BwIyS7OLyRehb7VyYY7AMs8Dlokm0dBTC2cNW0Whw5HtC0jcV368ytQ%2FXmVUe5JDDOcqhfqPyLiK7L0fG5KWl4NATj8GBrYzH9KlNOgorSqIdD0g40NLFScHM9iGXS43dfupZdV6fOz3obMVFDPnN9SrA6CTN2VyodjgBUKC%2B151tS%2FOcY5yVuZ5wWCBZrzVqgGsj0%2FTTcboMoa4Wa4i%2FO7agWO1vlJBYrNauHfebO2b0y1G0oZsn8GMhsj7pyh%2FNajAbeGHZB76DKyAAWgglTXC61KTjkbxV3A5xkLxG57xWwMSyCfKzy5Fj5RiJqQnV8OZgjO8O1owyndoW8SPDES%2FTwUK%2F334woq5ts2%2B%2BTZidrtAUdiGcXg%2FLjWQ9Hv2NOmYT3ABsjy9RIdxkZI2tP8%2BC%2F7Jnk%2Fngti0agZqrrM9WtFzbXAiI2e4zTm4yKU4Uio5JFivzSIulj5DDeqKfhVBg2OvSjUh0029ET28wZa8xbYdNqGJwH5irKwzZoDskSYtE0Ddmj14tdE%2FhbLhSlw2oVYftPHFrUrewyOLtpGgVw3YUaA7p2%2Fp0CsFVrYWURpOJj6sjB%2B8Ywd%2BvJwaytEEyww1KTvzQY6pgEpYEYl19vkRKsE9LR4RUHY76kUJg7pRyMzMifhjosEDj40%2BX1pz3XdFH0EgQhjaQx%2FdBDworjZFal1sNiCdyvnXjbuWRKwV90Xj0XVxuKVZ4m954sZ28OfOSK9d3p5LpST73esJw9PBSX1ljhy5RPxoBdI%2F3s%2FBV2W0QRtNP1%2BgGPdudMlTcJQCItfrZcw918bwZaOz9rup67cKdnFB8UOPLI0XNeb&X-Amz-Signature=9d84e188e4f63b1562368933c6edddcea4a0d3b6131c4b3df7bff2dfc6f7534e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYTLOURE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCICMemTRa24w3HYdFZVy0ZWBY%2B43fqL40js3r%2F7hOwJfcAiAkkrcN%2FVLvcl65N5hh9Z6jq1TfksCuyD4uAJQ8c33Hyyr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMxw6pGIFU6CVSXGJUKtwD0gaZllZJxPDs3t7ZcznDmJLTkP2gy%2FU%2F7%2BwIyS7OLyRehb7VyYY7AMs8Dlokm0dBTC2cNW0Whw5HtC0jcV368ytQ%2FXmVUe5JDDOcqhfqPyLiK7L0fG5KWl4NATj8GBrYzH9KlNOgorSqIdD0g40NLFScHM9iGXS43dfupZdV6fOz3obMVFDPnN9SrA6CTN2VyodjgBUKC%2B151tS%2FOcY5yVuZ5wWCBZrzVqgGsj0%2FTTcboMoa4Wa4i%2FO7agWO1vlJBYrNauHfebO2b0y1G0oZsn8GMhsj7pyh%2FNajAbeGHZB76DKyAAWgglTXC61KTjkbxV3A5xkLxG57xWwMSyCfKzy5Fj5RiJqQnV8OZgjO8O1owyndoW8SPDES%2FTwUK%2F334woq5ts2%2B%2BTZidrtAUdiGcXg%2FLjWQ9Hv2NOmYT3ABsjy9RIdxkZI2tP8%2BC%2F7Jnk%2Fngti0agZqrrM9WtFzbXAiI2e4zTm4yKU4Uio5JFivzSIulj5DDeqKfhVBg2OvSjUh0029ET28wZa8xbYdNqGJwH5irKwzZoDskSYtE0Ddmj14tdE%2FhbLhSlw2oVYftPHFrUrewyOLtpGgVw3YUaA7p2%2Fp0CsFVrYWURpOJj6sjB%2B8Ywd%2BvJwaytEEyww1KTvzQY6pgEpYEYl19vkRKsE9LR4RUHY76kUJg7pRyMzMifhjosEDj40%2BX1pz3XdFH0EgQhjaQx%2FdBDworjZFal1sNiCdyvnXjbuWRKwV90Xj0XVxuKVZ4m954sZ28OfOSK9d3p5LpST73esJw9PBSX1ljhy5RPxoBdI%2F3s%2FBV2W0QRtNP1%2BgGPdudMlTcJQCItfrZcw918bwZaOz9rup67cKdnFB8UOPLI0XNeb&X-Amz-Signature=9d84e188e4f63b1562368933c6edddcea4a0d3b6131c4b3df7bff2dfc6f7534e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTYZHZ22%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T112502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIGLvwg7mHRHwVcmwtMj17DIWN59R%2BXPVqqmVnVEfAi1xAiBy5Y4OsVl2PRB1GV99BnRjUWvKHFcgduF852q4kjXalir%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIM0X8e6kkBFJJAcLVcKtwDDFgVXwxymm%2B9uDqckBjpkGCOltBAR3f2Zi2%2FY46kGEB9r7FREALtwIpaOTBOrlyxTGIOqVC86dn7AGmWz4CMkZpFHMQBNZExkdRDCSowqI2UdVavpz5POGTArZjxlkPVB2Bj%2BPIB%2Bv1LchR3%2FFXygrNNF75EdVL3pAYGifX2D1lu3qTAFqSeXIBHC1ACoQOpBcxFS8gdHPkX1xK4xij6dY%2BNuxZQz5h%2F6AWveY1DsK4H4n9YspP66MIsNLQXuWjbZzm7qm%2BKYklZ1WrSv5nYs7tmXd6%2FEHWoF1O4V5hVsS4cndE5rNFPA%2B7TTz5hpYiDHvC6kVYYHwWJHGEfBv8dIYxmBN2iDSv23pNg9NFTiUMzJuWBiV5HwJWMtX9dk9AeoxOWRLlebY4%2F2FWzkTvB3N4tuzzHnhNg6eADsf4UXKpmMdE5kwqlpPSGwF54seXdI680eUEUlJnGUaDpJisOvkyg8oBYq0ZCYZ%2FTbg1KaJBAnmmdKK7HomWAhr5RDdl8qcjYo9Yh58A4ook3Fj%2B8SN79kpJkqSLoshpe%2B5APNX6PMksOkXQPFk7z2rU%2BMjBXBPPzY3PRenTHg1YMGVjGaY7Zgip9jo%2FzcyvDuUQYZ1W%2FAZYiUt9U9C4uNAMw5aXvzQY6pgGxtXg6EDXs4GhRoZZ3x16tBMYw6tNGBxjQy57m7L5yeX4obuXQjym72jml00lL4m%2FBpFNDdIiB%2FZudHVhWSGGywIWZMxskNNwEZNHEsdhNoLxriDoTkojxsiG0EcvENsmQzRoBzY66DwwLXzgx0H0srKGQCteAYQADp7yk%2FXB6xDT2j8Cfm5yoH7ZwvJBEUIe3SzMQaoe3mOww69HUsZSJze%2Flx7fe&X-Amz-Signature=7f5f4afafd74cc2c24303e3a404899b5416946994d8edaafd291e3dde3ee0a1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

