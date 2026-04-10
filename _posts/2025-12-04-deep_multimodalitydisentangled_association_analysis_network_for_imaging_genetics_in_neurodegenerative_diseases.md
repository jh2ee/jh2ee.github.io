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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675ZV5YUA%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCC0o727iY8yhLTxbxWG5OY5Tui7QqIaOHDE4OAWJPXnwIhAOO48QJgHxWc4xWdGcN3C5PaXsPtxYe9leyjVK3iqOA7Kv8DCDUQABoMNjM3NDIzMTgzODA1IgycHGNaAb5vEeo6R%2Bcq3AMHd1aE3ncPeTXbvjgTvAUqTObu04J3l5pxd2hgBgCaLjNcygmw%2BzQoU1c%2FoLJ%2BhfLbPbbU3CjnND6esk003PWOGL942BG4wg2Gp5Qc3lVm5jeDqNQttzRHnXVOIRlQHPzUw9DOkrhsi1UcGUobsWA%2F%2Bfvx%2FfcxU9A1tl1QqCpOhhNLfVrJI5QatItZQHZsOmA60eSFu%2BAS0MtjQQqdbPb0%2FmfUQpZzTJ%2F4nwpIodYxxUKPniJCus9ef5jlWpALtDaTwtfO5RlSUOVk5ROvMyL7m5sMDelC6dMMi5SPOMJn%2B2rACGu8CuW3cupRsWugBMjOXp8LMjqsWtG4cIu3aOEHovZa907KEUUycZ5GXpvn8mlI7oYgHWv9Lom3mfQ5nUHWymOYcoGAE56aKZRAZWWrhNIiplAwedEqxKn6axcpUVIZ%2Bc3IyXpCRsMiUeecuZb3j8Tj5ogIkYfaO63Yt6IUahZq0a8plwFJ%2FteDLMvpydT5%2FYcZg7ujj8p1TZ4bi0Jcy0Pn4RAY4jLD0Up%2BGpi9iq2ERUfAbObZd5sZRgdYIYrGZoPuk8jqrBB2h1ViDKYHXbOzPCRCJPlIB8wRrblvB77Kl2vZfd737m70D5WoHLbxEQsK1XVcUDQeRjDQquXOBjqkAW0z8bFAQHmg2QJpWL8YyfA3XxDv%2B0X5MaqXgTdklfbRUlLsCKuVoxtOkJARLgyFq%2BcDnIyJhaOE4PqPp9JnwuduWyLQ7gqJmcWysEp0CMSDVDFr0gwG%2FkTi46CV9wuEboKdIzQI3zeTBMTol050cLgD6eDxCHcD51B20WjQ7nlQKhBWIB756JPutjspQEkfUH4CcWlzY1FQ4rLBNQ2jcN2deMbh&X-Amz-Signature=ccd71620bad24a4e8399b7ac8d175bf5289cde3fc00fb5cad4ce3cb0887f8d80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675ZV5YUA%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCC0o727iY8yhLTxbxWG5OY5Tui7QqIaOHDE4OAWJPXnwIhAOO48QJgHxWc4xWdGcN3C5PaXsPtxYe9leyjVK3iqOA7Kv8DCDUQABoMNjM3NDIzMTgzODA1IgycHGNaAb5vEeo6R%2Bcq3AMHd1aE3ncPeTXbvjgTvAUqTObu04J3l5pxd2hgBgCaLjNcygmw%2BzQoU1c%2FoLJ%2BhfLbPbbU3CjnND6esk003PWOGL942BG4wg2Gp5Qc3lVm5jeDqNQttzRHnXVOIRlQHPzUw9DOkrhsi1UcGUobsWA%2F%2Bfvx%2FfcxU9A1tl1QqCpOhhNLfVrJI5QatItZQHZsOmA60eSFu%2BAS0MtjQQqdbPb0%2FmfUQpZzTJ%2F4nwpIodYxxUKPniJCus9ef5jlWpALtDaTwtfO5RlSUOVk5ROvMyL7m5sMDelC6dMMi5SPOMJn%2B2rACGu8CuW3cupRsWugBMjOXp8LMjqsWtG4cIu3aOEHovZa907KEUUycZ5GXpvn8mlI7oYgHWv9Lom3mfQ5nUHWymOYcoGAE56aKZRAZWWrhNIiplAwedEqxKn6axcpUVIZ%2Bc3IyXpCRsMiUeecuZb3j8Tj5ogIkYfaO63Yt6IUahZq0a8plwFJ%2FteDLMvpydT5%2FYcZg7ujj8p1TZ4bi0Jcy0Pn4RAY4jLD0Up%2BGpi9iq2ERUfAbObZd5sZRgdYIYrGZoPuk8jqrBB2h1ViDKYHXbOzPCRCJPlIB8wRrblvB77Kl2vZfd737m70D5WoHLbxEQsK1XVcUDQeRjDQquXOBjqkAW0z8bFAQHmg2QJpWL8YyfA3XxDv%2B0X5MaqXgTdklfbRUlLsCKuVoxtOkJARLgyFq%2BcDnIyJhaOE4PqPp9JnwuduWyLQ7gqJmcWysEp0CMSDVDFr0gwG%2FkTi46CV9wuEboKdIzQI3zeTBMTol050cLgD6eDxCHcD51B20WjQ7nlQKhBWIB756JPutjspQEkfUH4CcWlzY1FQ4rLBNQ2jcN2deMbh&X-Amz-Signature=ccd71620bad24a4e8399b7ac8d175bf5289cde3fc00fb5cad4ce3cb0887f8d80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HBGOJXB%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIEbjABRJ9zCmKTyTIlQIx1%2Bdue6k1fxCoVPOKv%2BMQVkQAiAXoZYJUMQe0uS7znmtmOJ8XDbF%2BlYUqYpyslUtOgL3gir%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIM1zYjeBPrazMpQ8KQKtwD0H0rZAcw5pyE8PESvd2h%2Fw5exEAAma7Y7ic%2FyIsTfG7Y1KKX9DkX3kodY28MS3hHqsVXrhgKJanFcCZMxnRYOiTwrlMjy1XlAFysR03X9bgL3KNkHHpBX0SnxytD%2FV2Ksjcs8Cv5XrF24FXqIcbnGMEEIhHWfJNtgjZ4dYQm0sB0fwAlxN2UoOPSPIuWGcQWItJE1OAeqEKYp%2B55NSIUiGQvd4O%2F%2B2lHd9yxEV541dbfW0jp2htsDWJz1uwfP0rz%2B7M%2FTPJ7YqCiOHOtosRWA%2BgNS1hK2D69SSY%2F4PhQzJZIuXFo7Aabylbg8NJ1NPQCKgoGpNt4To1jJhvgUVpP4KNXRZEF%2BSYNGGRYrSFFY9k6wvzhDn145d6DKXyU7EPr%2F0UstXFGq2emYlpyO0v53UDJjKZzhRhjb3keixs0jKiY1zZ6OvTZ88o9DYy0nD6XVKmOtmr9gcMfmFxcypyewn8ZNcYc55esueWF7GowIvNXW5tdbMXI5MnkQh0gV5oBFeMv3QlrtehPbv3uApXcMJThB85OebxMXpPf2CvkdRQj1yeCfSyfHez1ggaSptIpXAA1xcRqKWJVcu0C2dLJ1WDx2vKX5fu%2FS4tUvBCPHkc5C%2BDu5JCnbnHmauQw%2FajlzgY6pgFWOZL%2F3eAUszBlCWfADARam9A%2BEhOnXdL%2FBKpzvMrVmYuAaNoaVkKlV1lO9VwkAf6Hr5Ixk%2BuB0etx6ATCCcE6TxMY6E%2BnvmBShRbKjk44HWFWnFCVgsZvsROBEkygCPQQKYTDP5lO%2B%2FBfFVNpDZsYfIlur3%2FweLGfkhzaUU%2BMVwd7Src6HZq%2BeV%2BA%2BlrryfbWDinAo2COPyfL0uTxrnUgTASL5yLY&X-Amz-Signature=22a07a5dab1d252f2c60c06951aa1f81ad3fff996a7d21e036426f0a940a333d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WT535BWO%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIBAgp4%2F2Tn0hgj8qhL4IifR9ovXlpk3%2F7OFtbbcjSau7AiEAgFdt1dHdgFUlY6E4GJwn5tBIssf13vqxRFLG33udAgEq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDOupdwY0X76IQ05cOCrcA1aX%2B57M7oUNRDm%2Bj9OOygiFkmEA8QvwRcZO8xJoPG6k691ZH2fgt108zEHIAKGdQPTqem7qyU%2BY%2FLtg2Y97LsEWmUGxifmRdXkAhMptfzqmedxXtX0v3BUf%2F7ctoEmOloEBgGiTn1PyqumzPGNJfMezjb29%2FMOetrqbD4zMSM79CQuoyIzLZ6fIlCjc7vKMDdqxafmlNLwPWGqOCEDAfvxRH7LwN6l6tNL9s3S1n8r%2BpzWTPdsQR5roUWRPGV58NS4Uyn6XDrF4lRbTt9jsHA17%2FEaZhtw1bwARCp8Vu6tOnQuyqiGpdtQ6IOQB1Eha94tDE0pEPeUKUvlKRH0hoOSWWQAQvruQxwI6Rur%2BBJ0XMkIu%2BDXwWegaduKV3yM9K%2FIXFFCbOWILXk5qJSxNsXPvhIdqrp1niw1OIL8ziv91iP%2FKIpXrjoKe9i63TbAXyWf%2FD8S6KTl6BbAT%2BWzjy%2B10r1j4WBUvMwf7zod8cNS05DTXIOsKvQ4rhbTFNAgqHA2IBd8Cw%2FgOBPv7a4xnXQPdSIsbNlF88GEDs8gZFqnMjt23YC8a8ZaijmXqhpFe9EZxRVFDb%2Bz9IwcudTrCeByLkymu7D76Sj2%2FCDHw8XKpwuTPDVgVgCh1PjIvMJer5c4GOqUBiR%2BXG3hHL3kQYKkUZTw08PMvoNtDZKkx4A6q6Dmp%2BZ%2F6IYgsPxJ2WdSeT9KYWpB2eF%2B0Xt2q4EBVG9uy7KrNdTkg2lbmCTJxFGVPPuYbCmNCLDf5Ry25P16IKaBkQAgcfPc64x781L1TO7t0bPm%2BIg0lb85XcTbpZURL6l8WvxltTJSIN4zc%2FTTlCSvvXcO%2FEdPZ7JsN6CxSTWrmKq3%2Fxii45tFf&X-Amz-Signature=c8e869b73df4c7a9f255a677329365bb94a41ad8ca036e74c0cf7b928eb4f9a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WT535BWO%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIBAgp4%2F2Tn0hgj8qhL4IifR9ovXlpk3%2F7OFtbbcjSau7AiEAgFdt1dHdgFUlY6E4GJwn5tBIssf13vqxRFLG33udAgEq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDOupdwY0X76IQ05cOCrcA1aX%2B57M7oUNRDm%2Bj9OOygiFkmEA8QvwRcZO8xJoPG6k691ZH2fgt108zEHIAKGdQPTqem7qyU%2BY%2FLtg2Y97LsEWmUGxifmRdXkAhMptfzqmedxXtX0v3BUf%2F7ctoEmOloEBgGiTn1PyqumzPGNJfMezjb29%2FMOetrqbD4zMSM79CQuoyIzLZ6fIlCjc7vKMDdqxafmlNLwPWGqOCEDAfvxRH7LwN6l6tNL9s3S1n8r%2BpzWTPdsQR5roUWRPGV58NS4Uyn6XDrF4lRbTt9jsHA17%2FEaZhtw1bwARCp8Vu6tOnQuyqiGpdtQ6IOQB1Eha94tDE0pEPeUKUvlKRH0hoOSWWQAQvruQxwI6Rur%2BBJ0XMkIu%2BDXwWegaduKV3yM9K%2FIXFFCbOWILXk5qJSxNsXPvhIdqrp1niw1OIL8ziv91iP%2FKIpXrjoKe9i63TbAXyWf%2FD8S6KTl6BbAT%2BWzjy%2B10r1j4WBUvMwf7zod8cNS05DTXIOsKvQ4rhbTFNAgqHA2IBd8Cw%2FgOBPv7a4xnXQPdSIsbNlF88GEDs8gZFqnMjt23YC8a8ZaijmXqhpFe9EZxRVFDb%2Bz9IwcudTrCeByLkymu7D76Sj2%2FCDHw8XKpwuTPDVgVgCh1PjIvMJer5c4GOqUBiR%2BXG3hHL3kQYKkUZTw08PMvoNtDZKkx4A6q6Dmp%2BZ%2F6IYgsPxJ2WdSeT9KYWpB2eF%2B0Xt2q4EBVG9uy7KrNdTkg2lbmCTJxFGVPPuYbCmNCLDf5Ry25P16IKaBkQAgcfPc64x781L1TO7t0bPm%2BIg0lb85XcTbpZURL6l8WvxltTJSIN4zc%2FTTlCSvvXcO%2FEdPZ7JsN6CxSTWrmKq3%2Fxii45tFf&X-Amz-Signature=5ca8a8941aab576c94db89bc52c9b4733d3ab0d5161b4ebc7676947fce1c988f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XS3ZEWVE%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIDay6Cvryk70UOo%2F0PlUVFu4K81wpxUxPiuvKPmleCikAiA%2FlbuhUlsRRKs0c3X4FOBJyUhk9dxb46G4k7zoRH0DZir%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMP0GSL%2FbjsGxmDTSiKtwDJZ0DYcFJeuOTry8g0Q%2BhYPCCVdy%2FNNxbwHtd2qLm0wRYzMUpxSRfWRxAxSTaK4TY0V6UKFP1WOdqzENi7jyLXb3WE4xSwezrdsDuySwN5MzFhu9F%2Bu3wkI%2BEvsDPFa4ojp6M3luh8hluoTLd0kt6bXEMJ2AfsQ2YGOfvcjUpbQ2rQsLpnPcRxeDX1FLaYAEnL3j7wwhLJqhvi1ObNR3h0sjUkU6YH0O%2BEggN8NG5Xva0ZwYWdOmzw11YzLSZYvLXw5KGvMbGoi4m9qaDpW6d3ws07yCsqjaEFMo7kddE1aKPIetWmjcdzM54bE1bAFI7Yae6LhcmjtaVFT0TwE8c9daUH1ceMW2Ifk4wtMoAtVLKjz8YeHlpNIKoasqaZ4QptjVXnU0tFipTbhjXwjCQLA1mC%2F2cJVWC90JSDXXOCBw%2BLUdVYR3f9u3oaWy%2BZsHpu5GkS4030xoEtj2bOv3I6c4P8X0XDEPIPjZnUCbp0eFIrsvZOVTKOIa5djDGRALq6TdX3UjINORK%2BkwVU6acmH91iEFto2XgdeA3ymnxJRiMRCgI9vdWmaS5v6i3Lb3vIctxKYCABIAqnZ5rCTWsm7vCyLpMal3lQAu%2F8rup6V0X2DYBV8HjLnA73lwwtKnlzgY6pgHBEzTRC5sdO03GqDNBs6HPPwofc%2BjTpnM2PW0PfYbOcCwfdraKh6BOa%2FdubfcPclA4vDpb250cb2Cv4CvJEq%2FZNv4hqznogSRdMNlk84Qhh6nYFFvlY5Vf5ucR3DCVMuGsIyWDpcwAJ7S81JFNtDdoDqx6D9tQ4PoisBfH22dyuJPqqPnqv4vUffTULTKsmhXYyYIZm81lE4vNaZXiIv5XmGSw4kaZ&X-Amz-Signature=12a3fc7fd3893695e5736a5a64dc60a44f85a8d817493075dde49c2ae4eda351&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Z3SRQ5W%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQD4uNJVUC5in%2FgDljZEY%2Fh%2F%2BH%2BEEVTQuDR6tqP6p2XtiQIhAM4698w6zqqegKinwtuZBxQO1DCoM7wHbvUalLm3R0t4Kv8DCDUQABoMNjM3NDIzMTgzODA1IgxUGfQ1Hd0f3nDiX8Eq3AMBXyxlrLA2r1xKB6%2FP4gZimYCp445oVuqvWfGcBlci4r7s%2F2AeQTR9hpWKNV1gXk6K92hMxKmzeZIYOZrk%2FJ%2FboIkrNS8RSYcfOls6iHZrRVJc9cfCdxrMH1M4Pb8vsp6r0G7LanXVwi0ZLF6HzJD%2BNThV8jFj5GQifYgOdmNugoIam8BLdCinxQRqfXyrYXH2cKTO8nW%2BngfN%2BW421YdvYv6wL4Py6SYovGEs1D%2BhPr1fB2WNdozRghpCwdK0liINIPF6q9QgimM4dhvx7vaDsmZWULqCM5o1XH1wy4z8jOhPhml6giWu0TV7BhM5D0MA80431bMkCh9yrfsz6ArHT%2B9xvG5AKHLau1e4D6ybd04Mut4Rn1e%2FJAiIAc%2BmW2xNozXrlq5P9JP8MaQuW9tOPgp57mBB4C3BPOOfuCJbF1gX5FnOiO8r6BE4Jhlu6eeNSl308xC3Rw5f2QaYY%2FFgkSxpEnhMhbJebCCF4JkuUwN2SDTl80MNStIW5jhjBiy4HqawJGgFLMWRlE9JvfEsw6UfSyQF9LMRo47GaE8VkV9ctJtK5cHAqfCAPF2hrgExrNoeXTTO9nbtUkZvjzpUOiMYDh%2B2pvWU8eniToKWR5DiwYN5q4dCms%2FvPDCsq%2BXOBjqkAVG3j%2B4YEdHkjrDlXIGHoKUpD9w%2FTlm4w3ZK8kGRY01fXX31wFPTLWw6Sp58EQvPx3dvvnYWdKoY0F9jNmYd5pefUE26Hhcfhx134YXgjus6ONe33iM7TlQSgS7vEwByVY6gsKPYsVK4x4ThT0CrqaMjVqxkK6RFDsrW8SYd8rxoRuw9MPnP9e35iGu6L15E%2F%2BB06wN2NVxv1Q5gHIqrp%2BD3x0nR&X-Amz-Signature=241c04461fd63e1bb4394372fd814d156c7a35f8eca8e9539aaa8327c1c69b73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665F4WVC4Y%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDWyNOU1LchicXGs%2FjIcgEHze3HV%2FnKwBgVzJFJ%2BbBOxQIgaJovk9qchcxPCo7B8H3YWSQE2eVbeTuxmy0qwfv%2FkT4q%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDHARycFH34XTz1lDwSrcAzcG2KaM%2BEOtVeEJNKLSdnsbXKrmhQt3f1yAIMiAuGENRi5q8944V0yP4F7rqT7h%2B5FKsXi%2FwT48sFNFXhZ48mL46sd6bmO0Jmi%2FjIv6N1%2Fcl5otspxyrN%2F%2Bu%2BSLAIFXrSSnjktkdpKWFKIq2AAX78DA5PasKRRCupt53fuaSxgAOQmknVbOXZeMDDWdgxwXvlkZVW14Utpa9aTkYQd3f%2BO8l3lOXDDgoZ7BDYb761qpYzf93bv0%2BL%2BWJ0lto%2BYPYnEpgxDceqYRhkhwNWyOJ8H3ZdGqlDGcIdDY8%2BOLgRxi4FSkoY47zN8kAGfm%2FjqCpmjViG%2FKp4X6z4QkARQqtTi3HJeaADFK8v2nbiHBHhww6DWYuy3%2BK3nOqE9wCOxoasAQCaCilZbXAJitJP97CJGAkNNTaZ%2FCilrKrUL2EmKGo16K6wQcDqApQwKG4kd0q0OVkKuC%2F%2BiTkhOnbTEXfw0urFOB5mIUql7gFgDYQi8Z61FSf%2B12WT4iB9YqPpzY2cQKZ69BE5qR7Z%2BcX3Cp6SG5vinWoo6hlydCvYGDrzWFxgIBUbiFi3KfopERwfXefPfg2L6RDecCSKBrKXEhAUGan9POA5ujT9xmCAZTh%2BkdOFsMbsL0VPMzUxdkMPap5c4GOqUBmsTua%2Fx5wmuqqI8h%2FjTbyJNzp7bspPkNL900l3LhvEJwUxLpK3H1rVYNgpYzWAGTP6EQ19JYpNn80AItlfeZ6C%2FeVJFonhG%2B92lLHHUS%2F9XRJEnADnvekTkqFobMf7YWqUk7DBTiYlcYyYQrmYN%2BZ2kh3ffOjCI9l3r1u5uXx4aKm4AVA1Ew7OBx9anlEzCW6xqIymUrAteOpcwhJj98oKtNuzKb&X-Amz-Signature=e6eff6d2bc25852db139a34f65e965f3c0ab87b9f8a528a93328da689b263a2b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZA2HJGQ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCdJVrkFlhKXB7gI16Y2U4Kb4oHTuktUULGuuP1js26bQIhAIg234n8rG%2FqskPnLxP2d3qXlfE61n9GHreJKtQ7n5rCKv8DCDUQABoMNjM3NDIzMTgzODA1Igx61S%2BzfRcfev%2BzPVUq3AOzDqd9Xyn25Xn7r3N8ZSHw7OdWPHPU%2FpUdum68HKxK8j4IYGTYodkYxNV05XsqJ5dwlkmbZWCiR%2F9iauJsfGD6oYCcr6Xx0J0jNCIgcWRLz81bhPuqyKMKtSf5BAt%2Bi%2BP2Nz%2FEt8K13NS4Kt%2FWP81B7Y3%2B4kNLffmdmurPukGEDUEAYfE6bqUqe6RapsAIO5VkDAHf9%2FgYuj4s%2BVMxapLKEBy8chaTvga2ar4fgvcZvYITpnKXZw%2FVp1aX01%2FbtZYk06MIMrrKdPs8y3zg7tg2NJcKn11Uyq9OpiVMspp9hRDQwks%2FmoeVQBAPE6sruq%2Ft4w7vYaOsfLMocd7nVgJ4XbkYYevAoXMsqijCFeTqRcx97jqcYozqixv0QJU4BdHy0PFxGdP72J9bQW6m3J5eSd%2FyMpFjSLqLXAUR9dL4XJQvXKGWIk4acfy1YKan9vd4afg0stBDbzWQ2RHVng0%2F6Oc8mvimQs0PCCi0262nAdbmhQLfltk56WHmK0zi0up%2BRJVrnVDl25VWOa7Xi7ossfT8bwkLa3JhkwXVTpWS4wOjW4hoxqdvbHt6GUhpyyKIx4UCNZdXki5Smh101eylvBFEX%2BlytYbUKs636Z5MrMJ4XdmAalH6w5JyRzDRqOXOBjqkAWM9uIKxcvjo6px4AQubshC5reqWUMwHdgnrT4Dpuwza7vqUFAcwBEknp3wR8SY%2B%2BW9pO5h7BgDH7cg3l8REpsfPN29ycjjAHJrXuF1gn7XOnm77tBisoPxT7BXe3Zej%2FtIGLXA9SfkTkXhPh4Alt%2Bw7pj316S2ZlVlguCXqLsqbQhs76Q5J9KTONsvsyLWc4NUs%2F2tp7nG1Zul0Ht6iXvXPIuzM&X-Amz-Signature=8cd4244393d2f4e2bcf8613f444e4779ee231dc6b5dafa5aff8cb74217d98d4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZA2HJGQ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCdJVrkFlhKXB7gI16Y2U4Kb4oHTuktUULGuuP1js26bQIhAIg234n8rG%2FqskPnLxP2d3qXlfE61n9GHreJKtQ7n5rCKv8DCDUQABoMNjM3NDIzMTgzODA1Igx61S%2BzfRcfev%2BzPVUq3AOzDqd9Xyn25Xn7r3N8ZSHw7OdWPHPU%2FpUdum68HKxK8j4IYGTYodkYxNV05XsqJ5dwlkmbZWCiR%2F9iauJsfGD6oYCcr6Xx0J0jNCIgcWRLz81bhPuqyKMKtSf5BAt%2Bi%2BP2Nz%2FEt8K13NS4Kt%2FWP81B7Y3%2B4kNLffmdmurPukGEDUEAYfE6bqUqe6RapsAIO5VkDAHf9%2FgYuj4s%2BVMxapLKEBy8chaTvga2ar4fgvcZvYITpnKXZw%2FVp1aX01%2FbtZYk06MIMrrKdPs8y3zg7tg2NJcKn11Uyq9OpiVMspp9hRDQwks%2FmoeVQBAPE6sruq%2Ft4w7vYaOsfLMocd7nVgJ4XbkYYevAoXMsqijCFeTqRcx97jqcYozqixv0QJU4BdHy0PFxGdP72J9bQW6m3J5eSd%2FyMpFjSLqLXAUR9dL4XJQvXKGWIk4acfy1YKan9vd4afg0stBDbzWQ2RHVng0%2F6Oc8mvimQs0PCCi0262nAdbmhQLfltk56WHmK0zi0up%2BRJVrnVDl25VWOa7Xi7ossfT8bwkLa3JhkwXVTpWS4wOjW4hoxqdvbHt6GUhpyyKIx4UCNZdXki5Smh101eylvBFEX%2BlytYbUKs636Z5MrMJ4XdmAalH6w5JyRzDRqOXOBjqkAWM9uIKxcvjo6px4AQubshC5reqWUMwHdgnrT4Dpuwza7vqUFAcwBEknp3wR8SY%2B%2BW9pO5h7BgDH7cg3l8REpsfPN29ycjjAHJrXuF1gn7XOnm77tBisoPxT7BXe3Zej%2FtIGLXA9SfkTkXhPh4Alt%2Bw7pj316S2ZlVlguCXqLsqbQhs76Q5J9KTONsvsyLWc4NUs%2F2tp7nG1Zul0Ht6iXvXPIuzM&X-Amz-Signature=50983606973ca96cbc09cc2ea708bed7b542fce524522fdfd854f8c0047c80af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VL6KPU7U%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIFj%2BJPRhGGEOOtl%2Fewmh463NF4tWAnxD6j64%2FFkC1YdRAiEAq%2B2bGlcXEddMKI5AL0w1RuqygnMY48QffOVyBWeUvesq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDL968%2BY5K7DCqfcYgCrcA0%2Fq6z%2Bzve0FP8m4TGWcQv7%2BrOlGQhQqrb4%2BUnjjtrzv14Fuv1jGCU0azlDxtMvTpTTqJ5DJjhoa48edMKNgp5wx0oo0j58uO9X8OT1AarcEeVhmuFT9eoeHslnSAkh9TSzJMod4Ofgh8ZWLUUpGuvo7QnMOYpqtB1zjNwPFuTrK2zy2CcTUc7LIcyZ36KmzAij9D9vXb8yVDtluHdiXjxC6v4IvFLkLRybv3lAmOA0L77ljcplveajtqkDkBeo9zyubNu69pOF%2B2RSxcgeoWbWVUXPhKdUuICf4KY13ZqOP05n4BjwbMGbGcupBscfblp64Sb0vTHDIfYVmLGRZAtA3cjvAjutkSJ6EAPDqNA2tGj20yveqNTOm6ACQ8AMSBgq%2F2051HJ49gXvoN0IqIRnQ3Jmr1r8v3GmMrpCT8QI780lMQYC%2FZLdylvRwBhhQ9ULZe7aMN1DQm5nei03kQJmx9GnBZ3Yj0YUyy0QtOa7YdoqSftu4jMFcweVQqsGfppO45fFxSv7c2whK%2FoaHZ2qzQ13kWc0XPPulL1oJ65YqmagmgVHwAH3aLD2D%2BszY2umHru%2BHueSt2k0BnAwRYWWgwBjDsPuAT%2BaUZUQXHMlgDOroMIC3y%2FahS3JBMNep5c4GOqUBaAIPJ7lm1P2vi8hKAAWAXv3Ydyid2ZE8EQ5xBmw8MyDRPFrLNLtV%2BmTXyLNkNTtK6WCaHVopKaUzKGsMemZrdLdBWDnQg716icd6szsK3Z5yvSmk4545wwOiCMrnXxrN90p33vsxZDTxqP0JJ03K7X7EOa%2BlyBUMkgrRGFKSW%2FGFSz56yLXXryodC9jxje9vmzJlhdjYuPugu54WRrVe8B8VO%2FQR&X-Amz-Signature=d32a60cf015cd8a3058c1e45ba2e3806a258de1e50875235a97bdf70caee35ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NUL7S2J%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDqPs7s6Rkvbh6CekACyx44vSglt3UhJcm9QnGTicBE2wIgcSmtYztRc9iu926Cl8OQdErOtd06LGvuIbTOKoLE0iIq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDF0l%2FHD9t8dmvTWNgyrcA4Um13TapvDuUBzuAHbo3D9oMSIuvPtXXyegVIFN8GJDfdsYjSYVGgOGN9pcoLxt38S1m7QQQ2asIcKbR%2BwS3gK30BD1yxD098lfanVmY3wvmCV7szk2JeAaEY6hGvXJ1eJ4Lt2SEAgHPCFTsuXBcmPrzTvMPVAcHnFd%2FaKnuzsai8mHPC5Lue61%2FJb86H7mPPkqeVDGgx0ukvTUnoiHflDgpQJYQG7M3mbPMtvvtJD2IVLXuS7Pq6P%2B%2B%2Bl21BQMqU67fbtz8NpwM8i9Ree1KEaKdXw66x001oOGo8%2FW4w%2Fc8%2F3tE9S%2FqZS8njz%2BavGrY604kxwoFVyk80r9eT1qnQAET%2FJm2idyvv8sVAZJ24%2BDbkci1TJgSqtk%2FS0p8rkQFQvZeRJZL657ZTNdwZ7tWbiBDvbRc9tAMp5or9%2BUraia78xLH0rNv4tnsxgBwd6dOhdwRr%2BU33duGJNyLqmvXQu2cwl%2BSKOlKsyf0lEVYBmPsDCfNCEfFh1kPK5Vz8ZHgho%2Bbg5VHe5mZWX15MC2rWwve88ck1iDwvfpt5wkAi3NevFg8aDTWc%2FwztqSnGy%2FhjtsDDDi1fCuo%2FLMepEpTMQ2zqlgvrn7JQW0A3aHbvUFfUIfL02d2%2B%2BB%2B6SyMMmr5c4GOqUBSNKCtywRxHDF75kxQahnTwMBZ%2BTf5ucbQ9Yn%2BeICXUIQswLnzDOK44nK9j301PFYD9K%2BJYPNuB6jK3aIRZ3%2BiIse4iYaIzGZXsw4cAUBR0IpoPFLiIDXAOxCBI%2BamwMh8CgNlaxQXra56Hn9utYDpNc8QWN9NG9G6cMfbjXJELclCR6nNnYsO4me0sIHUmt3wlztCsxCgW3MuCcq0ioRoM5yEDyJ&X-Amz-Signature=10ecc6b05522e63cba3d38e5571dd9e30c11b8416bc4bfb3bd5a303afc933773&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NUL7S2J%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDqPs7s6Rkvbh6CekACyx44vSglt3UhJcm9QnGTicBE2wIgcSmtYztRc9iu926Cl8OQdErOtd06LGvuIbTOKoLE0iIq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDF0l%2FHD9t8dmvTWNgyrcA4Um13TapvDuUBzuAHbo3D9oMSIuvPtXXyegVIFN8GJDfdsYjSYVGgOGN9pcoLxt38S1m7QQQ2asIcKbR%2BwS3gK30BD1yxD098lfanVmY3wvmCV7szk2JeAaEY6hGvXJ1eJ4Lt2SEAgHPCFTsuXBcmPrzTvMPVAcHnFd%2FaKnuzsai8mHPC5Lue61%2FJb86H7mPPkqeVDGgx0ukvTUnoiHflDgpQJYQG7M3mbPMtvvtJD2IVLXuS7Pq6P%2B%2B%2Bl21BQMqU67fbtz8NpwM8i9Ree1KEaKdXw66x001oOGo8%2FW4w%2Fc8%2F3tE9S%2FqZS8njz%2BavGrY604kxwoFVyk80r9eT1qnQAET%2FJm2idyvv8sVAZJ24%2BDbkci1TJgSqtk%2FS0p8rkQFQvZeRJZL657ZTNdwZ7tWbiBDvbRc9tAMp5or9%2BUraia78xLH0rNv4tnsxgBwd6dOhdwRr%2BU33duGJNyLqmvXQu2cwl%2BSKOlKsyf0lEVYBmPsDCfNCEfFh1kPK5Vz8ZHgho%2Bbg5VHe5mZWX15MC2rWwve88ck1iDwvfpt5wkAi3NevFg8aDTWc%2FwztqSnGy%2FhjtsDDDi1fCuo%2FLMepEpTMQ2zqlgvrn7JQW0A3aHbvUFfUIfL02d2%2B%2BB%2B6SyMMmr5c4GOqUBSNKCtywRxHDF75kxQahnTwMBZ%2BTf5ucbQ9Yn%2BeICXUIQswLnzDOK44nK9j301PFYD9K%2BJYPNuB6jK3aIRZ3%2BiIse4iYaIzGZXsw4cAUBR0IpoPFLiIDXAOxCBI%2BamwMh8CgNlaxQXra56Hn9utYDpNc8QWN9NG9G6cMfbjXJELclCR6nNnYsO4me0sIHUmt3wlztCsxCgW3MuCcq0ioRoM5yEDyJ&X-Amz-Signature=10ecc6b05522e63cba3d38e5571dd9e30c11b8416bc4bfb3bd5a303afc933773&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXQ4VOA5%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T212332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIDawZdlw61Py4HkxKQGn11nccP2fCah%2Foe2w%2FoFSMdkxAiBLxIleJO2D6QePwvTPi%2BhumuZlFbiJu6oAGmqarFkzaCr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMSuuPBAvl0BaYnkt0KtwD1MK3mT0fLWQNX7Tj8H61uQgLOsvydAeb%2FXTTg4LC0XcW%2FIA2WASGG8OO7NX7SOEtk3h1eVjTL2vklRbbOt%2FaY3WM9o5nmnkwpvv2PDI3q%2BC4y9rLJ4swidtHc4tBxW1JMFf6FJ%2FHoUnm%2Fq0hsnIPeuFkjgajrgaOkCAm6CyQZQ6AAizkSvBJTvLzKtvEvVoXJUgabzKF6yO7GlT2VcFaMHuRkbzdYGSnrLB8fsL1VllDrHxt94t0dz8CMpFogfTEvPMBHwvg%2FpOobbeCRMxHos0AZuH6f3YP035cGIuUXqc23xXPrKiu4G0rnJnqsn8sSbhlGCMhgXycEEvpbe5xZq3fKO0qS6FY8wwPBq14nPHHSd1fPSsHW0Clpvvxbw4e9LZn1TzeFRQrggF8corGzyhmKKGFxKiomw7DqJUf%2Bal0gOcNoGAwYTQZlcSEMKApxwc1xd%2BLbunaKB3vGUBIY8Ybwgep9vX5jWu5d%2BZO%2BDZXWMo4dPhiwjllHKo0EMJ5SiOLmrUjZA7w0SJUaup09Rm19nJg7qD77vyYMievai%2BsmWKuHwoqwhSFJBKT3FXkJCv%2FZaR1shcaGE3wZfFGg5LIZgiKMTcNW%2FLQDtowRsKOlU8iW5yuv3z3hOsw96nlzgY6pgGaZvIvHu1trK3AAq7ZagOLnFhtl0QW9MmWJYcUPx6VBgYNiRpkP8EcBVbiob%2FyPnBDRkih3XiAjKUIVtG%2Be%2BJ%2BiB1cZFdp0WCfa4oFmGNBgOP9qC%2FWzhPdpDVvFmmcNvGF%2B7hpdxqe1zR8pvnv%2BJBDpE7MgDPfxu2Iaha0KRifKP2BIeWnlDKamhhNrxpp5de3UjyJs3tlLplXMRDehscN1IsxF71r&X-Amz-Signature=dafa3e70df4d836608e20fef994ace9da0b9246a7bdb53e6da46e0ac34c2c937&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

