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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645W2LTKO%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQC4fCiyIFUvjF4DB8M0JsEm9iRyXZB%2FElMbqeSXfIHl%2FAIhAIX6M%2Bnl%2B%2F8M4VAqH72ZaBxpStZCtkbNf%2BXaOfsgdjxVKv8DCEMQABoMNjM3NDIzMTgzODA1Igy4ViEZyMMwL0L%2BUk8q3APJ5awTm4UdQ3s1aa9mUznpU21WnXTTJ9Kz%2FNLtAgM8Lp4UjnunZG9PIZFUAjYeJyj2gwqcfRb80WulSyWxH9IU0p0mF6alxVfNaDGN9jWRh0X%2F7tLN4yNqwquR9twmOCeL9zJ%2FJs6%2BL7zzkQBpLbjpnmze2MlFefB6u3jIN4tXJJv4ku37NnGn3cPPdVUHRfZbc8vlPDT6SGEblXAgGmQq0LX2GfUSNd7TklGNKAjpFlB1zYvsSnIGq3zbfLTwBSjOhmG%2BO6eo4VqEygn6N1RgeW71Kp4Yy%2B%2FN1VjcAryiwiOMm8NYEKzyMjqWLaLceYe%2BwPQogyeZHszX3iMVJBhDu2VxFXu2pE1HkvzitZDw2Fe9m3%2Ff3PenvvwRKTCznoh0NtN0x5pZS4LVl21dXmPlKpQsIIB2YrZr1%2B0RcCQjGixvrJMwVE3NtbRQdQvDJoCupZYgJwwypm%2Bg3eiRoQSJUzUwiq5FW3snuT%2FwovMFBUA5q6h2sd%2B8WUw%2BfCCH0tNVvMQn37B0dlKu69MjCtFBDeHCXYq6m8OYHEBDwimawyG44Z4MPoCp1R9b4CejnjBOi9k2bshMaepT7a0YOABqNN2ZzPcKBtuqOEgXvShdqJnlosASEWr63QJWtDCpsOjOBjqkAdNPF4hp4dGz%2FmQ4BGwXPyfi2WV%2BywpalD%2Bw0xQQCaN4lpAagUsQSf8OFh0tmGtS4GnAMPAkPdAvV%2F%2BDVijW%2BGo%2FBO12DNb0Lmpre%2B%2B4VWielanMty4iAoL20NsvLEFZeZxtwppPBd0BB7gK%2Bz9qy6pqBUsPA5hbzdpmGCHs5%2BZMLVfEwHuUQuHHW4VzgT3IwSCkG9yzvUaKTgnrmoxoEDgUHlYj&X-Amz-Signature=11d646eff6101758c9382c91825da8bf18c8639979e2812df59d227b28df102b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645W2LTKO%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQC4fCiyIFUvjF4DB8M0JsEm9iRyXZB%2FElMbqeSXfIHl%2FAIhAIX6M%2Bnl%2B%2F8M4VAqH72ZaBxpStZCtkbNf%2BXaOfsgdjxVKv8DCEMQABoMNjM3NDIzMTgzODA1Igy4ViEZyMMwL0L%2BUk8q3APJ5awTm4UdQ3s1aa9mUznpU21WnXTTJ9Kz%2FNLtAgM8Lp4UjnunZG9PIZFUAjYeJyj2gwqcfRb80WulSyWxH9IU0p0mF6alxVfNaDGN9jWRh0X%2F7tLN4yNqwquR9twmOCeL9zJ%2FJs6%2BL7zzkQBpLbjpnmze2MlFefB6u3jIN4tXJJv4ku37NnGn3cPPdVUHRfZbc8vlPDT6SGEblXAgGmQq0LX2GfUSNd7TklGNKAjpFlB1zYvsSnIGq3zbfLTwBSjOhmG%2BO6eo4VqEygn6N1RgeW71Kp4Yy%2B%2FN1VjcAryiwiOMm8NYEKzyMjqWLaLceYe%2BwPQogyeZHszX3iMVJBhDu2VxFXu2pE1HkvzitZDw2Fe9m3%2Ff3PenvvwRKTCznoh0NtN0x5pZS4LVl21dXmPlKpQsIIB2YrZr1%2B0RcCQjGixvrJMwVE3NtbRQdQvDJoCupZYgJwwypm%2Bg3eiRoQSJUzUwiq5FW3snuT%2FwovMFBUA5q6h2sd%2B8WUw%2BfCCH0tNVvMQn37B0dlKu69MjCtFBDeHCXYq6m8OYHEBDwimawyG44Z4MPoCp1R9b4CejnjBOi9k2bshMaepT7a0YOABqNN2ZzPcKBtuqOEgXvShdqJnlosASEWr63QJWtDCpsOjOBjqkAdNPF4hp4dGz%2FmQ4BGwXPyfi2WV%2BywpalD%2Bw0xQQCaN4lpAagUsQSf8OFh0tmGtS4GnAMPAkPdAvV%2F%2BDVijW%2BGo%2FBO12DNb0Lmpre%2B%2B4VWielanMty4iAoL20NsvLEFZeZxtwppPBd0BB7gK%2Bz9qy6pqBUsPA5hbzdpmGCHs5%2BZMLVfEwHuUQuHHW4VzgT3IwSCkG9yzvUaKTgnrmoxoEDgUHlYj&X-Amz-Signature=11d646eff6101758c9382c91825da8bf18c8639979e2812df59d227b28df102b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GKBKXMO%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJGMEQCIFQ4V7PXE2lw6ZgEKz8Vii28pvxKPBVrUAqBirCDF8%2FFAiBLdANcgCzvySrdEWuGB4RTmQILY2KxNTgIyf36kXrRmir%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMsEbWAg5mB86rQFCeKtwD6VMhIOhIdfPZCJ7UZcam8f1lHk9ty5Sx7qIjwXg6SnMNu1AHHX77vvIyhF%2FalitaoIT2S2HFJEx%2Bvr3o0lKePGWuv5x5JeN5uGXJ996pmaFycsA9DkpfP1YALJgoiroqJEBrZ%2FkIjytF99w9%2BLaJrxmZud%2FXUgRsqfvVeh1AmlWndqUW4DsTj5fUQZVchRoNjgxCVcKP%2B8e73P84HsQWiDIVuUKHYzchp%2FXbUUu%2Fs21i7k1fcdONPP1gVVVWyThr4ORApHZd78IPC6TcNAX6Uyl0mN3YCBrnGGOVvlc8SGMq4gwoTGwM9xhW971Lic2ZLdBHa8k7IwRIJZ37hfIzqUVgocHTWPAatBrl6Ab2AIvjont6FqXOFwMA4TNaycMR6PUp04Lp6XNhVYveQ2gvy5sOmfRQ1yF6Odj8GMuHLgKFEEXr9LaHDm2bYiuvGGLvmO5G90IvKTWbkpnh9KrcsxpeIKjROnBMl%2Fu%2Ffv1iuYfK%2FnR7Y7IyeAYm4K5%2BSpk%2BFiKNriiC7hZ2jgONA82Zgi8L4lP86Tl8Vuq5AeawKKGCGxAnACfIzW1wJlSZ3qXg9JTO2BNXempreJXU7lEFY4YmHMIkuT2VOh5VFmTCR5oHkHYJ%2FE%2Ftw5MVlqYwuOnozgY6pgGJ8k4SCVddQZaau%2FDFS8iZi7t%2FZT3SdOrT6rcg%2B6DFMpf0v345Zl50lNZJi6G4%2FWjM6CbYZkbbqbhFLoLDmITX0qY59hwJY8KneGcHFjtY%2B6hYGmT1rhh%2F9HKmVSHEVh9O78p8wryQaGtXnSMx4BR%2BWxGv%2F83dI9SA3yOjo6Q6gyOARIB6tllY3lIvU0yzlkrYf%2FH%2BE7D1183a9SNmIUUAGf5aWYHt&X-Amz-Signature=3097ef95c2c8a1ce391934e070a5175ee70c748e1a858e4f5448b4184d670470&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664N6HQJEH%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIAMxxOd%2BZqNfgUXDaPWtBjkC4i7lBecFqkzfO0CkEudGAiEA7KYWngYiQ75dafOy3ADOfcHU7%2BzVAi5sxuIs9Um2q0wq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDIkuX0akcon88l%2BNCSrcAynjGBtgDZMIEn5r08WX0ptZ4JwtwvF%2B9YhL91CReq%2Fg%2FR91ZNbw9DzolR4qu%2BZGWY%2Bx9WfFzey5%2Bt787%2BXhngJgkt8tq55YFXPlONEx6dbvoJ%2B3Zt8dAdqEwaYMGLfjuQaxDUaCv3GpqqZFWbZDni3JoSxxn9Kcckg2FF%2FY3xqOnxv5LHLP0geGm6E9uXkJryxbEwkXsKnbKH6basor84jMe279sJpT2BMLJwRN1fx5f07VSnbjizqOGBtXkYV5TqkUSfoxhZJUxlhVU9Qn31UI5Rhfzfbyc3WrpwU6ZqXEC9efsJ96eLjTIhliBNOdb%2FsSGtbm6Kclrr%2BY6PvPpSceg9vcTynv3NQH%2BNlfgwU3XnAnV3j52A1UJERFuHuJKAIal45sLlXQJgfNcCZWx3wn6SUDcPZSqpcsQGkuM1%2FnvmEi9p2bhwGRpVRMW6xhcTxkfkoIIpGaaElskvNOJS5gGyR74AW5iJpVLzrIJFHHQZw7y3jregebmmSFXyEL9Nc3HxOaiJGXt%2BoKOhS88LmiMJduNJAbKxS3lilM70m23GqM7sXnW9x639nThf8td687Q2sniV5a%2FpWSdGaQA1rA2Lr7LPW%2BGCYi%2B1L6bmBun%2FGN9zsB%2F2HcpootML6u6M4GOqUBQZLkpHNQBEfQOaTMUEkxt4iQLI5KBmT4L3URCqkVX%2BGTJ34ugitmiuOfVYCbJP4qZBKaGMZIcvjR0cJbq3ySxSKJkbsNz%2BHxD%2Bth%2FEJcX70bWP5TtMpnhAqCcD6xyvQJHI8vVb5%2B6AX4NVoZprOJVB%2F1J0eUZ%2FwjjkiHr5CHWWMZm30BL3cirFeIS1sgSy4eCUWXszfdRAEDlN9nYiYtiLGTz%2BOg&X-Amz-Signature=1f3b91bcea833469e10d3e31a8e3ea1197ae2a449ced4ed740f98a6ea6decc81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664N6HQJEH%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIAMxxOd%2BZqNfgUXDaPWtBjkC4i7lBecFqkzfO0CkEudGAiEA7KYWngYiQ75dafOy3ADOfcHU7%2BzVAi5sxuIs9Um2q0wq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDIkuX0akcon88l%2BNCSrcAynjGBtgDZMIEn5r08WX0ptZ4JwtwvF%2B9YhL91CReq%2Fg%2FR91ZNbw9DzolR4qu%2BZGWY%2Bx9WfFzey5%2Bt787%2BXhngJgkt8tq55YFXPlONEx6dbvoJ%2B3Zt8dAdqEwaYMGLfjuQaxDUaCv3GpqqZFWbZDni3JoSxxn9Kcckg2FF%2FY3xqOnxv5LHLP0geGm6E9uXkJryxbEwkXsKnbKH6basor84jMe279sJpT2BMLJwRN1fx5f07VSnbjizqOGBtXkYV5TqkUSfoxhZJUxlhVU9Qn31UI5Rhfzfbyc3WrpwU6ZqXEC9efsJ96eLjTIhliBNOdb%2FsSGtbm6Kclrr%2BY6PvPpSceg9vcTynv3NQH%2BNlfgwU3XnAnV3j52A1UJERFuHuJKAIal45sLlXQJgfNcCZWx3wn6SUDcPZSqpcsQGkuM1%2FnvmEi9p2bhwGRpVRMW6xhcTxkfkoIIpGaaElskvNOJS5gGyR74AW5iJpVLzrIJFHHQZw7y3jregebmmSFXyEL9Nc3HxOaiJGXt%2BoKOhS88LmiMJduNJAbKxS3lilM70m23GqM7sXnW9x639nThf8td687Q2sniV5a%2FpWSdGaQA1rA2Lr7LPW%2BGCYi%2B1L6bmBun%2FGN9zsB%2F2HcpootML6u6M4GOqUBQZLkpHNQBEfQOaTMUEkxt4iQLI5KBmT4L3URCqkVX%2BGTJ34ugitmiuOfVYCbJP4qZBKaGMZIcvjR0cJbq3ySxSKJkbsNz%2BHxD%2Bth%2FEJcX70bWP5TtMpnhAqCcD6xyvQJHI8vVb5%2B6AX4NVoZprOJVB%2F1J0eUZ%2FwjjkiHr5CHWWMZm30BL3cirFeIS1sgSy4eCUWXszfdRAEDlN9nYiYtiLGTz%2BOg&X-Amz-Signature=40af7b55fa22440b0a9f24e2a7b6a12713b78dcb502f12efa0ab1b5c3c97c3ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3RSD7K3%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCkcHEdn%2FLv%2F1%2BJ%2BtnB%2FQKQ%2Bx5lJbp94%2BFYGaQGS2tutgIhAMjntQQonkzy9kqWEL8wz8QrwpxhyXW4HNoDLKUaT%2Bt2Kv8DCEMQABoMNjM3NDIzMTgzODA1IgwX3x7l%2BcxEwUQqg3cq3AN3XyXcLwYN8qyqZG7IRwXxFdhRTpAwW9Jmi0upEvZC7XudRTOfu3gbxi6At%2BT8EYI7JNSzlA1vHHZ4vjf2VxQqoHW%2FMd8zRXh3FKtwx3gBCUJnzDuWvprG5qMOsUqa7ETs3qAl2g8oDFRHaW7iF0NAw6hnmWgZWXlYPAIpIbHA%2B9kMBoR3L%2F6DMMGFBLU3u2l7i6PbjGdkxCbezWnO2O9T3Jr%2BvEkqwh6ps0KKO7Cl18Dwm6vEoe7k4TbgZFpBWOfQHvztdwXCyZnwbCu93X9xun2A%2BZIkjmePGaeslvZwE95GcraXjT20DljfxEKMBb79CfRjWHM2o1yZE9If2gU%2BTtVxo4NptGSgBRbju4eIoeJHDIJw5OOKeoZdcIx6xo%2FGDri5K4RP5WZwSv%2F%2FaC6z6uHAlzTaVmGxXoc5uWlfwpK3oOu7cw8qXKfMf4ydiGz2W%2Fk%2BqDaT5TyL2mpVR%2BM5B8qUscvONzRItwwxlTJMBQ0uU%2FxqjVdWsw0Tm3FkkhWRtKaXrlhQbOvkP%2BtjxEsKrZBCerqDMOQoGbzpHr1x5B4pi4IpAyFx5iyqG8ecQEPJhhRryCl9Bzh5S9PluT5gfltqGAVLSTan01DdKfZBk3HPp8bAx5pgDIVjdDD5r%2BjOBjqkARKaDi9Oe5x96wls9v2LGpVcfsecfUr0IP%2FeVBZsH97FbdmZ3rtFEqK%2BbFrPuyH%2FBmoe5tdds4Lawdjq2w48%2F40I090lKbRhbs4BH56PN651u3hmS0Y9onggpqF2m%2F5Xc5X4eaYZu320houUkzBfoLihFbAScIr9nJspMlubmO3iPHG7ovQfhF8ldFqMhB4D82WI%2F1%2Bcc%2BEi2Aj%2FNOck5w51GXQi&X-Amz-Signature=de642fcc09170a6b260a1e29b86192e6481e2e6ec01982a563742295fd1ff26a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2USFNPI%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIDcfZZMTwAi2Y0kJgLGj6EHekyeD0LZ9E7rgAcW44b0mAiEAh4vWBhajWS26U7cpcFWnbc0nDBkMRNtNXmdstgWiy2sq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDJ0272Nuz5xhUe2dsCrcAzI0G8ZBmtOWGbI6EEQCY2krtBB1FFQKJ7klOteVOLsPkXnW8bCv4nckRrCzZ8mkUTRjhtJERSuyaTmv4d9DaCriEggaeBYypGxpmUNMDZJouqNDGo8b5NWIjh%2BwmD9gtWDN6k3iJyuSg%2FH7cq%2FWlxzMWFmnY9lhSqipXywPR%2BitiCYuwA8SAex5AAzJDmATd6ViYUoTH1qatPu8XfvrD9M3O90t1%2BbM40Jpi8BRhagnoa2BNKvHjG44wPuOs75KcrW9rV4cPDGgtzXSIEQVx96cvMt2vmnGc6%2BQyf%2FGmr5R1ZFS8CTUtte%2FNEDN8O5B7MduhmgdKo8R0aVBV2l3buWZHYrnBZrOPahFiW%2BdUBQeZjqRa6nbQRwEFaDQ8rJSCt6prJYVS4QNKESVmS1Zmw2qE2ubtt0YwGUC41K%2FtK828z6kmfIcjgYUYrPl%2FRJgX6NJw14aCGSeKliFTyh7vCIWA4H9pIaYaJ%2B9SnekFwISEO%2Fo%2F4GS1k1u3e%2B8GAXLQIiolyZfFLQFioGeOhly9moFtyVyx62K91GHIbDOFKRTNpaOk5DTMwz9n3P9tJZ177Jqg1wDwx6Fua5PjctDc8YaueM3nJig1CrsBmaF4%2FKPJTv2TaEliwo2SIkRMOCt6M4GOqUBclgU5UlL5XDJnAlVgAGyp82qPI5Z35FNLP4TCUnBBDMnZ7YbaCyLgdZekjS71zeNvm1uICPGCUfh5ULitFZeFzrywghf%2FcYZ%2FQMIstAq8aiMQU%2Bn%2BjCdCzxgYOiaAJKXkq99nVgJKuJ%2FWk4HDn9bGVkzHQMHRHjhEJPD1kDmDBjFsOsZ%2BZ1pVT350BhIONhK8EVw1Gy8xfCQd0YVemKACEK0nFHr&X-Amz-Signature=389bc73cc20ce7cef7e6537f1fc1a22803d21a00ed6559b68d0ae138d7438aa8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46677MTD4RO%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122635Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQC%2BWtItXHhGt2GcoaOmmLqRDqxKKTdoAfPkbFaxxxX1DgIhAKzxYflNR%2FEqmCjiNnfSKZZTLkkd6i1soKAasviv9QLmKv8DCEMQABoMNjM3NDIzMTgzODA1Igzc%2BNhRJ4fcLIEQaUwq3APritvCxXRGdZGU1rvY6nAgtFgxHqmBdKn%2F2kOlC0jg6%2Fwuo3lhwulqTj4UpQQuiqK0UH9xfLf3Ya8tq6HwjQ0FqrthvtNGZ%2FCyK0J4Yb7Nqfy1i0fGEtAX358WBGhwxFOnd8iuUvsxutiJp8VPQBBvNqI5kun6YU3ajcvz8E2bU%2BW1m8s37x9tpyjs8NFA41oN9%2F4kafh3cG7RpOe3%2BufTKlLP3Z1EuXReojrmGcEGva6NIvX9peqVINZGnX8Y%2BE1gZZVjD8JNisPf7S2uo6xNzitA5Pr7Hs%2BI1PkgI2egkix6NYDG5ZBrixc5rT63ULN9zUfWLDuyNK4n%2FeDTnEYm%2BGRRvrSbgtQbh6wkknnorqU97CYwvodJXZaR5eUY5%2FjIWCNTt2ph%2BW97Zdy220217Myq0Q1fsK9WNLHS3FZoCPuTFXPjwT%2Bxs7mZp6Jih%2B%2FyMZLo2rDhkirKuOZLYQmup%2BtkyxUxCCeknmULiPtLdzjV8UCWhjWzKue%2BewA1PSGD0hxiQKvn74EWQGqILEn01dPh9PaCD49AHiPQuytV5e%2F%2FNxPzlClCMY7oKyJ%2BBhY0RiB7%2FEEU9O52kDU7mTx63AJpD4SlFI6T6fF%2BNEynQL%2FNrczMBsNZUIjtEjDcrejOBjqkAbTYv%2FIfpaEHDDKjk%2FQiPwhF0xoJnmYVhyeAawMRh6YhADuS9rb0KyoIUJfkGnqSCvQoPtI8fhFW6FQXyR8eEnDbRSKEKC07i8uZ0tp40%2FhnvxfVbafpPMc8EUWZgwT3Uy5cAkKZl21a%2BrxJMVBQrHQwchXJuvdVqsUUO5u3a3q9S%2BMzRusH0rc0r7SkQIXHBfXzp5GwH9L%2BuBYyUWSMA0ll0FMZ&X-Amz-Signature=2526d7e34318ee30a38b90c1462f0872e8e882010c43b5874bc080759f0b4e7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SS76PM42%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIA4ktNbgxYdeLnvFJk06G4sy8c3CAo73S0GCN0xf1vvpAiBvzSCYVg8r1YiqHYtOZAAFwM%2BW6riO5raWJwybZFSo5Cr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMw%2F%2B0GtYiC6VaZL%2BPKtwDr4b8XozEbmgsHwUJ4h8xLSfgF3geuTHA8J8DaKQhjCA9ErPAvCnzVKbHmMWHC56ZE%2FUw0ltjhRIl4gzmzh0Rmo4ztBZqOEr1MJKss36c1akTruS1o4z1Rt2YzJeeQxW6LvQduaeVjrHFz6BOaCD96zCcQYf3gJyH6imDOhkx8slflgVH5jP28IpgioJcFHG6bn2z7BpZqVjm13V8jfX%2FaslgPOCm9XzVYq1ErS%2By0LdoUuvq9%2FKEbEBElzbOll7uX31LLvdoyXxAJYr0KHslR7T1B4%2Fj1Z5Jn3UxdkOpaYt9kSVvLeB%2FYW38%2F5qlhG%2F6y0mBIJdhFNgkk9TGXBaMhawzkrpzrY%2F4Xi9d%2FcsI5jSNQe6tjk3HLhiAIHMCO2IjfqHOWt5S52BX6jN38TgPpWVSe9143v%2FQz3RKhiVaNQdmbURQFSLyQeEpbKtxWnwAqfhypFPhy69DrO8LVHs%2BG2GTQb5DrkmLZgUxsocdIWiyRtuX3oiSCndYMFLI%2FC0GVFxJxNmbbLVgQL0VEQIwFiT5QbOQB%2FsfebGJNiDQ7jzi7QuHr7zP35rAF%2Bs0wV6XRKd0MfdH8Unvyqakr5OtaKqud3yToUOumz2ms3k8l9VJtxXG2vIss3Rwzx4wzK%2FozgY6pgEppI6szot704rUVyg7NrxwncP42Duct%2BNmI4l2A9KStxQ%2BiQQuV9RlKnvSDGJ9qTXumKObXC7RuV%2FaqBp9U4FltCqUL7xGmQDYbwMczg5CUQDbnI4QRrgSYmJRle9XX76hEBLZo7GpZHVsyGJTG0PTE6hPlDV36BzUPuD%2F%2BYp5%2FXNNTqEW5syrh3s%2FAOl%2Fv1%2FujxiBkpnwK5SQOLJAmyI3tk%2Bn3hrI&X-Amz-Signature=1f3a13756cfbaf4536efb8f4693629710f9c689032c07f421abec2c6cf4f29d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SS76PM42%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIA4ktNbgxYdeLnvFJk06G4sy8c3CAo73S0GCN0xf1vvpAiBvzSCYVg8r1YiqHYtOZAAFwM%2BW6riO5raWJwybZFSo5Cr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMw%2F%2B0GtYiC6VaZL%2BPKtwDr4b8XozEbmgsHwUJ4h8xLSfgF3geuTHA8J8DaKQhjCA9ErPAvCnzVKbHmMWHC56ZE%2FUw0ltjhRIl4gzmzh0Rmo4ztBZqOEr1MJKss36c1akTruS1o4z1Rt2YzJeeQxW6LvQduaeVjrHFz6BOaCD96zCcQYf3gJyH6imDOhkx8slflgVH5jP28IpgioJcFHG6bn2z7BpZqVjm13V8jfX%2FaslgPOCm9XzVYq1ErS%2By0LdoUuvq9%2FKEbEBElzbOll7uX31LLvdoyXxAJYr0KHslR7T1B4%2Fj1Z5Jn3UxdkOpaYt9kSVvLeB%2FYW38%2F5qlhG%2F6y0mBIJdhFNgkk9TGXBaMhawzkrpzrY%2F4Xi9d%2FcsI5jSNQe6tjk3HLhiAIHMCO2IjfqHOWt5S52BX6jN38TgPpWVSe9143v%2FQz3RKhiVaNQdmbURQFSLyQeEpbKtxWnwAqfhypFPhy69DrO8LVHs%2BG2GTQb5DrkmLZgUxsocdIWiyRtuX3oiSCndYMFLI%2FC0GVFxJxNmbbLVgQL0VEQIwFiT5QbOQB%2FsfebGJNiDQ7jzi7QuHr7zP35rAF%2Bs0wV6XRKd0MfdH8Unvyqakr5OtaKqud3yToUOumz2ms3k8l9VJtxXG2vIss3Rwzx4wzK%2FozgY6pgEppI6szot704rUVyg7NrxwncP42Duct%2BNmI4l2A9KStxQ%2BiQQuV9RlKnvSDGJ9qTXumKObXC7RuV%2FaqBp9U4FltCqUL7xGmQDYbwMczg5CUQDbnI4QRrgSYmJRle9XX76hEBLZo7GpZHVsyGJTG0PTE6hPlDV36BzUPuD%2F%2BYp5%2FXNNTqEW5syrh3s%2FAOl%2Fv1%2FujxiBkpnwK5SQOLJAmyI3tk%2Bn3hrI&X-Amz-Signature=4fc499d98270f45d6ad9434c5c0c4d047cfd6b2442fd2339d5015fb83ea6eca1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VINXHRUU%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCJMHKpdRRaQFgJP0ImOzIwyLsUpdN9BUvwdf0nxohC1gIhAPLnhtGHjwuZvrA0D7a7F9FZwa8uCqZRX%2Fa%2Fk%2F5Fj735Kv8DCEMQABoMNjM3NDIzMTgzODA1IgzZO2OcqbOhU%2FxIvhEq3ANSpjPBjEnv3RTvvX67OQ%2FIlQEm5nIWLo32kjtJpZF8f%2BsaD3tGsx79%2Fc6JqDQcvDZpd%2FvbJhXUW%2BM5QpO29Zwvc9S2nWG4RfeUYyHBchiL6saZ9tIPuyjJ5gyuSKs6lyHpA8UxvD0h84fGQtunPeSefscBGzlg%2BEjhGEor9oyWk8KFTALW%2Bzv4EknayspfLYxOiYYORWKxwp%2BGwCPtIbVjJazaVgpA1LWs1Wal9ipoPTbsYpV1e2%2BpuLJJW48RsFaboZJTMntfpZUSXuEyIEjpAr7CUc7%2Bc7A79G01F5icsBGtOZVNrNOKYtAy5%2F%2FMkb%2BJPCgj1eDqowiosU4O0oqm7hZxe9rjbvym5RgshkHGJRfUFBV4Z6nX7rjwAh7TkZJPm8sbtRGwFwoY1k%2FgMvEZ1tTqpax6nI%2BQUAUD%2Fctt6xAl%2FgJLnlFOILNWndNlCFk9i5fv7O%2BsFwL33gkSlJeKyhv6QYxjelW%2Fe9Q32lEBSY0dsFFMDwUzFcK3qiQow1B0f3zWBDzOZ8bRXOtr54oeUJQw4xOSrGX88V6va%2B4r5oEX5jS4wU51r0IvgCev6w%2FYX80VNki8Wlzx2gOMHNewgbhFhEHB98N31QBINWL8OCmMGDDCrBsdNQPgITDbrujOBjqkAUTPvNRp7Ok5yeO9yz3DhP3s18o2fw4of6XA0OOefqkhOgk1zBTWo8sq70dS%2BFIEgc8PbuGwatFHGwA60fuW7qLccE5Y2dxlGVsE0RAP5Wt145fpH1DK8t0qI4WvEvQ388AjJxWAT%2F4sB1tek8U1ON%2B5A16fBgeO3AzHjiOLUCGoZSi4yhvrtihbNYtFdn6phH%2FHoI%2FkLpZ0DNECFvAxRYYshOzg&X-Amz-Signature=9996e1309680776546828aa9565c2534e6db1be5be59d8ea4c8434440349461e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JS7SDE2%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIASRXTyASdsUqqQ5CKDayCL4v%2Fvyb6IoHHgDPenFAOU%2FAiAygjurHQgS2WekHrE9aeX%2B1lzkVpoBncj%2Bj98OLOZmyir%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMrv4ifWjYfaRrf%2FuRKtwD560gLSsy8EFJSYqhmNu%2B%2FbO5XqnCOQvB0eEtBxMcpbzWHwbeOT%2FR73a5mDNsXzU0IVXIbdQDlNDeJEhkdXu3h0y%2B3aIWMlKX%2FvrxMmhW%2By5Xwt9k%2B50Br8ezfDrIyVAoY5sDVPivJTl%2BQEBwe9960vHGsDq2UEfCgjd6eEZoO7rO0na5MeY26V2qJ7Z0lpA9blVlrk4uLKTCe5PkA4zlSklieV8GdSEsNDu0Ik0RQvojatA6xngTa30H%2BkxnHOYiK91yfkew5SpFeIfWwhlI3t5W7Y9fMZeSQX4WowjgBb1b1BhQgH%2FgdKmdaLKqx3pazdbKEjTchwrS3RvMSCTquzAd68tL8HC70Xg3%2FuIZNc8zSBkBZPU77%2Fh2VfsDb3RdIcv0NM8GFnZUd2OaSXirSPbEUH99u2yJR9pnT4Cnl0NqL0UCOon7VLNZUSTXTJWoQZrA4%2B9bpJQfgaGvA4ohA9MVz%2FyIuu3StlWHD6Pn%2F0ptSxY0UeDZ6v1XjbzswS3sej9c3UZh0KgA1gjtNT3GEHLG9BhIcxjf5pSDFXL%2F0VWVnF0sIowZHTQh2jzFq2cg8O4mulwM6o2WJhGicGC13badj%2FxqwZx%2BwbjQsYsWwMYHAkbW8Suv5FEFtPQwp7DozgY6pgGe%2BlPCIRoy7r4bFa73axbrHwu9NY9CG4xFJ2MdR4XvJaIxe02FSCFyoQ3ZtctiJpG9Er%2FjZYUwkkIv1ysg00mnJFVnR3nXTeQHbO1k6lfXMbGB1WUwm5BshqV%2FPVAbOL32H8AqOC1z5O07YEHvGSV3Kpa%2BSIKBMUgjEyVemp9blcJJiw7aXTWk02kAe0GCCFhtTJxA%2Bx4XB8tgUZcaFyoFLUJgw%2BBU&X-Amz-Signature=084a7253d185dda85dcf5cf5575223401cf9b554627b90dd3d55aa8c8b93f6fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JS7SDE2%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIASRXTyASdsUqqQ5CKDayCL4v%2Fvyb6IoHHgDPenFAOU%2FAiAygjurHQgS2WekHrE9aeX%2B1lzkVpoBncj%2Bj98OLOZmyir%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMrv4ifWjYfaRrf%2FuRKtwD560gLSsy8EFJSYqhmNu%2B%2FbO5XqnCOQvB0eEtBxMcpbzWHwbeOT%2FR73a5mDNsXzU0IVXIbdQDlNDeJEhkdXu3h0y%2B3aIWMlKX%2FvrxMmhW%2By5Xwt9k%2B50Br8ezfDrIyVAoY5sDVPivJTl%2BQEBwe9960vHGsDq2UEfCgjd6eEZoO7rO0na5MeY26V2qJ7Z0lpA9blVlrk4uLKTCe5PkA4zlSklieV8GdSEsNDu0Ik0RQvojatA6xngTa30H%2BkxnHOYiK91yfkew5SpFeIfWwhlI3t5W7Y9fMZeSQX4WowjgBb1b1BhQgH%2FgdKmdaLKqx3pazdbKEjTchwrS3RvMSCTquzAd68tL8HC70Xg3%2FuIZNc8zSBkBZPU77%2Fh2VfsDb3RdIcv0NM8GFnZUd2OaSXirSPbEUH99u2yJR9pnT4Cnl0NqL0UCOon7VLNZUSTXTJWoQZrA4%2B9bpJQfgaGvA4ohA9MVz%2FyIuu3StlWHD6Pn%2F0ptSxY0UeDZ6v1XjbzswS3sej9c3UZh0KgA1gjtNT3GEHLG9BhIcxjf5pSDFXL%2F0VWVnF0sIowZHTQh2jzFq2cg8O4mulwM6o2WJhGicGC13badj%2FxqwZx%2BwbjQsYsWwMYHAkbW8Suv5FEFtPQwp7DozgY6pgGe%2BlPCIRoy7r4bFa73axbrHwu9NY9CG4xFJ2MdR4XvJaIxe02FSCFyoQ3ZtctiJpG9Er%2FjZYUwkkIv1ysg00mnJFVnR3nXTeQHbO1k6lfXMbGB1WUwm5BshqV%2FPVAbOL32H8AqOC1z5O07YEHvGSV3Kpa%2BSIKBMUgjEyVemp9blcJJiw7aXTWk02kAe0GCCFhtTJxA%2Bx4XB8tgUZcaFyoFLUJgw%2BBU&X-Amz-Signature=084a7253d185dda85dcf5cf5575223401cf9b554627b90dd3d55aa8c8b93f6fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVMWF63G%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T122638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQDmsOeVXeeXx3q2Q4T%2FYygpBj1irqb2NA2D4RhIywoolwIgfitcW%2FF3ORtEBX%2BGxRFLvzRUSO2pq7pkbr3gribMi0kq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDKeTpB9jnQSmw3XJwSrcA1iyD6beWtuyvlyq1pk0ibllqUJlOklgVv%2Bj%2BkEPxDJVQg8l1FmS%2BeORDrcIC%2BYAZ4MfgxFzIrGsSJwCO0jsAni26M%2FZjYXzrMeh30FHWD%2FMckJ%2BlbZBZXSUnADcaYNYZU6Anhybyym2LH3%2BOzygCgr0TDWtEbw6I0a9DMgAey3L4TwSSRya9mHN3wPxrj3LZ%2B50NrMy0OFXR%2FD%2Fy1As5CUVqco9Hn9evfD%2Fk4WvU6S%2BlYktLcpCoA4%2Bxjt%2B9Lve5FQ2XYrnnnT0MiHFhIB8uyJYneWTRta9NNFDYec0hwBBda4A1zCNeroJ0z9BqFEppLFP%2FmRi6bZmAf8Lxe9TvR8u4683FOZAQsbK0koeaKsF18Ko0361L%2Bz%2FAYxDM7oYpNPiawN%2FOpV7QQmkxQSwBd4dJyJN4%2FhCMkdVkID9xbWuemylssycbIWWyVoEfooEYgqUBkzZzGbNmzMC00QzI8XzPPJvG2Tj%2FgDmjOvOqEjpSTuCTpAIVhkt3Le1SZo3pHNonu5IGFVIDJtgSsxoFYpqT1eOTWxNwj8xtvNS58c2yYX4WiTwCn9SSwCP3Qujt2YxkNaSpMybyx3kZ8KJpF6TDFPFAXMTIutkH0YRnHqZf8SrmcSe171coqUOMKaw6M4GOqUBpmoxcEvr%2B485DT0VOjJy9yUj1%2Fj3ogBo0T3t%2FZTdxq10Vi1jUJJQK3HhdJ3Q9zXkKjczvDlkFsovLna6mtHcy5eqksabws4Q8oBZhGmbvd6zS7FacWnw82H40yR5qv%2FVlf%2BpAzyk2n7VDF%2F6rBH5rcW7%2BEozPHTOlzmZqIK%2BvtzUdbvt%2FxaSeZZ2vvRBTs07196m%2FfVFFL2iiSJ7Adk1zS%2B3tGL4&X-Amz-Signature=d2f55e18673ab3861ad0b578b7d9fe5953179d7f1c6666635229d6ee5db89e0a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

