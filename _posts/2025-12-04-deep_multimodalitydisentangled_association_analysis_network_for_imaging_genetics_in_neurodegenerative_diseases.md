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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RHQECED%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCxtG4jqCOu2Mo5fKO%2FTTXNc4W2N3meHc5dGnHImjJ4mwIhAMSHHWX%2FyFIv5vPTF8LoyZ6JYDRpnvcO9M32%2Fdm%2BEDRcKogECKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwXnOp4IFazdIrKONQq3ANJUHm8zRHt93uDe5YEsv3gpcTj0CbCvCVkAF3WrgUGANRquEvOPXdtJJ8G%2Bt2zlc%2Fj%2FO8IVCPBSaJrnBlj1JzTXOqN0WJl44RMhRLcFjsL3SOBRxDfSk6rrweX%2B8OknSovB9qbIsIexH3z5MSxMZx8uDjS4qzwvQ4S3qtRr95vOENoes32j6SpLWeOR6nGY3lRLmwrycsCsin7xCrrNL5WXxQMDybVlRhvIbeHn2xaU4Js7mjHvCr%2FrdBLp5ZmM1lK3sonk7cApEYn4YbTDhxWKwb7A2Nk0XUoX4UsbUQQQfbtM4A7%2BEaGb%2Fm0Kd2M%2BVu%2FExA7PpkgVQGexRwJQgKW7k%2FgXI7ZPYik7z%2BLEJLTfL2%2FH%2FzMuw2Fg0QqgddxDVOFyKBLYA05Ymic5nbiySRCOsuu1GyOmBqEV%2Bwqz4w5MzceOa0vWPYst56gq4wGiBnDtwhZfuhKxMuQ%2BA5TWrXIgUCjGyPmghbofE5TGavpBlNR%2B7cxL9BlK1ESHOdn%2FUMoC%2Feeg4s8YYHuWMYt56nu5YkVky15mhhYpeSLA9gh0732i%2BRvfuqQETx0pYc2Vf0PKouKGcYhd%2Fsbl4tcTgtWbgvxA957INCqmgSsVtmNrYdy1evKJ32%2BNiczBjCoxILLBjqkAVrLbUxRL6mwBAwZ%2BE9bxdKjgWycdYvN9rDP9n898PoCNn3Vnrj61xIEYNBGw1aJm%2F6RmD6v3MJhAqbpmOY05yUJ9Na4kOYLDtatTSr5rPDZ9WNYmJDHvWvWovbXhz5f9HGbfvcmQ59Q9covPQXJkju%2FIu6qXQoysc5lSgdnY9piB%2FXWUGzv86XHl4kDsqtfqxzJyZTuU8Gg%2BpQClZG1HyQgT31R&X-Amz-Signature=9c9011a0c5c30d81807d31f0e3e6bfbe29e146a313b8dc6a1ba4fe637fc9ebe5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RHQECED%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCxtG4jqCOu2Mo5fKO%2FTTXNc4W2N3meHc5dGnHImjJ4mwIhAMSHHWX%2FyFIv5vPTF8LoyZ6JYDRpnvcO9M32%2Fdm%2BEDRcKogECKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwXnOp4IFazdIrKONQq3ANJUHm8zRHt93uDe5YEsv3gpcTj0CbCvCVkAF3WrgUGANRquEvOPXdtJJ8G%2Bt2zlc%2Fj%2FO8IVCPBSaJrnBlj1JzTXOqN0WJl44RMhRLcFjsL3SOBRxDfSk6rrweX%2B8OknSovB9qbIsIexH3z5MSxMZx8uDjS4qzwvQ4S3qtRr95vOENoes32j6SpLWeOR6nGY3lRLmwrycsCsin7xCrrNL5WXxQMDybVlRhvIbeHn2xaU4Js7mjHvCr%2FrdBLp5ZmM1lK3sonk7cApEYn4YbTDhxWKwb7A2Nk0XUoX4UsbUQQQfbtM4A7%2BEaGb%2Fm0Kd2M%2BVu%2FExA7PpkgVQGexRwJQgKW7k%2FgXI7ZPYik7z%2BLEJLTfL2%2FH%2FzMuw2Fg0QqgddxDVOFyKBLYA05Ymic5nbiySRCOsuu1GyOmBqEV%2Bwqz4w5MzceOa0vWPYst56gq4wGiBnDtwhZfuhKxMuQ%2BA5TWrXIgUCjGyPmghbofE5TGavpBlNR%2B7cxL9BlK1ESHOdn%2FUMoC%2Feeg4s8YYHuWMYt56nu5YkVky15mhhYpeSLA9gh0732i%2BRvfuqQETx0pYc2Vf0PKouKGcYhd%2Fsbl4tcTgtWbgvxA957INCqmgSsVtmNrYdy1evKJ32%2BNiczBjCoxILLBjqkAVrLbUxRL6mwBAwZ%2BE9bxdKjgWycdYvN9rDP9n898PoCNn3Vnrj61xIEYNBGw1aJm%2F6RmD6v3MJhAqbpmOY05yUJ9Na4kOYLDtatTSr5rPDZ9WNYmJDHvWvWovbXhz5f9HGbfvcmQ59Q9covPQXJkju%2FIu6qXQoysc5lSgdnY9piB%2FXWUGzv86XHl4kDsqtfqxzJyZTuU8Gg%2BpQClZG1HyQgT31R&X-Amz-Signature=9c9011a0c5c30d81807d31f0e3e6bfbe29e146a313b8dc6a1ba4fe637fc9ebe5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZZPCO4H%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071514Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHWoBj%2Fl3FvWRJDpKAOX0R1tyHhZfwNXBBx%2BWi8mct9nAiEA3hjJtyT%2BjOMW3Bv%2FbSA3OfdEvXIynWsgnkWiceoK0ssqiAQIoP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCquRN5lH3X7iZPVgSrcAwijAs1dEbKyQy%2Bqw52IwlA085IizzLGd1VfxEufyoGJutCak%2FuYI3UTEMUGD0W5nuta%2FP22AhqaR%2B8TbWuURCcu9OH1S5o02q4XVr7q7QxkFHx3%2FTLdpG%2B1EELLKALLDUaF%2BeP67VtV9zCtUW38lYdUkrecfgchpLHIbGgGc%2Bg%2FUnGRshNcTwWQMKcxcoYCepC49y1YDhge9gWKuwW8Wq%2BQdshcYQJX8fSv0%2BYdsS7mPAomulBr6TOMjn9etG0HknPedaEGIY%2FREzb3i65RLgQh0JMJMoWHtSmcu7MTHgmSYXeYu4hsN80aGr%2BrPlILPiOAmFvAUxoOC4iRw3O1TD%2Bm6YyLUpCbfW2EqOROf9n7weFXu1kQE1HN9lzBXjrVkMGxdk%2BfsUyogQcJ0caNkQ3TFfbtciD94Ce1gBJH4vlNUiotXVnyBJqKrVdNwwKvc%2BBq9vn3soC5uKqkHwN4UZHUTu4Z8FnRK3JyAQ%2FChQbnVG4fxTzY4%2FtFkkyjmukFy30atjKOliiTBmeR48SaWrtf%2FG8yixWhMGKO%2BaJ2yaDr2wDCZUqezfUCMEUlX9%2Fv72p26seNtfmkf%2BII5ZryouafslxefRWVlUYbcIS1Mg4BsGQtEGGUKHfJFssIMJzDgssGOqUBdLJ%2FgNnpqwamlomme5miNVVP%2BUcFbNvVyS%2BxpilErK9ESz%2FlRQr4F0OUXyo2fD0pGrD6UDWy%2Fo%2Bs%2FSW7xtr5FXNh50byGwW5h3Gau1ofuL2iVCFHMEyo8Prl%2Bc9VPGIUHSKXAmXiAYiAN8CfZa3FSJx1YZ%2FzUrxwHoGVzMrdpBWpqLEYkSjtTRYAZ2UjTUgb3iXkVMOa6ZkOJpcEDfSGoqYPlgiC&X-Amz-Signature=e837514c901a91d4940551682de404c3cd6833a32791e6a5b473d19770eb877f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJRZC2ZQ%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBHwpNtb5OvIYKuW%2BlcnEX9Ttdj8vJd%2BTOxhlsIwAsjDAiEA%2B7wgK1kI3VF%2BEi8VBjJjP800hb4pwWwcqNQ7KRQkVucqiAQIoP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNz7D4SIx4OxtLY79ircA3XsaUm20HnGI%2Bkl8cpjWS7spgQL02xqtEyjY6JTHPRs9eVyFO1mWhFbJgPIH7olF%2BbeM489pg4BgU%2F1IhbLNU3Sc6%2BnoCbfjy7JiIg95CHDMAQJ9hsWFpZRpY7oapp0XAksMlcj9T%2FEfqSbvSDlL8YjM%2FudznWtIibnLYkyC%2Boh692n35alpNWrib4Kp87fKzn%2BPSCAJl2JzfSJK%2FOVp%2B5xKfy2Ht9DEZhLk5rLREMq7Ovk9bS45lF7RiETP2g4zoBpY9VuIajHomQvP7hFfyGhVF%2BE6jp%2BCNRILuFv3JrAnlWsEM6d2rUIeWuq5m%2Bey0msxenF%2BrbybHOH%2FhV%2BA6KJlp0hoAyrkDXvKpBkKUblkEUAbEmv0r3N0iWEAEH2m9R8ZxqvAPpvOkgvzMFkieKlYs68eS5CosYQqKNgVj9rjufDQD2yWXaO54xjXTs4Sk4PAlJ1Lm0S%2BAII0W%2FgmIMve4%2FN9Lx%2FlAf72roz7tzUmQOG6FKIzw%2Fklbn6VXeliKPbjBkEPs%2FqpuOUnPkxnnG7OxuILVlz31R7SLhEHPBfLes%2Bh%2BeYTNtWSUQvVp0HesnUoSunyMVonhiRhnLpoJhrCidiPC9V7cTov41IF0UxM%2FGBAEvtm25D0jlIMK%2FDgssGOqUBU2%2FJu9H%2BvF67XAE%2FlocCuieBDLoFS0%2Bf03d3kWvZ6P2B4nNATSFJRca4xFqhu5MUxYzng0qSx8sqbtehVhYQ8K5znLQeWgRs6N3N%2BLaGWAsuVnhspwNupT9wAs4DTinmryCWeg747e1t32mSexGHRr7GlKtyrtnHXoNqkXJQBOt1KuoLcDNH1yCPaliXxGJ%2B%2BocovsnCVF5e%2Byf9MGt%2FuKa8SmBS&X-Amz-Signature=bd9130748e46b4162ec44ba57ef28b296b3ec7719586a249869c3903e69e7df6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJRZC2ZQ%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBHwpNtb5OvIYKuW%2BlcnEX9Ttdj8vJd%2BTOxhlsIwAsjDAiEA%2B7wgK1kI3VF%2BEi8VBjJjP800hb4pwWwcqNQ7KRQkVucqiAQIoP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNz7D4SIx4OxtLY79ircA3XsaUm20HnGI%2Bkl8cpjWS7spgQL02xqtEyjY6JTHPRs9eVyFO1mWhFbJgPIH7olF%2BbeM489pg4BgU%2F1IhbLNU3Sc6%2BnoCbfjy7JiIg95CHDMAQJ9hsWFpZRpY7oapp0XAksMlcj9T%2FEfqSbvSDlL8YjM%2FudznWtIibnLYkyC%2Boh692n35alpNWrib4Kp87fKzn%2BPSCAJl2JzfSJK%2FOVp%2B5xKfy2Ht9DEZhLk5rLREMq7Ovk9bS45lF7RiETP2g4zoBpY9VuIajHomQvP7hFfyGhVF%2BE6jp%2BCNRILuFv3JrAnlWsEM6d2rUIeWuq5m%2Bey0msxenF%2BrbybHOH%2FhV%2BA6KJlp0hoAyrkDXvKpBkKUblkEUAbEmv0r3N0iWEAEH2m9R8ZxqvAPpvOkgvzMFkieKlYs68eS5CosYQqKNgVj9rjufDQD2yWXaO54xjXTs4Sk4PAlJ1Lm0S%2BAII0W%2FgmIMve4%2FN9Lx%2FlAf72roz7tzUmQOG6FKIzw%2Fklbn6VXeliKPbjBkEPs%2FqpuOUnPkxnnG7OxuILVlz31R7SLhEHPBfLes%2Bh%2BeYTNtWSUQvVp0HesnUoSunyMVonhiRhnLpoJhrCidiPC9V7cTov41IF0UxM%2FGBAEvtm25D0jlIMK%2FDgssGOqUBU2%2FJu9H%2BvF67XAE%2FlocCuieBDLoFS0%2Bf03d3kWvZ6P2B4nNATSFJRca4xFqhu5MUxYzng0qSx8sqbtehVhYQ8K5znLQeWgRs6N3N%2BLaGWAsuVnhspwNupT9wAs4DTinmryCWeg747e1t32mSexGHRr7GlKtyrtnHXoNqkXJQBOt1KuoLcDNH1yCPaliXxGJ%2B%2BocovsnCVF5e%2Byf9MGt%2FuKa8SmBS&X-Amz-Signature=eeee35942edaf9442f93b7ff96136d0b6b4fd787d082c2a1709ee09c4f1ab4c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNFSO42K%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBT9Ly1L5RFVPeEhz0fOgLphZo5Rv7rcuPi7dSac5cW7AiB15saAunLAcyk6XysdD1pGEPy5DD%2FpOxRzXoQaYhxk2iqIBAig%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMpk0fuvwUehXhtRcwKtwDlgK%2BVrphsGOZjAAD1A3CzwPahA%2BykbRnFdoeC%2BhaWuFYyh0xGCCN1cdXV278qlyf8A0N8jeDd4fPxERMK1v5uFrQ%2FzV2PRYM%2B5R30qgQa%2BjF7c7CEi4hgTqerY1vpErz8cPEHrfb40IN4BnECf5rGCdFo0nfOSBMMkMdZBWGlGC7W8Y2ei15nqhzFFtDDutcKYCVxXVkPaWpZ20nTetzFtnd%2BviQnNg6XtLHbFLyQqHPNYN1w3wOtmBs53SgNSqGMAtAdE32UUwm3AdKaE3gJe1MmBzXUDKm%2Bxqg4CApTDg4Sr%2F%2BgAyTHaNhoQBdz%2FttQYz3J92VgCkwLq8qXy34PU7z2v%2FWdly98FMiAl4HDGHVsCQxTMPQmw6XkoywHPMSpC2kA6v%2Bab3Dk5zFGgL345YdwWoio4Fr0c%2FbZfJlppzRVso4%2BUb9eRrwVthTZ8AKnCJuf%2F2HYi3xp72D2twtoTy4HhlC%2B7F2Dsrj4IL5d8PTO6sQCLHWNKJFFqotzhDktkLR3eWCqlpEHIZGXvRG4z9hvPIjqBFA5sb5lfuuXzqn%2BZtYW6YJ4Oqom3%2BqTtReUqGoYGH7Hz4QAgn%2BnWceYs%2BMxmKFQ09%2FvenhcDami02YO31LMYIF94K2uzwwz8OCywY6pgFeP%2BLTWhFeN09W571KtmPWmHMr7EI77x7J3M7kqbtdrUfAxMchJzyVqNZLmFnPQ8YkKyxFk%2Bej8s8joi9pr3xZO4qHBg43xFEtCsXQyrapm8j7teo31Nfjk9t4cXf8sVSYBC3B%2BSpe6DIDhIMDTe1Bv4hj3nkLB1O1Dud5MIcNoU62BTscCfir4%2BaOsimwffpUo0vwvkjdqqEveFoQ8lWKyDfF%2BUUt&X-Amz-Signature=0a23fa820a4d15a6258ea1d809e924d81a33c4469e18b868af93b52846fcb582&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTMUPDMB%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDVDzoOG5xdQwzUMvGJ5zqDgHgyCSCEubr9AGprS4gKTQIhAKXD7nDhOtA27uAZzHKF96%2F%2Fy%2F%2BXeEaDP%2Fqr4AQeJIWvKogECKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgycyPVfjFwJm5LcIcQq3AObioYacflPcxhtsGy%2FYPWOKL86gjRiVWJRQgNUGPtdBsiG%2F3AGqgtX%2BsQRJpn7eexpkQ1EN6ggehuLDkXF%2Fwsvv1iam1rXC%2B5N6l89qM7Y8SJ9rcH3enVu50pR9b0nQn8BShTT8XnH4eW7ApcMfjDjNe0eTNGFJd8kqwcxuo8Ns4P0zgxYnz9vmE345nHmGGc0mjX%2FAOhTMN1u%2FrJUFBSF1po8Z%2F81ZpQg9Gn0IK%2Ffw%2B5frt%2FoQ0DQ6bhenKyM792qeafsc8eGZisR8zZ45YhAt8Ma0LMc87eobuderJEeGs94MbE6Tuw%2BD8UkmxMzNaFVjq4tExLWG9bJx4OfO300iS0ASr2KG9EdThAAY3Xp3t4wYnXil%2F7PlhX%2Bt8WnQ4op15VhOlZ63K7Ft5RIJuImrezfpdphwJzHPGWToZ%2ByLlF9luaIQyTZvcTsDfjR8b6VveiG8y0RsLEWvQ%2FrO0n3Khep4P3c7Wbx3JGn%2B6dPatZzKHukHJgVssiAM8K3lcgHYOzTMSfZb4rikixAPqwlMCwiO%2BgXJD9tWkidBPmDuVW2O0JMlarhhEA5r%2BHc2F803%2BMTv3I%2BKBtFaSu6yiSYvUHhEBeJKst7RGyyEUb7r%2F3l5MQrpW15iR%2FJCjDgw4LLBjqkAZxkkGyPm4eSqlDKZS2Ej1sNMszdVfua73Db8r4Tj9N2ttMp%2Few4h%2B6EvSuWpdx6DBuV09Zs72P%2BolHaEkOnmazqu3LPNGpU0s%2FZpYtX8%2F4WYhOl6tGDvb9tO4N%2BtqomBfTgUe4NryAj4iLE%2BiPH786Hn7sAqZ3O4iSQeaysTpbb%2B2RuW2WnL4i%2FL2YW36YBzx2tR5rqhkPf2uv%2BW3ZHoJYDzjOF&X-Amz-Signature=9a1f4281561f8deb49a55af54dcd9f71824a68dfde9d46be1d3a3eaa7eee7643&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWWRJU3P%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB04YqfkWzUmB57Np6cVWlAnzMDgCgNAe5x5ewBBcHrRAiEAr2b0r%2FbN%2Bj3%2F9ZiA%2FnxwM8GL55EbA7SzZ8%2B4f9ZqT6UqiAQIoP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO%2Fn1OllOBZ6C3t%2BHCrcA4W4X6teXFcw30SSk48cJiwQslWQ9PZ0gFhNE0V%2Fw7ai4dpEzBHWP5eCQdUsr59Gd04pyDmGbSKzSCBynN5q%2FHoV4H%2Ft3Xk%2Bwy4gnhlFSBP9kAAKhJjNgRuVQlL3AoA8%2BtocqAZTgRLwJd1dH27Aonp0I0IXsH2BDky1ZITPsd9aOpmkEV%2FlcRYmrfG%2FBS6YCHRAMeYL4av2b%2BNpI5xiCA9e4UXkjB19LiBvXsWEL4%2BSljpUXZVdVaHxCA0mPKA9YgAdC0lEUlfDIEWVQdvSZF10nnz6q5WHnHNcRYU8YhTw7%2BxyUzl8Jf5mw2UOhaBBID99%2Bp2aPOA1U6iL1BscQEyh3HYPECZOOO39tV01eYqDtdKUdsv5Z0MdpH3q3oT%2BTm3Nbd4tOrY73t%2BlnbUrWAcwR5zD4OMwoRlY0PsJBX5Wn%2Bu8vKTJsecjuzSXm9dSko6S7p4qjKmZE8wRjt3nhNb1qMYgIUmgtZHcP0JevDQgF3i%2FANsbvjQZAeg2VWN2wZjzQJrOpfEULVUUATngE6td9ZY7H0zIY8JLvsx%2BBbl04NVvG9ZrBnuTD1JbeU%2Bn7X%2BeMHmBxxuazEY2rqvpyfK2ageivdom%2FLaCUSSbE2b1cse0zvADi0h6yzTpMK7DgssGOqUB3hH544G5hJrzUlETCqQb3ow1cxsQOcTM82%2B2O%2FdtJF3FNuSOXTGJAYiik8jQOg8gvmela51QuOGVVFSYTMYVEatjILsN9rs2%2FZHLf6Nb77Eu0DaE%2BlNoIySOTXUz9nN6bA2yf5ltLb8bSNsVLGgaw1pVFe73eMg9kd%2BNiL4bc1i2Kcxxs3v2NT67Y%2FEANa971xBIi9rSZ285QrWkh9sJ6FeEyi0L&X-Amz-Signature=458351e67dfb2199e18c0edde04ae75047a11212d015825e660ac76021d2c1f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SYKAP7P%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBsyTzMiOQHJA%2Ffl5fBA6c1saMXDEnvRPQq%2F2Pf9XYzTAiA7KX5siNzq3rO%2FvuwZz6ESc3eTVeumU7yJzpksesKN5CqIBAig%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsIkP29yuWdqTwSYsKtwD6kW%2F75aFbIDw9dJ%2B5yGVLxeuyUB6m092jCDB2mcCl4q8aIhSsLDbFOIYUKvM0d87eGEkAunIh4UrZJT%2BCHMJqYQuRbn9VEa077qZjah%2FiX3Y2HHNVMYTLGsJZ4ve9jQW40boz5bXRijPRbdI3zwfcnRWtXs6h1NJj%2FruLI5HxKSBpKdEuywjST6plRmiHy%2FwiBiiwlYtO8sNWR%2BvKvBeS4c4wFrNdWekTCpUK%2F1TDKcFeuT6zorHN7FLWRNw%2BO%2BWP1SXk8FVl5wjO2LrTUzegbr99TFdosjbS%2FF9dfOnYBZGxNwo9JeodcBRUMGFWL2djDEdCgTHgXvTesHKuzapKwWD4T09Lc4wM1VcC%2BwQJmKBzsk21UhgnCyEQahJue2aNFPYtPeavjfQJ9Uy4MYRFPyPqo7f2CHWWEjDwMNnTXOcIKpBYBRCeUrH%2Bv0ufetjJ8lTvqLz4Tlf9cQglopTZUlt%2FSa%2BeizkFtifkn6QY2dtljPLW7SVBkrtvXeQPhVV2XTiZ2pwX7UT0pEo2YqnFqESEVKK5fO5j5891etNXfjBPe4naCcSJoazQCG%2Bqd6WXPk183L2g4GWUWt47gDtVF3Hif%2BZRklYlo6gRZABmHRjOPIMz0dqk6vLtGow0MOCywY6pgEarMpaE7oHA89O2NMtLL0Q0msmnL5e9bXj%2B5LGnOvbMEKXPHn5twqPdcJUqXpwH0FHy9uqEXjgZyi1NL%2FHLdSbo6ynoxHjJ0ZWHpmeqzcrU%2FvsLgOfXl36N0cYWItxbZWjeVbzDCVGJFEBzokh%2Fwk1Rl9MNLRdKwKWSyTq9OKlq1tfNOZSHoDr%2FMoJ%2Bu0Ik4SLNYIqluXfEC%2FoL4jq7CDs97oKBcWP&X-Amz-Signature=15b9d79d57c5343afcb39a64fbd6ec7e2c355e3eb877c6677bbd7268751beee0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SYKAP7P%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBsyTzMiOQHJA%2Ffl5fBA6c1saMXDEnvRPQq%2F2Pf9XYzTAiA7KX5siNzq3rO%2FvuwZz6ESc3eTVeumU7yJzpksesKN5CqIBAig%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsIkP29yuWdqTwSYsKtwD6kW%2F75aFbIDw9dJ%2B5yGVLxeuyUB6m092jCDB2mcCl4q8aIhSsLDbFOIYUKvM0d87eGEkAunIh4UrZJT%2BCHMJqYQuRbn9VEa077qZjah%2FiX3Y2HHNVMYTLGsJZ4ve9jQW40boz5bXRijPRbdI3zwfcnRWtXs6h1NJj%2FruLI5HxKSBpKdEuywjST6plRmiHy%2FwiBiiwlYtO8sNWR%2BvKvBeS4c4wFrNdWekTCpUK%2F1TDKcFeuT6zorHN7FLWRNw%2BO%2BWP1SXk8FVl5wjO2LrTUzegbr99TFdosjbS%2FF9dfOnYBZGxNwo9JeodcBRUMGFWL2djDEdCgTHgXvTesHKuzapKwWD4T09Lc4wM1VcC%2BwQJmKBzsk21UhgnCyEQahJue2aNFPYtPeavjfQJ9Uy4MYRFPyPqo7f2CHWWEjDwMNnTXOcIKpBYBRCeUrH%2Bv0ufetjJ8lTvqLz4Tlf9cQglopTZUlt%2FSa%2BeizkFtifkn6QY2dtljPLW7SVBkrtvXeQPhVV2XTiZ2pwX7UT0pEo2YqnFqESEVKK5fO5j5891etNXfjBPe4naCcSJoazQCG%2Bqd6WXPk183L2g4GWUWt47gDtVF3Hif%2BZRklYlo6gRZABmHRjOPIMz0dqk6vLtGow0MOCywY6pgEarMpaE7oHA89O2NMtLL0Q0msmnL5e9bXj%2B5LGnOvbMEKXPHn5twqPdcJUqXpwH0FHy9uqEXjgZyi1NL%2FHLdSbo6ynoxHjJ0ZWHpmeqzcrU%2FvsLgOfXl36N0cYWItxbZWjeVbzDCVGJFEBzokh%2Fwk1Rl9MNLRdKwKWSyTq9OKlq1tfNOZSHoDr%2FMoJ%2Bu0Ik4SLNYIqluXfEC%2FoL4jq7CDs97oKBcWP&X-Amz-Signature=5084fceb84fffd76ec56fcef49b17ec82a06a9cfb2050485e2e2acee0ee9f8c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OOUR7ND%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071507Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCpMNvavdLBL0gQzSLiIvgAVpacVYIvWwVSSAeTrR9l%2BgIhAKErSy8GdIx10y8mBGb06nYEAOqCxqs3SfNqkxz4KSTPKogECKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxABCfLZriCgIYAWuoq3ANl91fIkuaCAzIwlWk4qcq3PcrrViOyom6y1u%2FQOGwVAJy5dTPeLKc6gFK%2Bik9Uoqx12%2FLEa2rj145XE1HhYJ5WowFWVi2gX4ou1KkBLncCFkFTyHzrgQiAftc3EIea%2FGhoColzoGcLIXhErxGLRG9vQVrb7ZBqpFsxmyb3rQNiMP0ekbaVfm%2B1dMtyyumhYm%2Fmk7q%2FnltoLqicpz9doqxLmvyBbC08GDKmN352vLfEUYkd8CGxUmAzQd1iZkknliyVlpcNLXzOJZ1XRv%2BtyiUGmkIV47AiWmAO62ceUOZOxZS2Y2SdW%2B0DyDksat1y1iL5C5%2FTas%2FYA30GRp7bTXK1UxEOAssXYRwd1n7%2BetqlHKktbssNDR0G8W5ov7x%2F31utL8NoYePFHzS7Tvjw3yg9HokvFviIE3%2FYltGAX1HAE47stPJeccrDXt0jkqqLlqS50cVbzONDCZdKM3r84dMHrcJnmdMWVFpKcmqq9QiMKPTOBZGCk7Fgow%2FTqhYU%2Fl5FhoDyrLDZlyTfJhWy7ZIuDNCLXugBGS0qbt4%2F3fFp1%2B%2Fq0NOPzYrXHfrYYPq%2B1Vl8VIEZzRS2s8R%2B7Q8XtwQO9z7oY8Cgg7zeOWw7C9A9IoZUssdiC6wioTdYMTDcw4LLBjqkAbvjOZqknDjb6zU3NFLP%2BZHke8z5hTXhiP1HXkcBZsGi1bKrSuKbx77F%2BgrXuBs2%2FZXOz%2F1iGIEecNBTXBM%2BVFJluRLkZT9yIS0h%2BJu15eH72Zsvx398r7gFujugTR04qMAmClDmdyQtddwKjUIG5VjHle3H0ANK32oA82mE1a%2FG%2F%2Bdt3eVqvHgjY%2BFyOAwsgWaWBAUrTaHXnCQvD%2BXnlVZpwcIB&X-Amz-Signature=c08be6a16f1572c93f8c77efc6acf1b140ea57ffacf9519c3dabb5300526f4c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2RMAI26%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDEEskQBTYJWRxOWUkh0WKCDOMTEJbtHtJnS30749DFywIhAOZQNJD54nJ32RB7DpqUSNi4HR8lKKoKkWU9anR%2Bm8fEKogECKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy3i7RAcbUUBsAIOJYq3AODPGgKzDKECvoNY%2FVVftv5aN5y18q7GjFn3rYfAQ2A014JfB%2FidF3OYPAOc3LjSxfBa73UOvAc3K7KVVR%2F6RpzkcdXpgQmAF8JqCBCXDZPLewkHCszhSfKcAaxWLwCIPo%2FK2ENr2Z2oTJfERlnLWjvuXrjuWRPEpljBJuh1N9HTPApY%2FNP8Jea30jyF38Y2XWubecdHbV8Li2R%2BrGydVZ%2BEteax4cZaqnUZY8Jw7w3S1rRm0HoLFVpdRoQz0incudl0RqhCd8c%2BUo6Dga0vmc%2F7IswbbDlXPzd3URkZQS4JiBPBMlS4mDOnUpUKiLXsLSE%2Bu%2FdZrGyjv%2Fjm7%2Buqft2T46eVaGv7Q7ZJShh0MbE1Mqmyp9sQA787XGRxXkaBeGpiL3KlkwwpJy8pU8c4x96SxGT473DHyKCMY2H0XuqgGdbVKuSR3j5EXNaLcWbkuC%2FQmp6s66c0QtqS7YLV0n%2BymmyBYrJcTI%2Frzl9PAHyvRquQWpreCdG2wkFY56kOpD11XqoIx4mnHphylDrJDQKCT4y%2F%2FHdcyvzBcLjycey790JKHJWq5lkBbxss9GtfH%2BZS4wF8pCXjYPTJeutKo%2FhLjcta%2FGxVrypx0Ddl1lgccchtDDNV4dW8%2B8vgjC8w4LLBjqkAdhSbpps1LD4hng7eCct6GDU%2BTR%2BZSELxwbZCWsXT61aEtbK2z1syh%2Bxmx5rAg%2BMzlRpLZpiTq7IcgYuwZM%2BOgrCtVf2YWSR0z5oQm5KIOz78R0y8QZE9%2FNxjTLizAwLNtuoMXs9zXe3F%2BWC5M9Y60d9XeAUvla6SNROQkc%2F%2FBVdNKckb%2BkYUaOmFRtlIdVylC5VBVdc%2BGMo1bzCYHo0V0vj1khc&X-Amz-Signature=90d2d6bc453b9d678c2ebd426aa07ee73dd6cd3ff69b3902c949b94f64357031&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2RMAI26%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDEEskQBTYJWRxOWUkh0WKCDOMTEJbtHtJnS30749DFywIhAOZQNJD54nJ32RB7DpqUSNi4HR8lKKoKkWU9anR%2Bm8fEKogECKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy3i7RAcbUUBsAIOJYq3AODPGgKzDKECvoNY%2FVVftv5aN5y18q7GjFn3rYfAQ2A014JfB%2FidF3OYPAOc3LjSxfBa73UOvAc3K7KVVR%2F6RpzkcdXpgQmAF8JqCBCXDZPLewkHCszhSfKcAaxWLwCIPo%2FK2ENr2Z2oTJfERlnLWjvuXrjuWRPEpljBJuh1N9HTPApY%2FNP8Jea30jyF38Y2XWubecdHbV8Li2R%2BrGydVZ%2BEteax4cZaqnUZY8Jw7w3S1rRm0HoLFVpdRoQz0incudl0RqhCd8c%2BUo6Dga0vmc%2F7IswbbDlXPzd3URkZQS4JiBPBMlS4mDOnUpUKiLXsLSE%2Bu%2FdZrGyjv%2Fjm7%2Buqft2T46eVaGv7Q7ZJShh0MbE1Mqmyp9sQA787XGRxXkaBeGpiL3KlkwwpJy8pU8c4x96SxGT473DHyKCMY2H0XuqgGdbVKuSR3j5EXNaLcWbkuC%2FQmp6s66c0QtqS7YLV0n%2BymmyBYrJcTI%2Frzl9PAHyvRquQWpreCdG2wkFY56kOpD11XqoIx4mnHphylDrJDQKCT4y%2F%2FHdcyvzBcLjycey790JKHJWq5lkBbxss9GtfH%2BZS4wF8pCXjYPTJeutKo%2FhLjcta%2FGxVrypx0Ddl1lgccchtDDNV4dW8%2B8vgjC8w4LLBjqkAdhSbpps1LD4hng7eCct6GDU%2BTR%2BZSELxwbZCWsXT61aEtbK2z1syh%2Bxmx5rAg%2BMzlRpLZpiTq7IcgYuwZM%2BOgrCtVf2YWSR0z5oQm5KIOz78R0y8QZE9%2FNxjTLizAwLNtuoMXs9zXe3F%2BWC5M9Y60d9XeAUvla6SNROQkc%2F%2FBVdNKckb%2BkYUaOmFRtlIdVylC5VBVdc%2BGMo1bzCYHo0V0vj1khc&X-Amz-Signature=90d2d6bc453b9d678c2ebd426aa07ee73dd6cd3ff69b3902c949b94f64357031&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMMJL2WV%2F20260109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260109T071524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG6Mk0RwzcoyDXRyTDX%2FJY0zrlAnKIAhKPC7ljRutBAzAiEAqRr19VhVnbpvmHR1AX0Kr7igjFuwup3S1gIepm2awDcqiAQIoP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEwlvJp1nxrPFdVpICrcA1a%2BqrwDWIxmY7qZPmYxmd1xEfxVKZqT2u9tazMvIvgv%2BAxUds0YtXMewswCYyzRu8TcxUp9sE%2Bvq5fWX3Cmivub5WENqWuNpJpqf%2FRmUhHxUz5PEvpepWMaMeD4%2FP7Q0aqHfWHFURnztbtLg5XXrdGVMIz7%2BSPRoB1jVbhhVPzYF67bI9xbocvXRheDleoi8uEKKqyyuVVYNUxnr%2FvdA8nhQfErCJH0M25XS%2Bf3kEgP9iSLJznS0vRCvIyiDNPxVZ3QXcTfpLirbVcDrKVZM1YDfIQ2evGFHA%2BmNc1Gnq%2BcBo2MOqwoo%2FMG5vfeJA2noLhyv7E5z8r1G9SXuTzEQ2XxVPbN6Rj4eI8lo73Oy9aDQJlMFEIfIuborrGleiPkcjH98sQn0IB1al3lbLKlnQflGnznyf%2Ffw49rOllQthPc4HcQAHfFy15Kik3dDEkZFiiwhLDCzTU%2FDTV7o08XHEKwDS6ik3az4a17drwoZ0jbvw5rWge%2FJcYzWBeaRPmflam%2Boj9EnQ0FstyQmpDSuFpB87zoI4yO8IUbws%2FWHTcFSXsbdkkxlqYD1%2FdWxxh9cbhQy1TMykyaGwVrnuL0nh0s8qam0l5KncFfP6EYbld1egTq3cLeklNzaoYxMNTDgssGOqUBZRmUR4ptluvP0I4cvsSYWHyu0e%2FdCgfOF7BvCoBy3K2vfVlU5M0tY0gXkrx2MAn7tr1w83AS2AIjXJqJYbkHtqU4h3qX%2BVWTO596QyZStwGf%2BvHZqNh3M370YDUaBMiRzP1SkV%2BMewAxGnsiSqlE95uZllct0fMRKU%2BkRYhS1VREzIWRFGc7IJ%2FZK2k8HPInJ75w6oQJ%2F6k1bBI6cHGbcSiaNbbz&X-Amz-Signature=1e037cc13c1bd6ddd2525b3210041487580e83719358bfea7a8050b4091c2d4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

