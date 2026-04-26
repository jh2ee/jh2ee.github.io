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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEHRJB6P%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEit2QemjWRXdXlgcnENv9H3BTJHV8WZfJdXfdpUpx7gAiAZQlLwVtbHHYIiK0iiXur2a0M1PbCpoQNmBxs9BSObISqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAO9DZXb8JERmabNLKtwDRb6U4ZcqTtqcGrsKBvdQb71vs4nTgmH2ptKsJFVAqHYjz0ozehp1l5SjBjxousBy9QOAla26qYD9dKPQ9MkcWARmy6mkG7hSUtxnfy8JDg68BOEjcocTWw7BGwmBXktpTkvHzNlg%2FFV7C84dREJT7Czn1Lrc7BphegJSJLtUbSX6vC69cCzU9B%2FgtqaXsNZ1YcfP8eknwbUc3Fm%2Faa9O5P4fC1OQPUaffmuIA8wkfNryZlEohijJy5bn%2BkyqGCn0svCPDBArkF1gZNOokLfOss8Z0EyWX2ZgeNyUI3nT8MkQFZwz4%2BHM%2BZBT3z7nCDmYTeTtTwGpnJeGXlyimpzxhwL68yzvpgveFnOp7hzyPeQJMF6wq2s5r%2BS6WaNwk72pOWBdjUxjT3pG6w3wReD0QAQLL0UCSS4BmhGkzPzjdiXs0Gyt3f278HjvV3FXK3JnrG4%2F16haOpnfUwml89w1HSgblG6gQmPs5iRoUcULyRUqXXZES2VBIdFnjdNyrBUgSF79s8YnDvI%2Fytj7xNEkUvOG3XI4sTUoVRPLNzePljJYZvSTjdBHT1LfkxrJtNHi718ocUUctTzaivlRJnxClNq%2FXQe2t0yHSg8HYKK7h53Lz%2Fm%2F06RGnCFjQRQw7fy3zwY6pgHb9iUZdjq3mhHdIgrobJ3I5DAJNFKSRx%2FvIOMjsqMcIDQ7OQHi7AGf2Uc4%2FmOcQbedy9J24rJl16gD3Saxv6E7KCvz0RyGPnKRw7CLPh0Uae3ZNiE%2Fr7tnjaDBr13seVo%2BDVXq5HZDOmf2nOc1WrKIEXVM4shLXlBkZt7UBJhiiTE4ZGd9Qqax0yuRbkyn1D31BAypgiLb5bf3hDHKlWuB1QWSv9aV&X-Amz-Signature=4caebeae1dc3c107df16818eb7d4da4784ecd75213ff9040457cb3044f453738&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEHRJB6P%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEit2QemjWRXdXlgcnENv9H3BTJHV8WZfJdXfdpUpx7gAiAZQlLwVtbHHYIiK0iiXur2a0M1PbCpoQNmBxs9BSObISqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAO9DZXb8JERmabNLKtwDRb6U4ZcqTtqcGrsKBvdQb71vs4nTgmH2ptKsJFVAqHYjz0ozehp1l5SjBjxousBy9QOAla26qYD9dKPQ9MkcWARmy6mkG7hSUtxnfy8JDg68BOEjcocTWw7BGwmBXktpTkvHzNlg%2FFV7C84dREJT7Czn1Lrc7BphegJSJLtUbSX6vC69cCzU9B%2FgtqaXsNZ1YcfP8eknwbUc3Fm%2Faa9O5P4fC1OQPUaffmuIA8wkfNryZlEohijJy5bn%2BkyqGCn0svCPDBArkF1gZNOokLfOss8Z0EyWX2ZgeNyUI3nT8MkQFZwz4%2BHM%2BZBT3z7nCDmYTeTtTwGpnJeGXlyimpzxhwL68yzvpgveFnOp7hzyPeQJMF6wq2s5r%2BS6WaNwk72pOWBdjUxjT3pG6w3wReD0QAQLL0UCSS4BmhGkzPzjdiXs0Gyt3f278HjvV3FXK3JnrG4%2F16haOpnfUwml89w1HSgblG6gQmPs5iRoUcULyRUqXXZES2VBIdFnjdNyrBUgSF79s8YnDvI%2Fytj7xNEkUvOG3XI4sTUoVRPLNzePljJYZvSTjdBHT1LfkxrJtNHi718ocUUctTzaivlRJnxClNq%2FXQe2t0yHSg8HYKK7h53Lz%2Fm%2F06RGnCFjQRQw7fy3zwY6pgHb9iUZdjq3mhHdIgrobJ3I5DAJNFKSRx%2FvIOMjsqMcIDQ7OQHi7AGf2Uc4%2FmOcQbedy9J24rJl16gD3Saxv6E7KCvz0RyGPnKRw7CLPh0Uae3ZNiE%2Fr7tnjaDBr13seVo%2BDVXq5HZDOmf2nOc1WrKIEXVM4shLXlBkZt7UBJhiiTE4ZGd9Qqax0yuRbkyn1D31BAypgiLb5bf3hDHKlWuB1QWSv9aV&X-Amz-Signature=4caebeae1dc3c107df16818eb7d4da4784ecd75213ff9040457cb3044f453738&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPA26R3F%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGuAgJE52DDPuVYZ7h9Dmd3gmZu6csndlPtOpEo3slyhAiEAlSY1rCGmBtumgJzxSo2n7D%2BJPlOWPRETakA5yiYJ5bIqiAQIsP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOaOfqkTjRKA7wbk%2FCrcA%2BKzD4DjHF%2BlVx53Zyd1JNVDQjFrz66QnAW73fc7r2sWzlMeP%2B%2FipcgSIYxb7aCHohyc%2BjbZNAOGb%2FvYygURwNCdz24pvawFjTzy%2BTjLx%2FXGJp1Zs%2FTNxDSk6NtSBBixolYKnzmUyaJlAzU2dKnGnhcWmUzkceVs2XzUKMOKkVbsVigg2Ubf2bvNQefB1Y9iXa03qYYPQx92DRKfqfmlNNVxGVgXMtX2BrvVvduTaA8dmE08jmhGjWkj1i9Q%2F1lukGlMJ5HqkBF0%2Brp0LhEcN1H6gZzz4mMa7VPdLTsCW%2BIOQ7lBW5cMC2syXKobaNnVQ6hSjq1HqGMTAcjjN6M%2B0N8IygcoQolQKxreyf31m3i88RQKJjJDXR909X2ML5bb%2BhR8VDYOunTqbHmj2bOq3wBHnRUbcygc91xVEXuKwHrxuqix2Wo3Io%2FWPXGTcf4OKOJTe5V%2FtpTFVhZkrFlupFQxqUPapv1MJ9CBPZXfR9aa78llUFYw%2FtJEt%2F0Btwt8RcQixRJb%2BbrmbUvUZatRGE%2BBCHvXjTAuZdJAq1qrUaByWISdnJ1dEVKbmwiwNvZjoqxqPe8oQXZJenhzav1w8y18OGHy9BzCxc7XhkmoCN94gs7aKYqc58cO2zKsMLXLuM8GOqUBCaY3nHtBHTTjcA0tpXdh%2BIL%2FKamDOTQnIo9KFlUxyVZtxqyCW6cMs6OxMirjTln90stGdc5J2K2r81Y%2BEQ0mWy1z%2BFxOlx%2BvkE0p3DnQk6uE%2BwrEVdgwWJJCpzbkl8Wi%2BzpPNlki9KtvXkKN71%2FIWnP2YupPgnaZaVgr1OKzlpZFm2ko1DRim5nNuU0FZ3CYmcC1He79O%2BDrvoa0ymVyRfZTcA3H&X-Amz-Signature=d49a66728e50f9cd430a76aff83eb942b84976873d24d0ab7b6e998725e7da23&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYVJWQFC%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCMdl6bjkMIq%2B245bqsQ0VK%2FBmXHd93dArAUNfqWNcYQwIhAMqtuI6eK5rwCYov3O8rsFYUkQsh0J%2BkyoiUji4yF%2BT9KogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxNxJf4J1l8m9CjiPcq3AO3utr7oW%2FEiUXhnCHbrfJoUfzLY61%2FT1O7AyUi1ZpeDlsmoMzqW8LnmApM2v2zpbQkm9Xaobxqbz2GfpnKp3oM0FPo%2B%2B8GD%2FDyvxzrAuPUdX22li%2BU2ttZDyluIWF09WvCdHaRiBcSMhz4fAbZelwPoOor5JK%2B4pwakO1C0w%2B5BB0LsU3iiF4jZOzzOcyMorMqq6S68YRrESeI8Qbv9TdySKfyff1pXdNkMhpMgs9VVuOvED7qV1zcJ9xF38g0pqCULe%2FzZG%2BDB9YJcuURjr%2FqWsd6oH84nyzUrEsUsu4X5dqFF0UZtvOwCOfHYbgO29Vyu9ZdvreklC9wroVhsylLl%2FguFmcswEVk%2BosIO1RbTUENvCtyfsUWfRcVQ2iJM1bPVe9ULUgHsMGsxaoUn81oxRJGk2pqyvRoRHYpwmDM3v2Vv0FZRkz2mu%2BMTDpT0fpCQJNezf%2BVlMozxh%2BINDjxBbbJ2WoyV9XpuvZP7kd2gTr0KMnNkkJ7pqObJafIaK7Rlnq%2F6%2FCtvP%2B39rNlQw6rz%2FbaXWUMRK5M2nd%2B5FjBTbHX04109XGlYIkc3YT93AQDfJUcjypkrVgEGejS3F9nwKqJKaPAZDHXCLX3E50aygg%2BKtapsPt8WVXQZDCz%2FbfPBjqkAcrrMI000lMzIfglOHeFZSfFhbqce1SqmfrHkPgCgJquU68MObP0zXHe7hsyMR6%2FfgjfI6%2F55cNGMzUmQqKf0JL6fN113iACUAFFHvU6xyD5i3RjLnPn%2F5KOLqpi9ZMLjcI67FR%2B5%2BWAFHmgpIctpqd74ndek1I%2Boao7BpMDoxfI7XSMT6B3cGvOhmc%2BYz%2BI71snHtA%2FiK2gNzIGMZsXmjGFQHEj&X-Amz-Signature=ce985e01de6148e324d5add6f373db9352089b77947f6d5cd3e83d555f42ceac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYVJWQFC%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCMdl6bjkMIq%2B245bqsQ0VK%2FBmXHd93dArAUNfqWNcYQwIhAMqtuI6eK5rwCYov3O8rsFYUkQsh0J%2BkyoiUji4yF%2BT9KogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxNxJf4J1l8m9CjiPcq3AO3utr7oW%2FEiUXhnCHbrfJoUfzLY61%2FT1O7AyUi1ZpeDlsmoMzqW8LnmApM2v2zpbQkm9Xaobxqbz2GfpnKp3oM0FPo%2B%2B8GD%2FDyvxzrAuPUdX22li%2BU2ttZDyluIWF09WvCdHaRiBcSMhz4fAbZelwPoOor5JK%2B4pwakO1C0w%2B5BB0LsU3iiF4jZOzzOcyMorMqq6S68YRrESeI8Qbv9TdySKfyff1pXdNkMhpMgs9VVuOvED7qV1zcJ9xF38g0pqCULe%2FzZG%2BDB9YJcuURjr%2FqWsd6oH84nyzUrEsUsu4X5dqFF0UZtvOwCOfHYbgO29Vyu9ZdvreklC9wroVhsylLl%2FguFmcswEVk%2BosIO1RbTUENvCtyfsUWfRcVQ2iJM1bPVe9ULUgHsMGsxaoUn81oxRJGk2pqyvRoRHYpwmDM3v2Vv0FZRkz2mu%2BMTDpT0fpCQJNezf%2BVlMozxh%2BINDjxBbbJ2WoyV9XpuvZP7kd2gTr0KMnNkkJ7pqObJafIaK7Rlnq%2F6%2FCtvP%2B39rNlQw6rz%2FbaXWUMRK5M2nd%2B5FjBTbHX04109XGlYIkc3YT93AQDfJUcjypkrVgEGejS3F9nwKqJKaPAZDHXCLX3E50aygg%2BKtapsPt8WVXQZDCz%2FbfPBjqkAcrrMI000lMzIfglOHeFZSfFhbqce1SqmfrHkPgCgJquU68MObP0zXHe7hsyMR6%2FfgjfI6%2F55cNGMzUmQqKf0JL6fN113iACUAFFHvU6xyD5i3RjLnPn%2F5KOLqpi9ZMLjcI67FR%2B5%2BWAFHmgpIctpqd74ndek1I%2Boao7BpMDoxfI7XSMT6B3cGvOhmc%2BYz%2BI71snHtA%2FiK2gNzIGMZsXmjGFQHEj&X-Amz-Signature=94e1fddf215a384ec1f843f7d12af9735c5f191da3710855ad6bbf7943748684&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZCEG423%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB7Bn9DvTfQnM7sRHR5DZ3w5nPTnFHdG4ZK7fMIxtBkdAiEA0O%2FjD9zRXj4w803qE%2Fyr%2BiTJFijRhkwJNT25cI%2FYVs0qiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOtz%2BMcDujiOa2cL%2BCrcA7G2%2FSPpWq%2Be7B4q7a9n20LwENkU%2BJfnI8xNRk8XxV%2FNICs3Cg7UydFPlmQGjKjgwZgQyULtpiv9bvDmdFxCkkTkl9pKtla3HvjaV5k%2FD%2Bl2pzWozkby2s8enkKqhsm0xzh3BxsBi3DwPNffT88FJbuT0r0HehTs2k10W%2BlBm8JF9SuXobNzREbCYV%2BpdlGkqhcLjy3IHDoZQEez653AqEmqq3OcTiZnyZtvEww%2BX6ZzGeHOQUuKvgevRJhWYNuelFFTgA6%2Fb0az45FSNlf9C21tNRxQJEs7%2FRocW%2B35u7zl8RvHl7fC6r8jFGzLg4Y8SQaAb36FowRxQ%2FlyoNIbB4raidskQLPCb%2Bh60tQ3okhtpIEHMXJo8JWV0IUpM%2F%2FgMrG9%2FiysqEjOis%2FvWPsUmhKTVouKc4141gFb8UDstYNjh2GL6MsWa%2F1L3EUHm7IfYkdpDprOdWT0jXOpFbehkF2wjcyB1lKjyjTJItboFyjmwLVCAvTGybkDBJp76rvP3XKixycUDNkfh1tt4GfeoqCk19G5pJUYhD4OIpxnZaoc2H%2BjHybsRLdYEbqnDBJkbhYUe6LkzUnMjfTn%2FT2LAXHf%2F2wz64n86qtGUm3NtwYHWStaF8riJQhqCV3kMJT9t88GOqUB2ifglZs5Z26U6ZqYOkCTHL98Bfpw3GDrCW0bHp3N%2FqTvQv3gjBqBAYOdh8usDsVqO7pAureMbYd6MGTougAde6g%2BwD3ZrmHHOB9skTd8iYF8HX0d6%2B4eFpmd1awdC2YmQvUs4kypU%2FBccdepvvonQLcTpzaIPs9tdzCC9C0%2FWe%2BUfjtCkgf0T%2BXzNV%2Fhs%2FX69jibMtN93qMzvWFiVgPS5%2B2aLkKO&X-Amz-Signature=cf476403e0e7476711e41d047c3ff9c0b72d809ca84f0e4104d800808a4a85b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XL7V2T4U%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDlBziMfQ804JCtMUNcyj%2FntofPzhKw%2BPFGW0Fvfg4KqAiAtpr7AewVIZT3%2FRMGm0jENK2PM%2FPNmlAC8rw%2BBm2qoCyqIBAiu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMP%2FJueqL6LFrv%2FQkBKtwDfLnUCkjLrPb5jPeu4Fh6ucIw8lPa3KqAZ69kqAbP0w%2BQ12o7mfJLEOzSI27WXNJHroTMWUl52tv5sRw8P1yYjjhQqfumvx1C7wP7OM4jKCmnFu9jrxUDCn0qXlfAtDOWJA%2FJEY9jpzGh12lV3X4QPbfdbMI6452ljiR4LDwaPoPKxk60h0fIq7Ef2DvbFLdD%2BHIqapEJw78h1D6NrhitrB%2Fc4CZOQnYh38xLqacQL8oNKzZ0Da6%2FgYRim8hfzKad6sd3i98eNSfzXoQY59%2FpUymIritNJuQJ2AVTaBKgqmmIkJHJPfFJsfQ0k1te7%2B06eNfFk6jELBHPupyTVqgrtTLlTY2mUwbs8HwxUQXvEfFUXtXn15ur98VKHBVstICSQcyhmiVN77uX5ye2fc37RPb54YjCWXibm4HBHJNVzdLY%2Fb9UxgZFOh2wd1snlmkcUKSaMggMJBrEGlKpl3w2OJ1TLbn7DPVB2IjXY4FV%2FhVM0vMorP8BXwZ6TGfIrM7a6OMqaIaNI68P4xFTiGtud4INqPPmqoXdKJfkRh5qqQUsLIXiXp%2FfXD44SSlXA%2Fkqo4k3BKzUYg%2FhnIjqbgYO4mGmMGzin52O%2BVQzacnWFJnuKXwX8ELQdV3%2FGzUwnpy4zwY6pgGJo1UrInxQXPuoknfVWmV2wlnYs0cZAJIviNdDlpntl0Kg5PEHyxHDOGoCYI0l345w%2FBOjGsG%2FsiHAwiM4nDZZqYr7q04XWdtpHgMXeXdNPnsbwwLOCg1IFIsrG99zLOHyLAsZ7ygB839pS9Hy4bxD1%2Fgs0ZG19orZpLDeXYbD4uZLA92270g5w7dkMVRaHCyIe5aPtK7Fq6dIbvbYbSYPgm2KzoXs&X-Amz-Signature=dbad860d20a417d53e5ff9905cab8a3a10c94de85afab970083eb4d0927844bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ISSSNAH%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDytt3Uxvs2JXj45iTy9y2qm7pAmg21RbSB9B62c7%2B0%2BgIgVK%2BzRBjp7AG5Xwnazqqgl%2BEL2RgWAJHsvoJhrSmNMeIqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNKKrtj%2FfXLvNHSD%2FCrcA6sGKZ4z8jTsdsvh7TDvNKAiYbxJeYpN2S4X1c88Vm0WAFCZlbOK%2BMl%2B8afjInfN1W%2FNNhbE0HF33IkSjXGd5uwkur6eAMlXJrCkJtEjITWtwOnVSizk%2BvG6Pt0bEIm%2FbsHcoswwekpRbaH3smqj8km6W6Vzs8bKnOlrYtOaaljzPQ1CLE6MeiLKR0zIophUuHBHk3skUT7qGeddlX%2BrjOcOY%2BZUGMVWi2%2FSdLzrU0%2BaRj%2BQRfah%2BSDxLsaaxPhdAa6nXqnjY6vPzyMBidaKfLmgFMGVV1%2B4b%2BjijevuU2RAUXksP7R0nWxBm55aBsqR74w3%2B0LrCvCfhMNWpXZfStBDKd8nkzriC6FRDaKoU883S3RH%2B0Ptz0zI2aSiIPOnl6kKCKHyc3o06F7wXkCaSRp8i39obtgtxcqXjH6A0DaA7oafGkJsVSV60tnikmlazc9qHA1M2wJPW2e3RmHzQ2rmjizwo%2BKo31bImfM1Ge%2B8DiGkV8YhF2cP0dTSv7cf2cXI1xaGf2FFsY2sdTHZB4tJUQ3TBlAXXk6b4unJHbnAJxlovMj7eUaFgLrNagV8OSE6pnlsL97WeB44LJwvPZNPbrHQbO7TSbf%2BKfltnXM7jeCDwmfQCxn0B9y%2FMOGyuM8GOqUByhQnwM6WekBc%2FDTkNHbGi5Kk2UjJEm77rn5RupW0s5d2YvGnJPHDVFkBRF9502FthLuia9x8HYmtvn9wb%2BrogGnnmq%2B7joKDQblpQ4wRW0cfCtEZx3l40nxfVkFUXYq5O0Fpz8%2F1Cnc3NtFuuvAGm1yicppAbgy%2BagwWW4hK5Clpa2cacPTrnNY6MW76rQ%2B5nUzYXI7AKtZ858P9kwrFSj3LLrxZ&X-Amz-Signature=3983fe35c9dcea404bf74d40cdcd4916b97f9dd803120c95ec47ba6b13a65cad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RORUUZFT%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIClWF0FaP4C3B7RO0rrLNJ6EX4LUh7hjcf0lzS8gotTiAiEAmSC9PxWsV9c7qdf%2FRe4cNzCDCrLbaonSlFS69bTonT4qiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIkva0p8eS%2FuYOgkhyrcAzud5aSxcc2FdhkHrO3MoixOSG%2BJKmaNTiPPCv3AE8sITmDSZlVWiqEhqHhPkkNJHcmrEYiekZYQeta4s6Rmzpi7QYZSXJkWG8gGl13t%2FA4SITS6%2FZk8iXKKFyLdTx67wL82Yd2%2BRYXY4czmy5RHCVG3IpRA9gN5xsQGQPW50asjuJe15%2B8plFJcyGtX8JonyAKPF3jCKR9hJHD9yzsj7jw7WO4cS5kl399f5ZZYZP7CLNBkHunALHoWZ3ywsYQk7eHbHozmOZZgefaewz3jMGyGvkj1sDirNoDrSc5dCThZD%2FAjgYWflKDzYaCIzLek%2FsNKvHWlgzKnrwGN0iSM%2BIfLKGzcWlrc8vW63a45xbUm1l34ttFDdQ5eMkBjys68TkEg%2FPCi%2Fl9scOk6PrxNrKLu%2BJIEKj8ra1pwc%2Bc8AiKDijWjahsWQOZBFyLsZ85LXA7ZRj%2FFm4z6r8xSduwWx8FP7Un4KVtuc4yae0NlngH44Z4saO5LH9ik9bvQpm7LI%2FZZEjldxrOlMyv0K%2B%2FQC3MEeZCsUuRPw0VPWZw6e4Ef1xEN9LH7eBZxbnsR4XiTcFQcMP8Ucma1QQ9kvulfSuE%2B%2Bvqy4V8VmA9PNHEGQOWdm%2FdAfuDNuqabjdgyMIL%2Bt88GOqUBG%2BNU2T0AbIAsbx7Oh6i1D7ifPNvdH9N5Qz3DaSlDQTELGO%2FMRdeCkBSryHDMlk5HYugGA5DSg96uC4%2BgAiHiSyn9L1kgqke59ryZYlvbINIv5sfzL4W3LeLUaZTnE9q96NWIsPfNCCqLJj5o5XiNzxAM0haAkLcel9y21d7rSpoGZIntvNS1x740tYQZzC4d18066fjBit3RsRtHuekUPvoYpv98&X-Amz-Signature=d4ecbb60bae7371093b58fdaeafab800ba8066c0a4a8ea39cf53f4a5b1e44fed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RORUUZFT%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIClWF0FaP4C3B7RO0rrLNJ6EX4LUh7hjcf0lzS8gotTiAiEAmSC9PxWsV9c7qdf%2FRe4cNzCDCrLbaonSlFS69bTonT4qiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIkva0p8eS%2FuYOgkhyrcAzud5aSxcc2FdhkHrO3MoixOSG%2BJKmaNTiPPCv3AE8sITmDSZlVWiqEhqHhPkkNJHcmrEYiekZYQeta4s6Rmzpi7QYZSXJkWG8gGl13t%2FA4SITS6%2FZk8iXKKFyLdTx67wL82Yd2%2BRYXY4czmy5RHCVG3IpRA9gN5xsQGQPW50asjuJe15%2B8plFJcyGtX8JonyAKPF3jCKR9hJHD9yzsj7jw7WO4cS5kl399f5ZZYZP7CLNBkHunALHoWZ3ywsYQk7eHbHozmOZZgefaewz3jMGyGvkj1sDirNoDrSc5dCThZD%2FAjgYWflKDzYaCIzLek%2FsNKvHWlgzKnrwGN0iSM%2BIfLKGzcWlrc8vW63a45xbUm1l34ttFDdQ5eMkBjys68TkEg%2FPCi%2Fl9scOk6PrxNrKLu%2BJIEKj8ra1pwc%2Bc8AiKDijWjahsWQOZBFyLsZ85LXA7ZRj%2FFm4z6r8xSduwWx8FP7Un4KVtuc4yae0NlngH44Z4saO5LH9ik9bvQpm7LI%2FZZEjldxrOlMyv0K%2B%2FQC3MEeZCsUuRPw0VPWZw6e4Ef1xEN9LH7eBZxbnsR4XiTcFQcMP8Ucma1QQ9kvulfSuE%2B%2Bvqy4V8VmA9PNHEGQOWdm%2FdAfuDNuqabjdgyMIL%2Bt88GOqUBG%2BNU2T0AbIAsbx7Oh6i1D7ifPNvdH9N5Qz3DaSlDQTELGO%2FMRdeCkBSryHDMlk5HYugGA5DSg96uC4%2BgAiHiSyn9L1kgqke59ryZYlvbINIv5sfzL4W3LeLUaZTnE9q96NWIsPfNCCqLJj5o5XiNzxAM0haAkLcel9y21d7rSpoGZIntvNS1x740tYQZzC4d18066fjBit3RsRtHuekUPvoYpv98&X-Amz-Signature=dd6e42de8e0f5756e3c6203d7cbeb7f259ee238021ae03d9e4aaa62617c2e65c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IQL7JGH%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDMY%2BZrVy0PX3h00mXL8LCRmlT66q%2FdrcUGBi2Vnu31wgIhAP4yqHvZLE7vVwbnWH%2BeVAxbHQAHqBt2oU%2Fo6aujX33eKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgytVmvhI8022d%2BLvz4q3AO8ZxKmjVU%2F%2BMGCLrWuCURajlWU9Chy%2BMzhecU7iYptzJAt5NtwrAw%2Bd%2B4WLnBPg7V%2BvyEcxdGXhJk041WnYG2FRVVJu1pnQLi00MuNg3i3sckHTsdgtLlYSvjpb0lj2m1zBS%2Br5QRnAawfbw3pBDI4nV%2BUwYh0ffJ5Q7imN10%2FOgmvVguNaDoiq1AyD6FxQSAqnn1QsTb16Ac%2F8QklzZU8tCFXOg%2Bv2LFSa7sl9opt9Zv%2BDwdUho7QbsWijXhcTSUd8nkaTS6TsG1Nqqu593pMnClbhGNSH7zOElRTLsfLCQRVj%2BYXsRD4roXdHMPxF1U%2BnD%2BlRmHXu23ThYQ3lbICw9refDRMG%2BJIl0OPlToJDqgNH9ZqP2%2FD3wt5cLlsq6D7O1T9qmGekeKqEGYXPF0oQKgUxbUbzOP6ucqhaqTsphVVfI7PrTbRwbhouwQHFCzzo2FZPZqloKnbn7%2BO7EpBHlz3QAezjdHaVkN8n0F61796L5PDWU%2Fhm2HlDSjnJt0qj5RLVGm9vsJAx4IH3PU7B5GTdS93M9TueDTg2zk2w%2FZP0QAIeujGIP6GyZNdHcWX11NVFPtp8WsCrIQXUFQCVdeQzxLkk33Cg5bbas0XwJO6mrotiSTw4IsxpDDc%2FLfPBjqkAdDGEAiTgz88728kAjpI8dJfQAHYfopB10Rk41ZRqrqXN35iqrZswTcy%2BlIrN3nQQv1vbgss9WtTFZln3wyKkVnlqWQADyG9v3hzin9qweL0uK7lTJo8%2BHV0Htha6eb92UclWSC%2BUNTp5ulcZDUJrha%2FQ9%2BCiSQ5Jj2wjsXP4EVinnLvCPli0ZKEnNVa%2FIu9oEg98wFOU%2Flsqm3pfxmZW7uAYLSK&X-Amz-Signature=d3b9c1d2cd399d4d5b142e0dab3c38d409ee61b61d77d052b50b8f6a978b28d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663HYDLGF%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICcLf%2BWZi%2FwFkksq23GJPDbH9%2FVrU4ymBPAJtaTqIfS6AiEA51Ju1WaJNwNqBf3I7NO6XNS74LpjJiK9cFUXIzJvRSwqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGZUJWYm3WjolN5gSSrcA8PFonrkYHBqTmUNcIlNGspJOw7By8wqyI%2Bxl5sG4RZmChbXOkk7eNoRHuSZzj8T6tKAV9lP5Z2U2ydrOLAthnQZD0nozzom12PbsRFJSx8XjsVu4%2BAw07seKi8lKcK1QT1S6YAuu59YVKso6zKgfbqgklowx43CfQr4llPogtit7SKHxivz8theqzJmKhlXtGserfMxF8Qe6EfbKgi6TDyQunv5njg38ewVOZsPHFV2ZeuvuXt%2BsJp7k5flYtp0Sg8hIJ0Uvn4ngBw%2FdvWVg7aMQWZgZYGDQCfvGqSbGVrxpj8tVe1IBiTgKZbuIyUHQeWQBwIeeaiB1a2bO0lyj9wwK1TbIH%2BxmteI%2Bbh2lvn%2B9RKCi7K2m1Oxim5pnr9jZd%2FxJXSPVgwFa5TyIpexVpPF8O7Mk%2BHVaRknAi1AqJ6Zvr5jjIAVaxSonRvL991vf1YUhT7XV2edRS2HoUVHUXPOECC21Jo9R40yg5inzapBJDwAhBfAFplalVkiny15X4fTTLxqPA%2B7ThZxEW2G4kq0u8U46LSXyYjoGf5%2B%2BkFYlVUogY9cT2st6H3UcOxlOmqXMJsKl37CLZU3sJjsQirZ6xVSsMQyAvGwki9d7yMicOWLtTRKIvaG7CthMLr5t88GOqUBjvmFzwNjbVeJrxyo%2FQhURSR1K8UqWfEuMfScxHmjKmBni8tjtVlEsOiFGuR2D6vdSh2TyKnvwhVVuFpkLAWy%2BNrCfvRCRfEkfqaNgjn0oD6RFt7iUP1B7HFvfSq2X9RdXbGtkskDcXT%2BpgFmouYrVSMb%2BQNyg8aBYQfgZggAyezklD6h4yIWRUipoW97tsF3IcP%2FcU3fyboJ3JvRMCHsgG1nlBZu&X-Amz-Signature=b956a8febf80a5293a9249c797b521c899ed3bd85a79b0f99f7d3a8637edef92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663HYDLGF%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICcLf%2BWZi%2FwFkksq23GJPDbH9%2FVrU4ymBPAJtaTqIfS6AiEA51Ju1WaJNwNqBf3I7NO6XNS74LpjJiK9cFUXIzJvRSwqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGZUJWYm3WjolN5gSSrcA8PFonrkYHBqTmUNcIlNGspJOw7By8wqyI%2Bxl5sG4RZmChbXOkk7eNoRHuSZzj8T6tKAV9lP5Z2U2ydrOLAthnQZD0nozzom12PbsRFJSx8XjsVu4%2BAw07seKi8lKcK1QT1S6YAuu59YVKso6zKgfbqgklowx43CfQr4llPogtit7SKHxivz8theqzJmKhlXtGserfMxF8Qe6EfbKgi6TDyQunv5njg38ewVOZsPHFV2ZeuvuXt%2BsJp7k5flYtp0Sg8hIJ0Uvn4ngBw%2FdvWVg7aMQWZgZYGDQCfvGqSbGVrxpj8tVe1IBiTgKZbuIyUHQeWQBwIeeaiB1a2bO0lyj9wwK1TbIH%2BxmteI%2Bbh2lvn%2B9RKCi7K2m1Oxim5pnr9jZd%2FxJXSPVgwFa5TyIpexVpPF8O7Mk%2BHVaRknAi1AqJ6Zvr5jjIAVaxSonRvL991vf1YUhT7XV2edRS2HoUVHUXPOECC21Jo9R40yg5inzapBJDwAhBfAFplalVkiny15X4fTTLxqPA%2B7ThZxEW2G4kq0u8U46LSXyYjoGf5%2B%2BkFYlVUogY9cT2st6H3UcOxlOmqXMJsKl37CLZU3sJjsQirZ6xVSsMQyAvGwki9d7yMicOWLtTRKIvaG7CthMLr5t88GOqUBjvmFzwNjbVeJrxyo%2FQhURSR1K8UqWfEuMfScxHmjKmBni8tjtVlEsOiFGuR2D6vdSh2TyKnvwhVVuFpkLAWy%2BNrCfvRCRfEkfqaNgjn0oD6RFt7iUP1B7HFvfSq2X9RdXbGtkskDcXT%2BpgFmouYrVSMb%2BQNyg8aBYQfgZggAyezklD6h4yIWRUipoW97tsF3IcP%2FcU3fyboJ3JvRMCHsgG1nlBZu&X-Amz-Signature=b956a8febf80a5293a9249c797b521c899ed3bd85a79b0f99f7d3a8637edef92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RSUXKI2%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T162711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE4tJQxFgV6%2BHno%2BKA%2BO%2BjLQyxYWpwr6F2cOSn4hLBqUAiEA8AnmWSWf8XDB1NHD3%2BVk0rQHo9WP3AsPg9IdX2hFYD0qiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJqyqK2vn%2B%2BONtaHrSrcAzzXbJwYcTdzPEJg9Y05PkOOvjnsP2dw8pZS4F%2FvOF%2BHVNKGxv7%2Fj5M3hBM0JPlWwNjik%2BB3gdD8RZV77zQYhP32%2Fe19WcDwHp9t8oeVrQISUAuLY7L8XiX23eSG1%2FN3Pi7RI0p9zLbKHnIWt%2BiI5DJWT5cZ%2F7LsaLkw4xL8FWZIjwUEg2Lw%2BSPjUZiGFQqh34wSFXy33UFF%2B%2B9aZR6gkIlDm9oxzWQWGgnY7MySjccLMWTmfIrgmQTWLvRafWNxi490haeOemjEGe4%2B%2Bb73UmNi%2FnCGZ4WQJbu3l%2FRhOtsRgfbJbgMvgMQoQWDVKnSW%2BcjjSZhT0oHyAcBXLDwtCD9B%2B4O6VBfpnEoot3F%2F3ywhgGlCBxRSEXlckv5D08QwoEymW3YmQqcuL1l5WMGYO7%2FONoaN4ib6aTBc59SHM52%2F4zoWb4ZGqfx6Aszfhe4S6rgIV%2BfVaQgkHTSYiCfFD%2BOa%2FekrTjT9qELI6EHV3X7xrxBQin0I%2Fyfe0UhvvGmmqIfhMlGw3O4c7Dnk55oJu2%2FKUoZEdkpvfQBIdaBHQ4Z3CPdyTCNx%2FzH6fTp%2FEgwfU%2BdKB3uxmK4ppQjfrSvmQYfropuiBcJMCZcOnmQrRJH%2FDmq89Y45e78cC%2FR5MLr5t88GOqUB%2BhPrJiMmu5%2FjAmDlCc0axBGOxxj%2B75GGsiW2BEaUVOtDKq5rzcgrqjHpU8AGiTXR3Dy2a1RLx2CXlK5AUbj2oGx0vUpmLc5teZQOBbjucKnJuhJLcT0BXG13jQQOyC1zclRPPrH7ixUrbgLfT34JlPzgIZvB1P87o8bpC0tn72qz4K3N70x6Mj02s%2Flb3xn7iYYLeyWlD1MIr7CZXzPF2SMO8%2B82&X-Amz-Signature=90ac06e3dab566b27a7fb75a0c743c0211bfcd49e0435a90f5a700cad79768ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

