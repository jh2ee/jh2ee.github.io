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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632H45PLE%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIA9CL2hqhzSQq1zm8Y%2ByfOiCEI%2F7wAX9ZXWiR1yufMi7AiEA8dqQzWLovFpEzP61ywieCGmKRd8HwlHjguKPzW5QBSIq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDO9OJSC60w7DNaQvdCrcA0Rwxc%2FekraKBvdtMnoFus1FsGAxjbqAFeexZYK514NOBS%2FC66Wt%2B9oKvKDvHxExS6uTFouXb7QgBPmsJmfn1QlwnB5s6Z1%2BBCBmICH35Do%2BPmWo0TDBTayDf9kl%2Be6N9M4ymw%2BzN7QHjuQUgNUb33TDnLGhX6VA7DEplbIpEnkWfEVrasu5oncCGbM%2FCeRR9mtIxd5jaLSwThT%2BtfMWzkZJAm0otSuebgPIb%2Bnb4%2FgfnCXnz4kBhAtAL5Z9cLrTu8Ik8AAHa3ydY%2FZ91QHcaC5kYFFlKlpzuYi%2FKsl5jw2JiFnSIOFgBQ9lFroac2LIXGqL%2FYiCz6O10SJgAqSYL9M7VEy4%2BMb6W%2FwrEPQa9Kh0W9onL3UQbNyDY9GPjSx%2Bod%2BHtNJ%2BR27QtzJ74kd2ATP4Ie7krJOarMgW3V28keFOyK2zoTfXvKxqbiCK2viYg5%2BRv1eyHl9Za58YeqyXnRljjOSEJUsvTGtlNtYS1upFBe8fT3%2Fpi0f%2BACS8ic1gHTJOPfEfdgV7ZpvXCVPJVc8qRoDCMspMA0ki2%2FxGuJubdsTuhr%2BhFvaNEjeTkOL46VSEsFi0gin1m%2BNgUfXoYaMdpM%2Bi8Tckdn07KIa3vgmFXab7m%2B4l2VvLJoGmMJKR0ssGOqUB5Vskwt74yDWEmZF0lyE0jwN0B4%2BjVZx5LVtFUeVjHqy7Ou7bY8QRgw%2Fj0V0cPqIDw3TeQP3QtQ7RU33qVv8upS1kZ90plLQdlblgK6NWWNxvCQ6ctdR8Z2037XaxQi%2F986GsCas8H%2F%2FjDg8zHofQuepgP1U0A90h4nrd83%2BcCWYvXtl%2B%2BGAUxLT%2BCwZHfx2mtVe5QefcEr7OVVstk1elM3zCqHdN&X-Amz-Signature=7c2be5d4bdcc6545f789ba57e6bbf1702a90a3974cec8b9dfdbc0c88f70bbc3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632H45PLE%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIA9CL2hqhzSQq1zm8Y%2ByfOiCEI%2F7wAX9ZXWiR1yufMi7AiEA8dqQzWLovFpEzP61ywieCGmKRd8HwlHjguKPzW5QBSIq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDO9OJSC60w7DNaQvdCrcA0Rwxc%2FekraKBvdtMnoFus1FsGAxjbqAFeexZYK514NOBS%2FC66Wt%2B9oKvKDvHxExS6uTFouXb7QgBPmsJmfn1QlwnB5s6Z1%2BBCBmICH35Do%2BPmWo0TDBTayDf9kl%2Be6N9M4ymw%2BzN7QHjuQUgNUb33TDnLGhX6VA7DEplbIpEnkWfEVrasu5oncCGbM%2FCeRR9mtIxd5jaLSwThT%2BtfMWzkZJAm0otSuebgPIb%2Bnb4%2FgfnCXnz4kBhAtAL5Z9cLrTu8Ik8AAHa3ydY%2FZ91QHcaC5kYFFlKlpzuYi%2FKsl5jw2JiFnSIOFgBQ9lFroac2LIXGqL%2FYiCz6O10SJgAqSYL9M7VEy4%2BMb6W%2FwrEPQa9Kh0W9onL3UQbNyDY9GPjSx%2Bod%2BHtNJ%2BR27QtzJ74kd2ATP4Ie7krJOarMgW3V28keFOyK2zoTfXvKxqbiCK2viYg5%2BRv1eyHl9Za58YeqyXnRljjOSEJUsvTGtlNtYS1upFBe8fT3%2Fpi0f%2BACS8ic1gHTJOPfEfdgV7ZpvXCVPJVc8qRoDCMspMA0ki2%2FxGuJubdsTuhr%2BhFvaNEjeTkOL46VSEsFi0gin1m%2BNgUfXoYaMdpM%2Bi8Tckdn07KIa3vgmFXab7m%2B4l2VvLJoGmMJKR0ssGOqUB5Vskwt74yDWEmZF0lyE0jwN0B4%2BjVZx5LVtFUeVjHqy7Ou7bY8QRgw%2Fj0V0cPqIDw3TeQP3QtQ7RU33qVv8upS1kZ90plLQdlblgK6NWWNxvCQ6ctdR8Z2037XaxQi%2F986GsCas8H%2F%2FjDg8zHofQuepgP1U0A90h4nrd83%2BcCWYvXtl%2B%2BGAUxLT%2BCwZHfx2mtVe5QefcEr7OVVstk1elM3zCqHdN&X-Amz-Signature=7c2be5d4bdcc6545f789ba57e6bbf1702a90a3974cec8b9dfdbc0c88f70bbc3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3BC4RAF%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDR6OfrdwXadvCEmnDSlu0PoO9wr8xCJbn9JQjGFBpq6QIhAKTrKs8NjmuHB%2Feo8WGJZKoLdmSpxffwoEfV9g355DNLKv8DCAoQABoMNjM3NDIzMTgzODA1IgzO0TxcpT%2FK%2BN6AZssq3AOz5ceM4Cy7lPzS2pei2b718Btbs19JI51ooiyL%2BurP2IFG0LpjuycXVleYIOxf7xPxG%2Fnik%2FyY4j5GTwTivZzMMG7ejR8breqdTSSzq448rRvwOV%2Bw6XScm6a4yLNSVVZ4Io1Wnz8nnwGh3FFBygHnVvotdzSlmvPXxnmhd5RK24YuM2LTLJzUUfhA%2BFyQM2y2etC3GmVHS5Kz16hmqQBWkGB%2B6gqGWgaxdKaIoClIA4L23vK7GnLuM6v3RGxNyvcC%2BfFtb3gshvNmXTfB%2B8sT8M3cTDXbKbsxyS%2Beg93QFX3xpS5NPHcUZUs7ok8rtI0I1ca9ypdk%2Feuq9pVvNLWzXsC60I4fE9QAeejbxKAC0pTJaYECGZRVkqWMtOiWJs52wtDu%2F94A%2FCKahTc1G7ldstO7XWMOo3Woky0%2FzQV8kocQOE3VmoP%2FvyO7TH4p%2FHucPFeGQfFSAQciJjsibT6M%2FCEzAZh4Zw8Q9W0PmXd7jteoUVyYdeyKNIlAHpfyfjF7i3N7PVtDRs%2F3qiswJJgRONihrDnlMDse2a6IK72DZ%2BZXTv5C0udcFUEUHAcLY2KoNHngxWcP1PxWfIaFgle083PiAVLZHmYsWKpghJhjmsELH9vgsu%2B7TS4eazDykNLLBjqkAX6nB0M9%2Fs9sV7biv0cnijmphyZa%2B5bTub6P4BwTl7Gzawkf46fcHxAFOPQLfP7oO1QapaMVe2Hx6f1FM6C%2FUOds9Jv1WeiZQHKReFjx1uztzB2FoSbjr52Bexe9Lodf8Q8WE5qczYCNGtI%2BmBQ7Sm%2Bb7CwxsKE%2Bb1r5SCXPBDc%2FIohuU%2FFbLf3hKMzKI%2Flg8btDO4QC%2BQoNNzUwq6%2BkivLJKm2o&X-Amz-Signature=5626c49a40b4079e8779359c064c8d9dccddd342cc50acf0f8effa3fbf11b4bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSA2RZ7Y%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIErWLJzCjRKoz4IYDhaxjdxMh8I9NrmUNBBGK1adjzofAiEAoHtOKo%2BGfnDXmqVkw5E%2FNlrC8tc4Umq%2BaiTM0oX62MMq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDBUk4klAv3fw56Q3hSrcA%2F2prnOKnjCXWwboQ%2BVKbbSlNyBvEqNwJZjw481FBmW3GkbA2HN2vLeUBv%2BzJmSzcz4mw58xJZDjas7q6XJ8c9Z8THHeReKnnBJkk9gVHa4RhEb%2BLaJuCcJZik6%2FSe29d9p8S85e%2BYG8AsDl0rfp7kAG1ZVaKy8oG%2FsnVW2iMq8n1l6sPU2PDxHVwddP4yxVSt5JxUlwj3LNGGp%2F%2FptcEXQMeEcehWJuiMKW96vdeTCNVvhMAx5cA2ycofmVdrEmfhECM9IB1eNJBG64INS3q2ODCvsqGDFYDv2%2Bhqq%2BhUa6mbWZGNZ9V7A%2Fuu%2FWFD3gg%2BInpaY53tPXD5%2BWuF48rSNrPsQU3Ch0nnEcXs%2Bfi4eCgD9oRKxJD%2B7kovD4wCclZ6ktvadQx4j%2BBvhVqLbZu19bSFWQoSxlmPwcmwpq5Slt9RmngMPWv8FEdnKWZoYJyizPr1pEb6VVED%2B7YsWbJl2QwUfBNCO7I8fFwW9hacw2sSnTP02uOyyMo%2F0b3GdZk0PgfaujZoqZ2BmrcE1s4kVyyUOVKXpo5mmE1jq4ENpfg139CDwek5TsioB3PIuVdSNqpewB7tkYF5riwT%2BqYE9V6p1gwU71J7MoHmbHCwlW7cI15L4CEx4g3oMKMOaQ0ssGOqUBnVwxtE5%2FhIDO%2BWKAlSqg3TQwW9Mdz3ydD484GIAe5sxImsQLF75bXrhV5qH65V9VBeQllGAfEfC2iZfqzwIyAxBZgKy7C0U9MA8W0E%2BtVdK2sxHGTSPhum%2BtC3s2rCsRY89xKVZZtkr4nDOIKuvW7G43LE75PWl2sk0vkRzxqp4vT5SWPtVCDIif%2FK2Ttm5T52%2B396gZqE7pXaS9tLjHA0fdrpmu&X-Amz-Signature=af40b339fe53f272fb898f60c04c03eb2d61f2a4d63254640ddee0fc1fe414d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSA2RZ7Y%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIErWLJzCjRKoz4IYDhaxjdxMh8I9NrmUNBBGK1adjzofAiEAoHtOKo%2BGfnDXmqVkw5E%2FNlrC8tc4Umq%2BaiTM0oX62MMq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDBUk4klAv3fw56Q3hSrcA%2F2prnOKnjCXWwboQ%2BVKbbSlNyBvEqNwJZjw481FBmW3GkbA2HN2vLeUBv%2BzJmSzcz4mw58xJZDjas7q6XJ8c9Z8THHeReKnnBJkk9gVHa4RhEb%2BLaJuCcJZik6%2FSe29d9p8S85e%2BYG8AsDl0rfp7kAG1ZVaKy8oG%2FsnVW2iMq8n1l6sPU2PDxHVwddP4yxVSt5JxUlwj3LNGGp%2F%2FptcEXQMeEcehWJuiMKW96vdeTCNVvhMAx5cA2ycofmVdrEmfhECM9IB1eNJBG64INS3q2ODCvsqGDFYDv2%2Bhqq%2BhUa6mbWZGNZ9V7A%2Fuu%2FWFD3gg%2BInpaY53tPXD5%2BWuF48rSNrPsQU3Ch0nnEcXs%2Bfi4eCgD9oRKxJD%2B7kovD4wCclZ6ktvadQx4j%2BBvhVqLbZu19bSFWQoSxlmPwcmwpq5Slt9RmngMPWv8FEdnKWZoYJyizPr1pEb6VVED%2B7YsWbJl2QwUfBNCO7I8fFwW9hacw2sSnTP02uOyyMo%2F0b3GdZk0PgfaujZoqZ2BmrcE1s4kVyyUOVKXpo5mmE1jq4ENpfg139CDwek5TsioB3PIuVdSNqpewB7tkYF5riwT%2BqYE9V6p1gwU71J7MoHmbHCwlW7cI15L4CEx4g3oMKMOaQ0ssGOqUBnVwxtE5%2FhIDO%2BWKAlSqg3TQwW9Mdz3ydD484GIAe5sxImsQLF75bXrhV5qH65V9VBeQllGAfEfC2iZfqzwIyAxBZgKy7C0U9MA8W0E%2BtVdK2sxHGTSPhum%2BtC3s2rCsRY89xKVZZtkr4nDOIKuvW7G43LE75PWl2sk0vkRzxqp4vT5SWPtVCDIif%2FK2Ttm5T52%2B396gZqE7pXaS9tLjHA0fdrpmu&X-Amz-Signature=316e78780b450923afd658a596237b279320d5416348d7216dc86dad859cb363&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHXWYS3I%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQC7ath0rxlQoyyGD6mqiDbPqSLwpZvsfvQwfBa1rpphowIhAKLt2p7Ivyhx4RyW0kzh2O7W5azofbNnjod1VLsMTQ23Kv8DCAoQABoMNjM3NDIzMTgzODA1IgwticoouA4mhg%2FMHDQq3AOx%2FHyGqC9VRxkU6uo0UJtmNJdPpUKPaVCgw4c0lfv1eGNVUkF04uGEG3Rbq3mu7gOaeRgaxSfEyYEP7ZnHVwsI2hDCDw%2BbFcVApTIXfHjOCbouNYZxzzSaxAL4XfYzSxzg%2F7JNFUoU4voeytGEopAIoJlpGaWzyxiyu6AXKWQrqUcBY%2FVJsL%2F5VmaFHCaasGoSPQSXeDKl6ddQPLt8uFdHJnVKZTy%2FdvVtchfThE2nggQ70kA6RCNOL0Gm0%2Bu8dLSHhNBQHBsgOgw7I7yjPGWRnAi0jkinHEpOs8toRTYKdrS7SPdpBoO4NjyAyOkeVk7Cen8wxdol%2FMoxMLDtwbZYsoWEWbCYq%2F86YjzV2lxQVjIW5Pnut0tMA%2BH5yA3qSQG7TciOQ3YVC7RvaM0nQ2Xde0z4vG5W3jS2mnI%2Fl0btmyt8fa2tHS7Q5OQBB0ouHDjj59UowE5THeSYDVDCa4jj50hs0TYnmCE29v6kQhrmd3C9LnGi6fXKBY220LNVEeolia1aM5DfFVoNkkC43D5TdUSgf9d%2B03%2Fy2p64gkV7J5mjzCX%2FAiX9QrGToD1b5LHfi2HdChR8koSZxEUbPOSWoEQ%2BzeUQW2XIB9QVYrwnVu3HfmaEVp2Bv2xRfzCJkdLLBjqkARMIQorSURNqCgjnJJzi0%2BdHRu3lnMfySIWYIwpFbAsaspdezd%2BvCk12sWqr%2BZiWSuRzokNRJsjWAfJ6iHwhE1zSqOz60QOSQ4Fi0pPJo2I5xyyWCAtZP%2Fv5wZUi2K14doTn0zSruPhQ%2FiV%2Bbgk0wLouFwNtHB75ULI6ddn9zNvoCMlJUGr9vVPrvU5Hk4gFKpdHCFjH2OwEo7iY30%2FXjWlLLrup&X-Amz-Signature=52b22a9bfa1648b8d4a382acf38266721e72f3b37920826ddee2f4a82bdec4fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U64SKWKH%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQC9FIzpz3ArRmDK3KUqcuiRm68TgAJgHx9mfb4NsH6YbgIgWKKMlbjWaV9MQwMgOyYN0EmsOjukWbHsaDJbn0JUNQoq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDHUZdMsGpkXoJuPykyrcA0zeX%2FkA0IdWYFeo3OsxNZxgg7wxS2%2BPQ5Boqr85ut4ZvDNeAXBQE%2FXOu5MrNNODkPo6LWtSTSmAA9Ec11vETrokYCzvoEpw1A7F1fuGUBD%2BD%2F0%2F0mWhE0Jbt9dAzx6I87jRh0QnTkZEJMxGjKsh%2F0IcrifM4B9qeqheV2zc9y2QC7dLeBFuo9%2BUg8ntZ304YkbFxCCeBO2gidRmN0n1mywYewTzNtbRA41z%2BUsODYk9PEkW8ps5JqyLN7vtpBClJF8yII%2BX%2Fb6XtH4qYVc2QJRmU96sMjm4ww4ls0cn9KpA0KFYNjFZVz%2FdnaAjKFIfCMF58ICXXmtn3Mk0IEX3oB5NeAuZ2Tes0nXp2HLQQEGUN1uZSdZU5wEQGqukBgyuxwIzT5%2BDI3TzSUHRvnQcLc8EspBWmAgN9Dh0N0m5g9I%2BLJfGu%2B0g1gVWPuYDVGBSj00tOVTqsxywbaX6aJxxQXSQE6pudJOGWOJvbS7RpdBOuZadJ4CMWuprWHNl1P6iwEWT%2BufxVPxeKnkskZyDJfNj3AepopDXYY1zlPhdWDjVTiON%2FQUrKrI4ZGLW2jYpYUVSY6%2FFsZy0xRk2NwvhV7NzG9RpG8Hp8Tv%2FyP5UHQEpOp7iaD6a%2F%2Bm2hCpaMOSR0ssGOqUB1p3UtOEQiOhyGedMx44cjSNAEeV6Bh36cboFde3ydz45PmynwPPzUR4u%2FMKuD3c7r8GIYMIcRL4GDynl%2FeHGlE2B7caHt5MzG952osBHg4JzTFkj%2FGZyUnAWFZRNsuWa842XTvX4tCmrMzXgqupddCX%2BiF6T%2FidVJ04yq9PqUWKMAoGx2UjrkkZB%2FXnSmw6vPh0u%2BuYcXyaOEH4rbJ9xwqL%2BXlut&X-Amz-Signature=0b1b7134a6cabcce54ca86c6782a8a4f0653461c3b988e8dbabf22a0759dee24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NUDZ6ZZ%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQDoxQQhI4YVI0PqQIt8xnY%2B%2FUO8d1asO%2B3iDoIQDNMu6gIgIdC2743D2FTEpMqAr4pzhTPPcyDBSKJDYvIRvfQAXsgq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDG1jQOc1HVzgIn1d%2BCrcAztvwsw%2BTWv7C5w1m4yxxMU0YmY4y4Un2WY8an6%2FCoP6aXLiGetzyQUB5RmkwCZw5iIMZ8Vt1yZ0NH09mxijmI8RoWyrP8r1GKrNMqwEinz3KvuJoVIFYUjnWJlmH7D0jBSJs%2FuA%2FB5w8W9CiHP27CVnZCMma5najzct6a%2FAPyOTmOG%2BMizFQbzY3VcxY6kYiOiNLPPQjpc3NypRXYJ4Sl2qfUcDnPNSRLsYELdeFskufDIDtlwo81w1JKHUsc4fknf%2BwviIV81WxP6EFFRFyI4sHf91mfAjS0dBFUQ7yaWETI9F50MTt94pqovQLh8N16TvJim42F%2BUQoBkI6E1%2BWgZ1%2Fa4%2Fw6K34zrVyX3otiiax9OAz9fYgZw5diEBHWYJQdUUGvZg%2BexsAD%2F5nEHfk0Paz5PCvjXuOiUa0e7pjvCVrhYOxruxEUovFGLp3xONw2EaQOKFxfdX5THITikcxbc75GeNVTqptONYJ1aosEpElmY320dTDdVLE1h%2FjubvNFnZ245dnolIZB3M2o%2FU%2BMrFqGEB8zGHE8qjKKps6da1ZCFSyOWbi9nOT8IfMAVNlGq93YbgsRhVuOpTV0NimRrU6cUHAUAUUn2cBv0ouEm3FsGI2%2FqJAn8eMbhMPmR0ssGOqUB%2BfVN1n%2FT09IH7LqMjHsy8KdiHp3%2B3G3uTOaGEf%2FKsyyZ%2FKMa4gyV7t0SFAvJxSpHKuX1DT9LzBh8wR0hffdZE6DymxBjajUqQ1VgqNInUgrPqyIayIbz9aNTiO245D%2Bo9vjGiyVu4tJoXsrrtrYDkO%2B58xSLj9mUZfA2SNCE%2FQhk%2BZr7GXABrF5lk6BVwZal9FAb%2BO9BMPNIFVAPOrVxSyxGhhud&X-Amz-Signature=2eae45cc7bc7518d92f9b07ff3e2463a949fab28766b0c41525a8e3333c5ec1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJUC6PGT%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQCmEDgPf%2FpVRk53G5w1sKzRPum%2BhGB46JGlfR9zNtN7IwIhALzNKJNIeP6oFHo8gGSEQAhuV5a4cvRBOMaH4nWe6tZ%2FKv8DCAoQABoMNjM3NDIzMTgzODA1IgypWp8X31BlpcxmLtgq3AM%2FjnSfxTjD3HueDrwDrUCPztH0nXrsfjEzMABTD4Ys9xkwtK4cVDNWWr7eHLYWBjaSqv03rBdDrnruE8%2FrwcLJfHd2JidqHxqQkEWZvDNNMmQ1vsSUXdqCATunknUTNcrgJVb0GzkPlMMModTkkbTjLXhKRE2d00ip3vLcf19hr1L4GK1QlEWTh42uXSz5IfVS8MXUQkVz%2FmfVQ7ya0OEYBGu9iS4iM3rgDIQj1FMp7SrCZXIiNJ6s%2BJF4NhhzS0LpIULTSFIyX45lQh%2Fio%2FiCz%2FlntlfAOSgSxwDdn4ENqdKOb3H%2BVKKaavt%2Ff%2Be66L0QnOblUZos1nG1%2Bdww6yA42SFRkDtdPrgWiSWlNzJlPvfWxH6djcJTv45OQCNMuxxvZPFTuw8VrTNSxuEfFBseAP77PE9jFu3VNLdrC%2FKueeEPpCnAMUguZPd43seXgECxbk4Lksrq1iSKxPvKEBbi3j8nVsUxNFZ%2BN9pAesiptz%2Flc4wjoAoG%2FYBau%2FHkEe24HSDwMmEcrEYJZjYdO%2BmdqARiZNJk3CdCwn%2Br4zBXB%2FLfpU7nkXrDcUv4%2FxJpmYJ8uBo0e88YkH57MNPS2PKiS3M7WY%2FVoZOw0q%2BCVJkxse7Wl4K66OF1BsUCwzDAkdLLBjqkAQPYwVu0rWXqBnhwfEGjTUvqCavAkKNN2%2Bg%2FWoz5Upd32YorrDU5rlmTXjSpg%2FlvBnn%2FxXXeKhezI1R5ucS9tJEle8%2BytrHHQK7EC6Me50S%2BZTtaDqukHWycQrYtXBqguPwPSyeVqtluNgVHYiFZsyt7jTqWA4%2BgGhoiPMVXS2hHYzYjWeNpQao2mf4vbralqiLAyyCmsf0u5OF29dv5MCbkRDIG&X-Amz-Signature=4a5a0b7dfaa581dbcf2554177a8c1f52aebff9b7d3e08cc23ae807d42ed4b052&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJUC6PGT%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQCmEDgPf%2FpVRk53G5w1sKzRPum%2BhGB46JGlfR9zNtN7IwIhALzNKJNIeP6oFHo8gGSEQAhuV5a4cvRBOMaH4nWe6tZ%2FKv8DCAoQABoMNjM3NDIzMTgzODA1IgypWp8X31BlpcxmLtgq3AM%2FjnSfxTjD3HueDrwDrUCPztH0nXrsfjEzMABTD4Ys9xkwtK4cVDNWWr7eHLYWBjaSqv03rBdDrnruE8%2FrwcLJfHd2JidqHxqQkEWZvDNNMmQ1vsSUXdqCATunknUTNcrgJVb0GzkPlMMModTkkbTjLXhKRE2d00ip3vLcf19hr1L4GK1QlEWTh42uXSz5IfVS8MXUQkVz%2FmfVQ7ya0OEYBGu9iS4iM3rgDIQj1FMp7SrCZXIiNJ6s%2BJF4NhhzS0LpIULTSFIyX45lQh%2Fio%2FiCz%2FlntlfAOSgSxwDdn4ENqdKOb3H%2BVKKaavt%2Ff%2Be66L0QnOblUZos1nG1%2Bdww6yA42SFRkDtdPrgWiSWlNzJlPvfWxH6djcJTv45OQCNMuxxvZPFTuw8VrTNSxuEfFBseAP77PE9jFu3VNLdrC%2FKueeEPpCnAMUguZPd43seXgECxbk4Lksrq1iSKxPvKEBbi3j8nVsUxNFZ%2BN9pAesiptz%2Flc4wjoAoG%2FYBau%2FHkEe24HSDwMmEcrEYJZjYdO%2BmdqARiZNJk3CdCwn%2Br4zBXB%2FLfpU7nkXrDcUv4%2FxJpmYJ8uBo0e88YkH57MNPS2PKiS3M7WY%2FVoZOw0q%2BCVJkxse7Wl4K66OF1BsUCwzDAkdLLBjqkAQPYwVu0rWXqBnhwfEGjTUvqCavAkKNN2%2Bg%2FWoz5Upd32YorrDU5rlmTXjSpg%2FlvBnn%2FxXXeKhezI1R5ucS9tJEle8%2BytrHHQK7EC6Me50S%2BZTtaDqukHWycQrYtXBqguPwPSyeVqtluNgVHYiFZsyt7jTqWA4%2BgGhoiPMVXS2hHYzYjWeNpQao2mf4vbralqiLAyyCmsf0u5OF29dv5MCbkRDIG&X-Amz-Signature=a039eda93faae82edf59afe6a4173f1db04024f5bb1ea9507f2760fef0e283a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFZUAPS7%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIH%2F1Zjf3nfw3DIZ3cjkViyd%2BV5j4f9CzrvRn0FrzkQGKAiBoW3gEdyoBKzSyvB4FM8bLbHO5QnTdRVl9sVSRQWXX8Sr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMiIkbxwPlMfiwFTCPKtwDyfPktZp028dbVF8nlxJKulfi0ZsdYeuz9pEIGEZTrrqLsAzj9DbmonrDEUrQIMANa%2FaE6X5nR%2B%2F%2FrRgtNxhvfZEs4Vz9eT4ZzgLos0GkXWzgXOdOrnASr5f0F4Yz3HRblqdPQ5M5BJ4%2FqzYurmwpNHSu1%2F7wpwcBZiDj3EEQWFv0zrRDSETHJ%2By6MVuAf1gH4O4daKyS4jEVaTh9DGdK9bKP84Afev1f1t5TirGq1VhYujHqb0DRWAWRxozQePZkTtIp6TuSK3%2BFf8W%2Fn5j792HTKANWRM9KthTArA9Mw66j5VnXRDsqIWXmIS%2F5IVnaP1HKSxUNnZxt5iS%2BOfeFuwdk0HvSPGlVZjgqnyq5TO7TduDyPafP0Lr3qO6emtl6ZuMVwSVb7rBMSkFO9LMYdVGHtvMFPaUggvnD9gJCaFXcdvXOO%2BFZAySDQLFnt88Lo7%2BdkugPnr794myF%2Fzm6rqtfjSSiJNp6lLk7wFXM5gOZQt7a7Xhli1Ly46e7ZCwB8UoXrH4OUmSEEXUgvVw%2FZ9HOQc7rQSiPIQucEavrv3VsRIYqIP7jY6Kv5X6zKKr6XUrZAK6l9aGFtsRwpDBwqeOAdZ4P8%2FzLq%2BQMzi%2FXYJRTO%2BaBijOZX8ICzpAwsJHSywY6pgHdPyGPTcbgEcbHkD8slZWI2U9D5IV5QFlUrTiKOS8Hw85XfZAlJUvM%2BSmQaZG%2FQNmYYKb%2BFJ16Czx4pqL5eWLTbEO9XiiPciHokuQd7qa9xdqf7VcGnc9q4pz%2FQohQSRHbu2gEPMW1QAy0uo8aTz4y%2FyzzQ543E0nsIpKqTUpzQqB1rtoizeaP7T00ExRqvGpFD92VKSc96nVRnY6PQpu5B2sxJHJZ&X-Amz-Signature=1abd4c94e457f2102eb9d4a270078e8cd8b8a7af50c80ecefe3e7a336318a90e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VN6REZIE%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCHz21DHjjeaxXtdmiDbSuLkWKU5bthCFHD2SLSQxlJBkCIQCGisfT7nCLm56JQSwzJ3G2r6%2FazY9TMVXKn5cMf5%2BRoyr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMRUf5n8gY1LnOa43bKtwDorMMZpdqw332WWc65RJ9Rfm7YgI88baLBAYC0NI7sUYZwwrm8d8wdypUm7v3PbJVwxARfTqK8BNlAwWDbqfUBIyaU7%2B9zcco%2B5xznoN40TCr8SG%2BL%2BmUH41bYV7%2FOE8rY3WOnUR%2Btd8TxWyvPEn9qLHmba1nEIa%2FZvSGxGZVQuFjITKZ7RVcHWOxx5WMxBktrJjqQOAEd0fehOknzzGKzSoKFxTLBtCXMlVKsBwqK9DXJPxFyIWsjDh2y%2F34HUgKiUsDuevz74MwOnoIKzR2UBKsUHi84%2FuGk8EwieKJ%2B%2F2nyiIeOkHQJJA55MDSpjM60SdeTF5IFXItGGxZQ%2BSQcpr1cTZ7I2nu8TdTCDnHHS%2BIRFpo4p2h5fp7lC9JrMhht1IMO%2Fp6I5RwoeSYiM66VSH3V9TB9Ykn1TVnBVbKdVF%2B2I351oNikIXW6ipVhbfl2YiRReC%2BaPDPRgDY8m9qtehd8VT1AmFJQ%2FWvFsDYC5bI1CPEQT%2FKlPUypoFLefy5E%2Fiz9zfaoH4qKxJEhFwAgjDw6AzU%2BgnKOWwmHG9%2FOoiGUtYfH1Gy4n9NUmOWGPI0AwN5NV1lWG1J1BmHM4t9eHdURV%2FZKSsYrVGWsnhIdFv1Bhk1ehWGE5Z6Zpgw6JDSywY6pgEldQGBxKy9evuycVtlUn7%2BidNkAIVb2IRbNNrHXbgZ4pNlQcMJ51btlBGljph1QUOkWG75iie0flOrCIgGAYKo4lRQTFybncX7jp8P0816N6FD8jlXrd%2BpGEuTtrfyeaMNBqRVKU9%2BJkkhalFIXLgdaPtPRalvM%2Fc0KFBB5xKrPqDkFZblZhvzxtcRAZbhZlWo8lLjlkSww%2F%2BWxXbcFlAt8Qbo%2BfiO&X-Amz-Signature=a97c4d899d260d05943006c8be634c2ec3650f13a6c5077b8178e137b49f7cac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VN6REZIE%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCHz21DHjjeaxXtdmiDbSuLkWKU5bthCFHD2SLSQxlJBkCIQCGisfT7nCLm56JQSwzJ3G2r6%2FazY9TMVXKn5cMf5%2BRoyr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMRUf5n8gY1LnOa43bKtwDorMMZpdqw332WWc65RJ9Rfm7YgI88baLBAYC0NI7sUYZwwrm8d8wdypUm7v3PbJVwxARfTqK8BNlAwWDbqfUBIyaU7%2B9zcco%2B5xznoN40TCr8SG%2BL%2BmUH41bYV7%2FOE8rY3WOnUR%2Btd8TxWyvPEn9qLHmba1nEIa%2FZvSGxGZVQuFjITKZ7RVcHWOxx5WMxBktrJjqQOAEd0fehOknzzGKzSoKFxTLBtCXMlVKsBwqK9DXJPxFyIWsjDh2y%2F34HUgKiUsDuevz74MwOnoIKzR2UBKsUHi84%2FuGk8EwieKJ%2B%2F2nyiIeOkHQJJA55MDSpjM60SdeTF5IFXItGGxZQ%2BSQcpr1cTZ7I2nu8TdTCDnHHS%2BIRFpo4p2h5fp7lC9JrMhht1IMO%2Fp6I5RwoeSYiM66VSH3V9TB9Ykn1TVnBVbKdVF%2B2I351oNikIXW6ipVhbfl2YiRReC%2BaPDPRgDY8m9qtehd8VT1AmFJQ%2FWvFsDYC5bI1CPEQT%2FKlPUypoFLefy5E%2Fiz9zfaoH4qKxJEhFwAgjDw6AzU%2BgnKOWwmHG9%2FOoiGUtYfH1Gy4n9NUmOWGPI0AwN5NV1lWG1J1BmHM4t9eHdURV%2FZKSsYrVGWsnhIdFv1Bhk1ehWGE5Z6Zpgw6JDSywY6pgEldQGBxKy9evuycVtlUn7%2BidNkAIVb2IRbNNrHXbgZ4pNlQcMJ51btlBGljph1QUOkWG75iie0flOrCIgGAYKo4lRQTFybncX7jp8P0816N6FD8jlXrd%2BpGEuTtrfyeaMNBqRVKU9%2BJkkhalFIXLgdaPtPRalvM%2Fc0KFBB5xKrPqDkFZblZhvzxtcRAZbhZlWo8lLjlkSww%2F%2BWxXbcFlAt8Qbo%2BfiO&X-Amz-Signature=a97c4d899d260d05943006c8be634c2ec3650f13a6c5077b8178e137b49f7cac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3FK3CFP%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T090102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQC69t%2Fs8B8UJvc2ZsR2CetKzB6m%2Fe83zp0ZH3qLVmrocgIhAL8%2Ftc72NOg3GFJ%2BlkuU0AV%2B%2BUg9aM3EdwwCceA%2FP%2FA6Kv8DCAoQABoMNjM3NDIzMTgzODA1IgxdBW2Mn%2BvBU9cyw1Qq3APGpm9GKh3gaxVDM6hUkSgiHWb4cpAby1dGq%2FWE%2B5DRHBdw7uaTHHjhR7LPnMJQzQVnAy6T2B9BSuVmqku06aChrP6JcjUKR6n%2BszPD9i6Re10zdKI5RKGHzd5hy%2FCJXQZ9HxoEto839P11GneSR%2BwHGvzvl6W1qI8jPqB4gP8hCmSqQ6Mr9wwAwJCAkOeyh8hGUQXdbfShbCe8WQHN3GijLaWcK35jYj%2BxCaE%2F%2F87nzz7sVpbkb1B9o%2BvOqR3m8bSazpZIjltX8wTxY0pmzeXxgQje4rbM2hphJyXqIGUycHEVZhibqbYfV4cH3P8RPlrp%2Bx74z32K0rhlgTZ%2BGrHHM%2FF9kugEl5AGWuP0WZUcX1t7EJH3u4uM0uUWOVO5MYAE9ckSEXezfuTI5vtPO6686PuPUIJ%2BS5BMEFa7BG%2FIPOV1Lx3YvZwCyc%2B99uP4477A8RQSq1Yefe%2FZ2jGpVN37RpIF3Qf4C6SU2LmxU1y9XiStb6TOrT1RKp9thkgQ04MaDpnUwubhzMvz6kSuR0fGqclCEDcE4dQA8fi0OQXtWdAdXr%2BF2f79moYpOaRj9Agz%2BWtLuUShHzrIe3zBb2j2qr5bIEHJWYF80nbUy29TRIggYU2scobPiWHpBzD0kdLLBjqkAXsuS8mMpoAGShXCE9Yt11LHr38UIgJv8SYOmv5XS%2FC4kTW055mcsD%2FJsYSSh9frgmhhHF9zpGTPZvLIvtJtu3Z3MqJo1OXRJVjDNy5nPXQ4%2FrUmIQsNhQmblWehosHydL5GZ1ONOamRMGIn1Z4x%2FF3pqkgwOWZjZlqnTYEPN3D0n2ezmoBo8hf5h9qPkU2zSO%2FrSp%2FjkvltfanZYSQvkncms%2Bzk&X-Amz-Signature=e7baf9886ed79c08cb66ebab1ee8eff51f75a495dd136fd53b4e74b8d5ce005d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

