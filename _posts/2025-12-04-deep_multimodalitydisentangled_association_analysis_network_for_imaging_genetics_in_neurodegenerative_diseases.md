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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663X43KAUT%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2BCXEl9l6wgULrvLN1%2FS2jVc0HwDKhtdTjhwzmqbm84gIhAKGev2jjbPi8Sb2IcCus%2FN7B%2BW7Y3pgbhuQG29KT%2B4FuKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzTla%2F7DC3xSRqzC3wq3AODZIMbhpkCOcDnOhZZzp0J23QvmFpLHDaigrC%2F5YgHN3qXHsS44G%2FlYHYsCct4FV%2Bm2074%2FzZN2AtWj3rUmD7AZY31c6CqJVIo0aywDK5lETZAzmj32zMAqxac4P2UFz6uAKRc4h9dZnfytVTAQo8ZCb7BStrjrK1APgpKKoFm4MvwVfILayhK9pwb6%2FVPrzE5Kji5%2FJip94ovQ6ACJpC8NJjxWgx0rp3SdKRr9xkzw5fn5xVK8dRAZ%2BXVwfZ%2B7fbxXzdWG%2FJsUj%2FkY9IeZGdC5EZKJTgX65NFgKnoUkFkApg6chy4CQOSk8SFJ35E41GYYfJh2pbY1hw%2F1ZG4yNumbZYOM8%2BIWvJIAOL%2B11OWHL2pCa8GM%2B3XSuUpxGP0o7Jy5dADV1Gvv28xnt0xi8qOr6i3Pa4eYOc58Q1Qk1s2MHd0NHSsrJ75l5rhSOtq2DtNQHQRa8x%2BMPx7cT3Coq6W8MzHYgtMMPzdZW9ynHIyQo0XXu83rsx8a%2FdM16Q2hHUN2cKod5zX2WPmy1k9zhHhofyvUS3dT2i0F4dnl1BCF%2FYxCLXHuaN9oOWOvAkkaiopbVlQ0fjWTeA%2Bb%2FJkxRfx2xah4mz9W4pQ%2BDfKe4VAQ0fsWWbKQ0N%2BHkK4bjCb1oXOBjqkAaRrqD0PnRNDMJRR2y41WSF6vpVOpg7QLEBE88EYWP6fEJgOqWZnQvTHPY%2F54cRTOx%2FTMHeveBVWpm6UvvTaT8MSuW4ixUk8pKyDm4z8qvn1wwT4WsDXJ%2BYbddxp5Mu644kB0jFm3aKNWVNEEuMZl9YpIAMpF%2FfaRDPE%2F25Zm2mU4G3fdvW8TxTpK4RYXoBgOlRo2P%2BPlV0US%2FmWXqttVVVuBjbp&X-Amz-Signature=6b0a9061ff6c2030dd7d0a6defa4648f6d0a9164ff896e7deb342d87c00a55e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663X43KAUT%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2BCXEl9l6wgULrvLN1%2FS2jVc0HwDKhtdTjhwzmqbm84gIhAKGev2jjbPi8Sb2IcCus%2FN7B%2BW7Y3pgbhuQG29KT%2B4FuKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzTla%2F7DC3xSRqzC3wq3AODZIMbhpkCOcDnOhZZzp0J23QvmFpLHDaigrC%2F5YgHN3qXHsS44G%2FlYHYsCct4FV%2Bm2074%2FzZN2AtWj3rUmD7AZY31c6CqJVIo0aywDK5lETZAzmj32zMAqxac4P2UFz6uAKRc4h9dZnfytVTAQo8ZCb7BStrjrK1APgpKKoFm4MvwVfILayhK9pwb6%2FVPrzE5Kji5%2FJip94ovQ6ACJpC8NJjxWgx0rp3SdKRr9xkzw5fn5xVK8dRAZ%2BXVwfZ%2B7fbxXzdWG%2FJsUj%2FkY9IeZGdC5EZKJTgX65NFgKnoUkFkApg6chy4CQOSk8SFJ35E41GYYfJh2pbY1hw%2F1ZG4yNumbZYOM8%2BIWvJIAOL%2B11OWHL2pCa8GM%2B3XSuUpxGP0o7Jy5dADV1Gvv28xnt0xi8qOr6i3Pa4eYOc58Q1Qk1s2MHd0NHSsrJ75l5rhSOtq2DtNQHQRa8x%2BMPx7cT3Coq6W8MzHYgtMMPzdZW9ynHIyQo0XXu83rsx8a%2FdM16Q2hHUN2cKod5zX2WPmy1k9zhHhofyvUS3dT2i0F4dnl1BCF%2FYxCLXHuaN9oOWOvAkkaiopbVlQ0fjWTeA%2Bb%2FJkxRfx2xah4mz9W4pQ%2BDfKe4VAQ0fsWWbKQ0N%2BHkK4bjCb1oXOBjqkAaRrqD0PnRNDMJRR2y41WSF6vpVOpg7QLEBE88EYWP6fEJgOqWZnQvTHPY%2F54cRTOx%2FTMHeveBVWpm6UvvTaT8MSuW4ixUk8pKyDm4z8qvn1wwT4WsDXJ%2BYbddxp5Mu644kB0jFm3aKNWVNEEuMZl9YpIAMpF%2FfaRDPE%2F25Zm2mU4G3fdvW8TxTpK4RYXoBgOlRo2P%2BPlV0US%2FmWXqttVVVuBjbp&X-Amz-Signature=6b0a9061ff6c2030dd7d0a6defa4648f6d0a9164ff896e7deb342d87c00a55e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SALVKKCZ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGnH8C7H3T%2F55gPkCWmmc9gd8STeXHmF0OLF9yR2uEqjAiEAtN4GwwilTuLkrbn1hZw4nyFJ4ytjblhVoW8kUpzmMX0qiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHDSsadLgUq%2Fwl%2BDJCrcA7bAbN9G0O%2BkbnzaUecdFJ4eQ84u5GcytXROoL6iqP4Fv%2B905Esmb6iAT7yimclUHOEJVTTNO8Bx7Z5e4Wicjsp%2F%2BqpyPRgpiYIC%2FLDOX2XIbymGU3S8bgZJMdfMbw0cvDMil85xjR2Iu%2BYXqAMF9pAU7BfvLak3caNMvZmPci5JGAGQlJAOVet%2FcVN2us5pAJit%2BJqDgFC1H1rqwsGJND4xldwSpobwe%2BfvpM5g%2B7xA55AmtVbXwjaMypJRzM%2B3GcskZHb%2FYc6cQYf3yvZNocYRelhUmPQXS4%2FIgRZX91Al5SX%2Bf4P3cRXPodEWA%2FcAbCcb1KERK0yOD9YFlWKstiuAKFLpKvqjPt7Rn5rgXjdiOxOOJYelnGjVSx2Nnc9tZMcH%2F4FDFUhx3YgaCEvoCFqI8CXrbv52i1zUFNjPe555qJs28naXMYB9pMmtGVhTaJOE5hdfDQ0eYmT%2FPLVeB16xDrtcnMbz8McoSRT35TLgGKybUIDBKI3mDXEXEXvJQV4vGzDiT3CWnql659geRhrR%2FGARerK8UPcoLQyMLN%2Frvzi32p0ChA4065sh3%2ByfM2h7becOGI09tBTPrVeAFiuiAiFuGqC4usAbRkT9RYilWuyCUkv46au3k6loMNjUhc4GOqUBokblzYZ9elvQzP3QkMTxpLZGLnZPEIV6R9ZMCnGw%2FS11O3gJwcgnDd5S6H3rSibSCchA%2F6vUiLCZWwWV%2Blz2sOPHLRyKlQTsMZEnUdl5ySF3GKhhoSmFeRXVuuUhftcv9HjSZWXyrdttwODPtSgdRo%2FhjH4LpVkLN8khubpYyac9GuDbVZUfes6zNURGyCJQPXMs7Q55rL1mNVNqtngEPIepQF5z&X-Amz-Signature=cd7999ab10a2cd769618d379006c4fa4098a436b7a68716ef3b48c53618af480&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNVD4KDP%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCNLNg0DoUE6Ah3AaaJb70TshXhTxklVyr561D8Z9QlUQIhAKMIlPX1ac3xJWt55X7Pm2wVvXI46otjx8XiG%2FkiCIidKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgycBSHEU6IVl7Yll7wq3APjN3DfuCSKUoicBg6Pm2muOhTzhaSyRm114nvlUDD9MrZ%2BZPlhdsP2gwur0ALm6df0d2VhVSlFR5%2BfaJy%2Fh4O7nGFbngJyHLgJ9ri0fIxGAhLB9EapoMAJPBw3PBslw%2FZlHlLdyI1Cjka2aFoqhfLPYshnc584IUk208lf%2B%2FKcETclt5hfqoAvdlKFvSPDVxcCuojtMYeTcptmc4%2FypjKjte4ZeDDtCa1tywsM8VlLtiJEFA3E8wtJocJxetBY3cfDxF1WcQcbI8B9Uj2dvxieG6kI9LI1nHMD27cyGOiZ%2FNRhL%2BXJDWnMlMpX1dCu2kGTcVz4rnddpve%2F9JsqMKWfb2OPGhGAGniwBndlb4U5TMmluHdIn4seOcmxBKCbbJChusiIKfnKvb3Ao0oV4wnAp7f4KyiPzkQdASt6jO67TM0rEd7aAFZFabdT1cpF5Pog6sY2qrkPZnW1ITqtgRdTcstg0jJgOfusTK4agd2lWu9XWXpjU7299JUkhmJjM2VSO9%2BMBzxO0iCnre4G%2BOYQq2LlYyucbsrLhiQ97y6agVoUu%2BGvTZPhtAcPldEy2nCc1dCkVkJ87M2MUv3mxzsAHDoBH9bJ66AUGZa2gckgDdISSC54tY1t0pqmhTDR1IXOBjqkAa3HquCmkBkTmfAeRnZrXMXXfWmhtuulGCj4StyP1gokCtLDhYzWz3HOfab%2BQG0r5HDgxlDVIHH9sDicyNmCagVY6Ai2d67DzgTTu013a2R%2B6WLp7SivNg%2F0Ky4nLFmPJqmjeN40ssbt2f8AwbQcWy5k3pJLnj6zbOT%2FLeduOm77CK9xAsobeH0VNpiRQg0whWPktLftG5rGiyxa8L013BrqzQYa&X-Amz-Signature=506fee4459794122fa6caaa24d2e49da965f85ce97eb89cc207ad05a61e8e46c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNVD4KDP%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCNLNg0DoUE6Ah3AaaJb70TshXhTxklVyr561D8Z9QlUQIhAKMIlPX1ac3xJWt55X7Pm2wVvXI46otjx8XiG%2FkiCIidKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgycBSHEU6IVl7Yll7wq3APjN3DfuCSKUoicBg6Pm2muOhTzhaSyRm114nvlUDD9MrZ%2BZPlhdsP2gwur0ALm6df0d2VhVSlFR5%2BfaJy%2Fh4O7nGFbngJyHLgJ9ri0fIxGAhLB9EapoMAJPBw3PBslw%2FZlHlLdyI1Cjka2aFoqhfLPYshnc584IUk208lf%2B%2FKcETclt5hfqoAvdlKFvSPDVxcCuojtMYeTcptmc4%2FypjKjte4ZeDDtCa1tywsM8VlLtiJEFA3E8wtJocJxetBY3cfDxF1WcQcbI8B9Uj2dvxieG6kI9LI1nHMD27cyGOiZ%2FNRhL%2BXJDWnMlMpX1dCu2kGTcVz4rnddpve%2F9JsqMKWfb2OPGhGAGniwBndlb4U5TMmluHdIn4seOcmxBKCbbJChusiIKfnKvb3Ao0oV4wnAp7f4KyiPzkQdASt6jO67TM0rEd7aAFZFabdT1cpF5Pog6sY2qrkPZnW1ITqtgRdTcstg0jJgOfusTK4agd2lWu9XWXpjU7299JUkhmJjM2VSO9%2BMBzxO0iCnre4G%2BOYQq2LlYyucbsrLhiQ97y6agVoUu%2BGvTZPhtAcPldEy2nCc1dCkVkJ87M2MUv3mxzsAHDoBH9bJ66AUGZa2gckgDdISSC54tY1t0pqmhTDR1IXOBjqkAa3HquCmkBkTmfAeRnZrXMXXfWmhtuulGCj4StyP1gokCtLDhYzWz3HOfab%2BQG0r5HDgxlDVIHH9sDicyNmCagVY6Ai2d67DzgTTu013a2R%2B6WLp7SivNg%2F0Ky4nLFmPJqmjeN40ssbt2f8AwbQcWy5k3pJLnj6zbOT%2FLeduOm77CK9xAsobeH0VNpiRQg0whWPktLftG5rGiyxa8L013BrqzQYa&X-Amz-Signature=fe280d32e88a14b632ee9f39d0d7c9020ca8405eecbf4dfe13514ba3eafb3fe6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VDHPUS5%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCWgILlbGNTt%2BtTyCfmQYh0V0tg3GogTtrZTBrGdqaumwIgIzdP2UEcVs8PSQq%2FGRl3zXs0NOhPtw%2BzLdJDKhj9npkqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMZ9J0%2FWhricj8Q%2BYCrcAyhBR2JsXeV6%2Fe6AhQNv%2B5mXZHbI%2FEKU%2FoxwJ9DH0JDZppmdnJHcnvITyJi1lBsdbI2ei7OJIb8sPfTcUv4TBDYkIiiLBEdgMtVS5hdf19ZKG7zFGhWytDkicKZIj6YI%2FeuRdfStmKDns5KyKrYEfRZ3CkDjafZXaaRXIcw%2FA6X%2BNUxh8pRIXNb%2B7ZPtH%2B%2FAIN61SD9WSsSOlYYKF8vl9Xf7f70n%2BJjgD4BvhposlZmUzBHosypdbVWq3YrqPcR6HKm7lk%2Ff6UgNicWblmzcOJx5XLu4KvJa2wXznaR5alxQ7eYA%2BDK8i6j5mKP%2B2wdGmjjo725rO8K2db1HM33%2FNoZHyrhvCmYe5Vi7iz2QXGwXTwL6E%2FIJBGNHpUfArZ4hDfg7e17iqkq7dgb%2FZ6UNrvcwp2ch3J2niRR%2B0wOAaBKL1uQXbM7kqP4d3jypmJ4KuM%2FimgopBI3jdVwN9asK8DbxWzANhzH8Az7hvPlvpSqdz3xjQ1HlpZqLnGEsV9zV4wZJqHvpYvThoeh5%2FOo%2BIZHjtr9eqLqubJ3YAIFpi9rSf%2Bg%2FhovJNImbt6G6l1UGd8%2BDooKgBG7TeQzrNszRo8PQ65gnTsrFCHy%2FljLcVI%2FLTUFJS2%2FjtbQjO%2BnRMMnUhc4GOqUBLnIb%2FzKDArXbTK2HgfGnE5PcOn8kgKYmF2DhsrtpWPne47hj7b19Bff6uy%2F5nhxxlSLsxMyOzz%2FOnTA8CT%2F1Ywrl5c9O5mEWEFZ2ri9n3QYru5VRFfs0W50Ay%2FH7rVSJGIXn%2B9niWnHYb0Cj8%2BSGm9XaJjokmhSqOZdabJV%2Be2iMAJIY9vWAugEwi%2BxTNAMwun%2FXqMXO5ol2hXHiNmAbWfxzqcOI&X-Amz-Signature=dd5636c8693ef5fbc9b15a51f3b9c95a49db2e4d9664f1fbee82a195fe92a1ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3TG3K2F%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjkSRhstja1Gc5%2BwtYBxQ8hvv%2BjZSeGJGUNjSrUuSNZgIgU8bBzoM2%2FOZUDRzIre85RMuOm1Lhe8LgRm%2F9sV6YR%2FwqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC54Gx8pKy0Ig6RnOircA4%2F5dW9bgnKaHLe94mTRUp3row3fTCOs6i4QSEjPqn%2FOK%2BT6d7asS2fevwd4lEbNQP%2FmZ5OLa0n0W74XdYVafoaAn9SVoV3OCwzjDFC2jNBtWjCmCXfB55ZWUlJM8wYWjmHEmprSLLYn8712Zt3FY0nAsMYq%2BuClEYfdMt%2FXhvvUpxPvPypgZEPyRA%2BE9tY74BvFvI9QLZrrdPqrdluvraAQmI9KI0v%2B5A%2FMxet5px3zmaOsycF2exx6CQroWVUuldz5qaDrnzIjHJDCb%2BQvb4lGBmMhlxHybSVVFIyHSFGyDFT7OqB%2FQhEtJ0AikowaQl44BYAr88ARoxDWmyGaHhggI3aMpijKuM4EyMhmcntc9NVsLSbD0B%2BmVpb%2BHrHR1Ly%2FsIxKSm%2BPqp2cKZXDMaemcCcGnoKeRsasP8fS5%2F6869T7ltN6pl0yZNvEBKcGeWc58HNjvg2IQyxZr6XZn4NIs%2FU%2FyVwemSCiciYd%2BNZpZb3QzAigkSUoOKEV5GH69r8uUvG5tCbDAAXQrCrXcePYcsoOr9h06oRpBwM%2FvsXTnZ3RH%2BvCh4LiyXD7zWg%2ByhoQaBADKhYPy7uFEZ6sOtpxky9BTLak7r5NgLI7jKI4RgthaT%2FNwMCeR9%2F%2FMOTUhc4GOqUBoqaAdddAKUiK5h5IS3s0q25INpgEEoWOaI1kbuhTyaPwQhPMr9Ye0AufChAP%2BG5NVj0H%2B1CCRuQJHhEze%2BADZePKlXK%2BXW5ciQoVEcvG446wlYJvt09S2rya8y5zgWBt1yzPqhV37MLl3dcmkvENhjWEkN%2FyBU8Rsaf%2B5HV1NRZI1dn%2BDed0DhpX7IJzm9ciJiaEt9P8kar25b%2Fp4KOjmc0S33Xu&X-Amz-Signature=4adea0dfa58e86013f94fa64c102bf8c69bb7eef6f9512f4327931561f86b2de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646CLHGFZ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCC0Nq5pZDsLSRXfddUCrxkRD2JcvgYVa5Hv9rpDUOMYwIhAIlvm%2BS4O%2FwoSx74DH8oHvKWWbEjEo19Svbx03p2oCa2KogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyGwGNWnB6iugIDzuUq3ANUQarGN2FFYIxYAFls%2BAYSP4J0O3qtig221lXEEBD2%2BqbQSpq2BDzSjfnfOaeAYEsVfxXkcPtagpZQRxSXYw%2B9PPpYp96UGZaxSShrodWISa93PsP8krWYiG2dIpq1%2BeytFBMZ97elVHDV5HM6qvqVwfWhBYzetSPeFd8F0hcDKoy1JWjmVXs0YX%2BxkF1f%2BhUCG0hfGmD0CRw1IOiM32AUs9D9OfkopVLheQL5RRAtA3NmP%2Fq54kn20URKRnC4OjE7kQVIN803w4ONz235flsg0sAUoUL7TP2QawcJrIT7NzFuow6hjovutD85mrQ3uc8ndQlche%2FJHB1TEuwQakQZgZVZyaDKUHWQqPsbIiTM0J%2B1W8qdR9itTM%2FltK7EnpXO5LwPyX2vH58QFdk8TDMfdCQxPWY%2BV3Twox6OB3fWYFqeDElC4N1hLcCv4uhctKRwUA9EfrRZ2lcIzGXKtcfJCTeD6OmtwTF4T%2B1YO2yRVL8dCqPKtjwCyN6urLo%2Bch6J%2BYDzFJAjaQsdkNbqcKfmyqYKE7bjCtRbWwcFpJ00qOxAhLOh%2B9Z8RQytLsktDyy%2F5qq%2Fr92RKTbp5qnPQ51yIXh6H7t63ImJvy1B55JoYryyDX%2FkaKo0fTOvOTCO1oXOBjqkARM1JxcPYr2AOkl8qEWxm0WQkyA1W3UiU3P9VWe2sBImPxkpO2pTjknAis9OBz7VwY3KdfiEEzMXaH17z96dji%2FPLdnJn0xWi0OmwCn4DCestlFXbhIBD8OnJNid%2Fy0cYzu7QVyQp3tbHu501CTzAqfj3SC68iDJkFer9zbXQRg257DlCr8lXN6vk%2B6ZXYWl%2FL5JpoEBJbaVB1Jjj%2FcszWsheEKj&X-Amz-Signature=a82bc7b58d0553ef4f4b8e2c979519dfb6204fb4cfc660e868b42989c81d1ad9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KOHQ3CG%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDNf%2BGcGrX6wVFT76C47msQq99EKGuDaB7HhKK9YeWCFwIgYzh5Q5FIpEl%2B7kkmKgfAmQj26WztI%2B0O2i1T6q%2B9X6AqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKFX99oE4GlAC7JYrSrcA7YMm05tLgyw3xbk38JKWQS%2B%2F%2FoM69GGwoSS2FRjllffqnkZWFafFTVDK%2BnxAsO3Xr24FdMjTR1ooVgwvxlHhtHS0Xvcv6ytabAJF7aGEthGwuLi%2FyVSoSotH%2BR9DHsB19Khi7%2BteYVMLi0IKBMGagRqOSpg0MlkusHDrUUkXH4xWDl8Tj4cu2z2uXze1kmIBTMziXPjoWLA%2BCZhPt1pAembEXMv0Gct5nKZ%2FmozOWkUuWg8YlNQwuBdwEtLrihzO2yGNqU5L5EkYKUO%2BL5Segt8vWav1o0iOBEDUrDE%2FOF5b37snhxsuQiZBOe9GlxrKk35YMmt1%2FzLMjwMp5gFldkUDapBVLnzurzpd7V0NXDzUpr1YmhLHX2h9%2Bu2Qpcmb%2FYstJEN%2B00wsxqkIGMnwSGXMl5H3YW0GZkftsNJEkYqwkSdYB7VHJ1VCVkHCUZuVXIG6aqNAQKKHe11WJOQW907NsYwvm7iUAKG%2FmUXjzIdoSheO3fGNGYp1YpFinum1zQFqIMPX48RmDMlMyayScE22D2tho5SjDO3SVHvMaj9wS%2BsEbk%2Fa5JHwNzRDXgHYq4UzgmK4M86Jm527%2FeHRak6AKwqXZs1UYgttHFBTMU9Hb4ipINOxvJ%2BBA3mMOTUhc4GOqUBP5c2LDYGVFbYMq5o%2BgNq883b7%2FmuPJ92GkPuOaPvAquq1bf%2FoUKkq9RHKYwRNRuFzMHpgbmruPJcAq%2BQ8lBbxSeYhFZ06lZFAnOS3taAGxunVThZhPEy9msWteCZiXkwWyztiHc1Bs3DvUPOEQ1%2BAsiNaS2x3%2FGwmNfCvFCIiRLoz0rtZqkbgPz9ZNYx3t2YGgM1ZcU1PLP28EUJt5nE6b%2FUTukn&X-Amz-Signature=815af2b3d4e5e6f0fd69ad5eb4b2f44eb63f901d5518edb917154894653b4226&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KOHQ3CG%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDNf%2BGcGrX6wVFT76C47msQq99EKGuDaB7HhKK9YeWCFwIgYzh5Q5FIpEl%2B7kkmKgfAmQj26WztI%2B0O2i1T6q%2B9X6AqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKFX99oE4GlAC7JYrSrcA7YMm05tLgyw3xbk38JKWQS%2B%2F%2FoM69GGwoSS2FRjllffqnkZWFafFTVDK%2BnxAsO3Xr24FdMjTR1ooVgwvxlHhtHS0Xvcv6ytabAJF7aGEthGwuLi%2FyVSoSotH%2BR9DHsB19Khi7%2BteYVMLi0IKBMGagRqOSpg0MlkusHDrUUkXH4xWDl8Tj4cu2z2uXze1kmIBTMziXPjoWLA%2BCZhPt1pAembEXMv0Gct5nKZ%2FmozOWkUuWg8YlNQwuBdwEtLrihzO2yGNqU5L5EkYKUO%2BL5Segt8vWav1o0iOBEDUrDE%2FOF5b37snhxsuQiZBOe9GlxrKk35YMmt1%2FzLMjwMp5gFldkUDapBVLnzurzpd7V0NXDzUpr1YmhLHX2h9%2Bu2Qpcmb%2FYstJEN%2B00wsxqkIGMnwSGXMl5H3YW0GZkftsNJEkYqwkSdYB7VHJ1VCVkHCUZuVXIG6aqNAQKKHe11WJOQW907NsYwvm7iUAKG%2FmUXjzIdoSheO3fGNGYp1YpFinum1zQFqIMPX48RmDMlMyayScE22D2tho5SjDO3SVHvMaj9wS%2BsEbk%2Fa5JHwNzRDXgHYq4UzgmK4M86Jm527%2FeHRak6AKwqXZs1UYgttHFBTMU9Hb4ipINOxvJ%2BBA3mMOTUhc4GOqUBP5c2LDYGVFbYMq5o%2BgNq883b7%2FmuPJ92GkPuOaPvAquq1bf%2FoUKkq9RHKYwRNRuFzMHpgbmruPJcAq%2BQ8lBbxSeYhFZ06lZFAnOS3taAGxunVThZhPEy9msWteCZiXkwWyztiHc1Bs3DvUPOEQ1%2BAsiNaS2x3%2FGwmNfCvFCIiRLoz0rtZqkbgPz9ZNYx3t2YGgM1ZcU1PLP28EUJt5nE6b%2FUTukn&X-Amz-Signature=d74318bddaee264751dd0a2343633061967ba51cad7f00155cdadb1218fdfa55&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGH43QVJ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDQPVy6iH14Eopd1sI6NYCbjB35xSa%2FhPS99ULF8ScsSAiEAyuLx0UV8V63eJQoWWnp3ZnnH1VBAhT%2F5P51a3MI8KYAqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKfM9yg%2Fe2R%2F9GzG1SrcA9QsmjB%2FaubWQ9OB2%2Fn00OMI4uaN9FpZBnIfTKzM17XQKRXJ7GU2AkEzOyIoiLeZScMWyhLD5c9zRM9NaElFlPOP9hzBAnKI0KSKWKFxNNdyTWYDqLYo7mqMFZ3Gtr7KIs3j5LHM1%2F7EDlHajh4gSEA1M%2BRUmRgrS7mN1MNlmdZ55eCvslQEWxodHQVoO7ZKQLy%2FeTIfd8FclbdQ6XiRu7fTaoxiOp7xJicDcbwuTJpMZI1bzpsnHzpP97EtqGiwC52rZZ6l1atX1N3vyQQLAjTgKAKI0pSSmG2oK%2BSm9XW%2BhsLDNVs6Z83CZX1PvfOTxQPbXBZ69ZDM5idgZhvDDBfNlTwYsLRcww5B7%2BTckEJfNeHaJsH29ssZ6KzcTottR26Q2DxaLMj93WLqTF84sm6I384icV24zc7q2dNFLnO74EeHUxKvzOF5LBS0hmQg50BEVb1TsHeyr3L1dJC8cMSc1G0c3F5%2FNuEgZ6C9srU9ejQ1ytOBjmiJqvcpfkzAn7bWRvVc4nEJAtUTiTYAOuRnoEs91CE0oOt7%2BQ%2FhNuDOR91CwzGZbKBqPwMIW3W2%2B40DsTAeI4FxHG3PcG7s5lWoWJ0bEq4VYWzJ5YZ4XSZECBXdQ%2BN1lK0Uju6DMPvVhc4GOqUBXEViW57A5SPBVoaEHqsndS3kPIIoeoUxQqrZGDvCIDOOUdW9XsSRzFcv35bsPTRqBcUR6J%2B7%2BiyIS9Qh3hTEDKFAkyr61epUUNn9zDWD78PHdENYwLEgDM9aO8K5jxzcptO%2FpXB79WT6T%2F3eUhUwN6AY%2BsJtpxaAajX8d4YR6sOAn0myp6%2F9IqUECshk2ia7snXfQktItXRIkm5BpIQhrGIetSS%2B&X-Amz-Signature=21cf7799c5c4e480bd24e583aadd298566658f5fa1dafd28083b31eaef934b5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVF3HBF3%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF2G1bbV0eacoYwibVoCAPTWzaH9ZCKxeHvogKq7qS4XAiBgV70B%2BX0qH3pGO7qnhVs7NoA2D3KZsfX92%2FZwybjpNyqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMeDEAtlyNNlLLqDSzKtwDkc2sAzqBro%2FbbczvVRxlbq9%2F4Dn1xfAn41IckKYWyeBqPNUR2OvAClcF4yJ91WQeZVHL%2BIpI0Gvny4MlJAgOjicDTx1JzCCz2MSglDVzYmHDaTLXIimRLQDkdmPB1MkBjH%2F8dlYMQc7akOF6uvlMsWFF3ubnbrtV6kvM%2FUmlL1%2BdhON2g2JdDv%2BIRINtEs0juIRk4yWMg%2FSvaRjzE2dyK%2FXnvRgujN%2FbilxwxS%2BY2%2BSgj%2BYmO7FAMDMCexF2nc7iegB5nVdkDXE7crKsAFdEUKR97chQxgs%2FtiRbEphY4mJ1drBQDFLnEcCgMm4CoSo%2B2PAgvRuQ5qLg0z6YA81xfw0sV8v7sywgSGUPJ2GiQj0X9CL4lXFBwR3z4pEiV5J5Zx2%2BYE6mZ0yYB8nfz5lJH70FjNOvR52o8yqyn24DcXB9GQcsp%2FI2vgJEt2vu5sFoC80NTRIMU6mgWWnpSMBaex1stJl3ksyHVJ5bMr8cW9Fzsv9oZ0tExjc5f0HXklcdGCWU4ev9eCZUt7SvX7Hfg%2Fgu2EeG4dk%2FHe4dCqcjg7SodP%2BG4q40wN7LX8rAnqw92T6PxMGrBUp18OxYD9A6mQQO%2B5UGDBsnKHjh3ex8NPZ5aQIp6eIEL3j1W8cwvdSFzgY6pgH%2F6%2BOBSdwnzUjhLOwLHE39q0Hdz0DM8ehiE2iZrNOGY4y%2Fs8ZNBOF9dk1XGKTbbeFq6q7mZAXLauGUkRVlaj8FSA%2FQtH15vpa4kMU8DzDSmZ%2BHPEXTJbAvjvUF127dM9akm%2BlmPGiFepCRkObDHhz%2FElz7wZuQS6dT4qDj4bm8whfoIjZDuzQQMc%2FXsZ%2FbO3uqnz67cUuQgXYvEexo6lVQhieM2QwJ&X-Amz-Signature=e99738aa7053ef71f9cd989792f7d7a1a096c14eb966f4eff49238c115376518&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVF3HBF3%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF2G1bbV0eacoYwibVoCAPTWzaH9ZCKxeHvogKq7qS4XAiBgV70B%2BX0qH3pGO7qnhVs7NoA2D3KZsfX92%2FZwybjpNyqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMeDEAtlyNNlLLqDSzKtwDkc2sAzqBro%2FbbczvVRxlbq9%2F4Dn1xfAn41IckKYWyeBqPNUR2OvAClcF4yJ91WQeZVHL%2BIpI0Gvny4MlJAgOjicDTx1JzCCz2MSglDVzYmHDaTLXIimRLQDkdmPB1MkBjH%2F8dlYMQc7akOF6uvlMsWFF3ubnbrtV6kvM%2FUmlL1%2BdhON2g2JdDv%2BIRINtEs0juIRk4yWMg%2FSvaRjzE2dyK%2FXnvRgujN%2FbilxwxS%2BY2%2BSgj%2BYmO7FAMDMCexF2nc7iegB5nVdkDXE7crKsAFdEUKR97chQxgs%2FtiRbEphY4mJ1drBQDFLnEcCgMm4CoSo%2B2PAgvRuQ5qLg0z6YA81xfw0sV8v7sywgSGUPJ2GiQj0X9CL4lXFBwR3z4pEiV5J5Zx2%2BYE6mZ0yYB8nfz5lJH70FjNOvR52o8yqyn24DcXB9GQcsp%2FI2vgJEt2vu5sFoC80NTRIMU6mgWWnpSMBaex1stJl3ksyHVJ5bMr8cW9Fzsv9oZ0tExjc5f0HXklcdGCWU4ev9eCZUt7SvX7Hfg%2Fgu2EeG4dk%2FHe4dCqcjg7SodP%2BG4q40wN7LX8rAnqw92T6PxMGrBUp18OxYD9A6mQQO%2B5UGDBsnKHjh3ex8NPZ5aQIp6eIEL3j1W8cwvdSFzgY6pgH%2F6%2BOBSdwnzUjhLOwLHE39q0Hdz0DM8ehiE2iZrNOGY4y%2Fs8ZNBOF9dk1XGKTbbeFq6q7mZAXLauGUkRVlaj8FSA%2FQtH15vpa4kMU8DzDSmZ%2BHPEXTJbAvjvUF127dM9akm%2BlmPGiFepCRkObDHhz%2FElz7wZuQS6dT4qDj4bm8whfoIjZDuzQQMc%2FXsZ%2FbO3uqnz67cUuQgXYvEexo6lVQhieM2QwJ&X-Amz-Signature=e99738aa7053ef71f9cd989792f7d7a1a096c14eb966f4eff49238c115376518&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TA6364L6%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T174138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICXPkeCia8M%2F6XssHtLPdv26VAnX9xRyBvQzRcBIE%2FvWAiEAv02EC4f4u67cNwF%2FMJhfAOif8ZRCnyLfx%2BWNjNQ2K6IqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNKGv9uu9vqrnfn1QircA2B4pF6Jare6lBKCFFrhspqtH3pfG5dV2dTIZ9UFNTRJZKSgyzn2NmNY6j6M3tkfQJte3WYE%2BbhH2Sh7b%2BRp9QvQPc8xFxY487hua35aIVF7DJDEHRdj5dd3NloPyrMQMOYkNQIhlnKbq2RZshdtqxD4Yay19Z8eE846dlcsuT8A4WmMQyIyaDh9R3Kk8jKNZNVd4Y4RJO1ulyzQ0Ng0rS7sRZZHcygDWEtvsULpNHFmd0z1dy%2BgWCYytPKGRunEn6qIrN0uET56FIgcWvwco2wzPoBMAvYzLdu2ClT%2BZkr4znMjqZ8Z2wrhBwIgM8sgh71qB06%2Fqg4MpyrHM2nUph90IYJ7McXHp5q%2FVQ%2Fji2djXUSn9fG4r3CYHOv0pVwmxjiktCD0kSTh0id4fzxV0MvKBkfRo5xCcFgPabPB4zD0Z%2BdaS0nnvSA1L9mlbrLOWFMGUHlMTE9U3wH43NEoOdPSw6mczjnm3OTvDMj9eB7hmyY%2F%2FWL66gBYh2jnLoWGh8jRdkSKZJkCi4c0CxvsDyRq075sQwvpa4m8qMTm4%2Bu5lWiDefBA9%2BvzC7QTxQTWTfOdgq0XELxX91%2Bd3jDlM16sNqmi%2BkB%2BuBTaWvwHy8TDREUWKtgGhJhUt7H2MMPVhc4GOqUB6mS0Mz94n8PJh3j2y0hfxSKzcY9mGDE1TwHE0LjXqMpVg%2FprUpHPGmYMmFt4pXEb%2BhmkumTz68ERW4Mk26slSsCvK%2BIERj0duKddi9ptZcRcgoicg4THrtTUNkOsHoMWsaBomuexi1DyV7ZMhMNyVL%2B%2Fij5%2B1mzJH9uNPjxps1XqPT5IsSr1Rz9vwx47P32khqzC9g6WDTPFTbdRpuvy8%2BImLeJg&X-Amz-Signature=871c02afbb7a510b5f26be231168775e74697212485501639ae3b2b5ebc84a0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

