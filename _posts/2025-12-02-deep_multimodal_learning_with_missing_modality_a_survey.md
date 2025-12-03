---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJ5OYFNI%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T150128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQD2K%2FRs4EfBkF45pIxsPeFVdP%2F17EKH5bcsvsHrX5%2BStwIgBbMu9rxq01N9Yybbi7f4Z8KJnxd3QkxMEp4o%2FpNhDmsq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDMM%2B6Jx%2F6xH%2BvkPeCircA1LSRHooFq%2B0BaJhN41hRQKJs7JH3v9QWqtjyyrp67utrhBEBbaldOP40pZAGRuqcShmA%2Fp4Jh1QkIdhbnjMdjG03S%2FacFDYpf1amDviTldKwdw%2FzD2atx5p9fx61Y340xbtM6ogt1R0xYI3bAqIcanIbdec0y9QwHURxKct3zaHKL1rqvLl06yOxVdDBYL%2Bw9GfIdDwL4nBcE5jTmzh304Dt8goUs53S8V2MJUHAkPzm2Q3JiBPkk%2FZKHLCf9qD0RMJ3EszJFowjw0c8QUqe%2FaehVfWY9Urja%2FNbhDUt%2BPkEamsi8JlAm4Lz54zoczi7QauvyxJ3jOrihgCFyuGbapdHrgnKJ5VReOaaLFeHVG2dWxcaMjjjgWRsGwudWfWpildTut5JIV%2FXsz8NqgCk12y6M6pTbzNkZIgchJ2gHr%2F4fQWiPst%2BfDksSlRxPu3ZAmWmvU%2FOXAE5ZDc0T3m7L4A9KJqbLgL6o5Op12fGV%2BPkSbZPIwUV1jIHbNvfbHNAGS6I6T9vGnxUKGTZnkNYOzSMCHsPAlirLmw6b9eXDZAGU9XTbrS2ZuEJXSd0ER%2FX39UIaXitEj87akRvG5TC34N%2BCtl5KIPP238nGqFq3%2B7xrU70DNGe5%2FRIUPgMO%2BSwckGOqUBt3IkmDlxnO1e7HTAC84biayedc9TqdaSns77CKE%2F7yLbtjC%2FZkB4SdPFRocptwMsQJ9n2M%2ByLnIqcncMEei%2F4XdeiYygbjzcECZ6ADTO8nFK9Eyc%2BMVwTkahOQ7WADDCMYUqiq5%2FV4yodKZf2b%2F1dn%2FjejdqsMbsSnJRlkafAajtMZdYp5h2j1qz1wF62ZAQ8rJl2bi0MLOcglPVTA9yp0vVhw5A&X-Amz-Signature=0e2c945ea136e2907d873a1d869dd311832a68d4d84b80aef45cb220b5ee099b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJ5OYFNI%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T150128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQD2K%2FRs4EfBkF45pIxsPeFVdP%2F17EKH5bcsvsHrX5%2BStwIgBbMu9rxq01N9Yybbi7f4Z8KJnxd3QkxMEp4o%2FpNhDmsq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDMM%2B6Jx%2F6xH%2BvkPeCircA1LSRHooFq%2B0BaJhN41hRQKJs7JH3v9QWqtjyyrp67utrhBEBbaldOP40pZAGRuqcShmA%2Fp4Jh1QkIdhbnjMdjG03S%2FacFDYpf1amDviTldKwdw%2FzD2atx5p9fx61Y340xbtM6ogt1R0xYI3bAqIcanIbdec0y9QwHURxKct3zaHKL1rqvLl06yOxVdDBYL%2Bw9GfIdDwL4nBcE5jTmzh304Dt8goUs53S8V2MJUHAkPzm2Q3JiBPkk%2FZKHLCf9qD0RMJ3EszJFowjw0c8QUqe%2FaehVfWY9Urja%2FNbhDUt%2BPkEamsi8JlAm4Lz54zoczi7QauvyxJ3jOrihgCFyuGbapdHrgnKJ5VReOaaLFeHVG2dWxcaMjjjgWRsGwudWfWpildTut5JIV%2FXsz8NqgCk12y6M6pTbzNkZIgchJ2gHr%2F4fQWiPst%2BfDksSlRxPu3ZAmWmvU%2FOXAE5ZDc0T3m7L4A9KJqbLgL6o5Op12fGV%2BPkSbZPIwUV1jIHbNvfbHNAGS6I6T9vGnxUKGTZnkNYOzSMCHsPAlirLmw6b9eXDZAGU9XTbrS2ZuEJXSd0ER%2FX39UIaXitEj87akRvG5TC34N%2BCtl5KIPP238nGqFq3%2B7xrU70DNGe5%2FRIUPgMO%2BSwckGOqUBt3IkmDlxnO1e7HTAC84biayedc9TqdaSns77CKE%2F7yLbtjC%2FZkB4SdPFRocptwMsQJ9n2M%2ByLnIqcncMEei%2F4XdeiYygbjzcECZ6ADTO8nFK9Eyc%2BMVwTkahOQ7WADDCMYUqiq5%2FV4yodKZf2b%2F1dn%2FjejdqsMbsSnJRlkafAajtMZdYp5h2j1qz1wF62ZAQ8rJl2bi0MLOcglPVTA9yp0vVhw5A&X-Amz-Signature=0e2c945ea136e2907d873a1d869dd311832a68d4d84b80aef45cb220b5ee099b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGY4EPEW%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T150131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQDNctAITSr8qod45usbGgTk53HR2kvxdYfcV%2Fkkp%2FrJTAIgbWaGtimdyBBw%2BWELNUtQ6mE32pUnxpye4AvLWkLbRAYq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDK%2BBvqPK%2F%2B3kntNY8ircAz%2B3yQ%2B5%2Bw25uixaDn05fDJxqrNYseyJtA13B57xlSyf9Zs%2BsuM5UIr4k3QqTSumohbtPgC1wZ4%2F9dVMA2z3geTEv4Jv6i3qoOG2BrD60UtQkyyj9qWLOLmUWa1MKf8SZP1DAcpH1EJpZVkWTZ5LF2jQcmjvZNDhBDA8dHdslj9BslHtWzzD6iYIT4CwU7zNv0aEQQsralXK4tZVrpclEes25vA5j8ezIXMwdyJrw3DT3BbmbTAFmaWJmbRH6Wc4xDabps3%2BHO9d7w%2BVcLYkEk6qDQeRVml8XEzBgk%2Fsm4U0Se%2BjAz%2Bai30Pl5oY1NQA092iSKcf6WGrQgzhVMEw%2BeWbVjcptw9LNkgpx4pztNwNegEG8fhjX9FVgcScYTfuZZvc%2FGUXeWsLv8%2BMS4AWW10%2Fu3aJvoilejuyEINQe0tZwEnD3yc19u1wvwNuMGZxwSu8OPNe2KfZS4KZ70KS0D4PJ3fLfVvhOuMXUeYcemr2%2F1a2Ui1ypCUGWMSuhRvwSykj4oFs%2B1tyVkH1tSUGbCOSLFdNXdlb0Vhv2QDA7NlOWtYPDZY4oMqPIfsqMvTO3FbIXRjP8%2BeiR8f5lBYyHJLWRfRBYDraaYHgcxIASjQ14Qv2RgFPsupcaJtLMMOSwckGOqUB4QhnoFA1rfXPP2NiF6V7HZfIKP6BFOdcIWN9w%2B2QzvNiK%2B6JpO8AdB9PgV8KxYAVtrvLzA5%2BIrz2hVe%2BfWyyyFZrFQOTd6cmkV3J9kvAKsw%2B1niocaNLoObJSuabS6mf6P8%2FIT11bazJ4BfhUuT3O52fVYpVrwqmZdAQA06At%2FBzQAnLOSC5G4%2Ft09PHVAx4J%2B7bLvlzgKSLYlO%2BBwd8DX89vilb&X-Amz-Signature=884989fb2997891c1e58c7f986d7efb4afb18c48657184d2a6ed9ae9c0620a73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGY4EPEW%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T150131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQDNctAITSr8qod45usbGgTk53HR2kvxdYfcV%2Fkkp%2FrJTAIgbWaGtimdyBBw%2BWELNUtQ6mE32pUnxpye4AvLWkLbRAYq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDK%2BBvqPK%2F%2B3kntNY8ircAz%2B3yQ%2B5%2Bw25uixaDn05fDJxqrNYseyJtA13B57xlSyf9Zs%2BsuM5UIr4k3QqTSumohbtPgC1wZ4%2F9dVMA2z3geTEv4Jv6i3qoOG2BrD60UtQkyyj9qWLOLmUWa1MKf8SZP1DAcpH1EJpZVkWTZ5LF2jQcmjvZNDhBDA8dHdslj9BslHtWzzD6iYIT4CwU7zNv0aEQQsralXK4tZVrpclEes25vA5j8ezIXMwdyJrw3DT3BbmbTAFmaWJmbRH6Wc4xDabps3%2BHO9d7w%2BVcLYkEk6qDQeRVml8XEzBgk%2Fsm4U0Se%2BjAz%2Bai30Pl5oY1NQA092iSKcf6WGrQgzhVMEw%2BeWbVjcptw9LNkgpx4pztNwNegEG8fhjX9FVgcScYTfuZZvc%2FGUXeWsLv8%2BMS4AWW10%2Fu3aJvoilejuyEINQe0tZwEnD3yc19u1wvwNuMGZxwSu8OPNe2KfZS4KZ70KS0D4PJ3fLfVvhOuMXUeYcemr2%2F1a2Ui1ypCUGWMSuhRvwSykj4oFs%2B1tyVkH1tSUGbCOSLFdNXdlb0Vhv2QDA7NlOWtYPDZY4oMqPIfsqMvTO3FbIXRjP8%2BeiR8f5lBYyHJLWRfRBYDraaYHgcxIASjQ14Qv2RgFPsupcaJtLMMOSwckGOqUB4QhnoFA1rfXPP2NiF6V7HZfIKP6BFOdcIWN9w%2B2QzvNiK%2B6JpO8AdB9PgV8KxYAVtrvLzA5%2BIrz2hVe%2BfWyyyFZrFQOTd6cmkV3J9kvAKsw%2B1niocaNLoObJSuabS6mf6P8%2FIT11bazJ4BfhUuT3O52fVYpVrwqmZdAQA06At%2FBzQAnLOSC5G4%2Ft09PHVAx4J%2B7bLvlzgKSLYlO%2BBwd8DX89vilb&X-Amz-Signature=884989fb2997891c1e58c7f986d7efb4afb18c48657184d2a6ed9ae9c0620a73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XDGSFZ3%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T150128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQDDjIPvWaXLwYzGG%2F1wwzYrr3xjiJY%2FZLZgTiEE6yiYMAIgcYfCFnfmIvy5yKaR61xxZsusDm1UAcm7I8%2BlIvZsycIq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDIPhGleH7DIhY5YM8SrcAySdZcmDUXVvBKUYvwDq6mtjzwtUzokjVdAFXyV805JEyCNYLUThKxkBSiB8Dge8ANvvLG48VG8%2BFF69F1l5vlc9dVLUPRlKNWacMjHqEZud454A8liK93OmyS6yIRKxmjy4C6KLo%2Fp6ANHHuiWAJVW7TDrVCnACwZe%2F62VX4xU5xmAMJR745gp%2F%2BxA08v2LW%2B76W%2FYuqey8usooptOF6N35LRF6xfjjUh19rFrzCKeWHAmywxgCyQKYGNgr%2BO65xrnKTOiID8gsTsXS1vTHmlm%2Bo%2Fsj%2BCsaOqPmCphhQaSUjZZ%2F9FBYAnf5ef0o16%2Foq7P8Qrhdlwuqqq34LugZV5ZwW5pYeDqQeb4aVn51c73CLQqr%2Fd%2BFJpibst%2FfzMi5xQbO%2FosBo%2BefmbcKJ373ayjlSetPUkUXkl8nCFfVZlrA1CNSaHVLT4k2u7uba1umo8GSvWug6zpX%2F%2FqFhIMvd7xbrnAX100nPrmI62cb%2BamXywREhiCvk2iykxCUXf6vliDN8HkbQUT3OSkwj6l9b5hKxO2Kfet13nCIZLYXmdzfXII5OsrcQdJODUmyUAoWw5XSGEFoTnVCcp0RYKOG5udWKV4w8fE%2Be46PuIC2vO8Cc9DVPsuOiUh2lUdDMPGRwckGOqUBdnw1B5o2OKyt3aycKbJr7AzeAcjIKKUieSRLLf2pDC5tP%2FwPxNN%2Bo0KMbWJZ31%2BwM%2B4KWxjk45p0qdn3JaXe3x1x6VzozvSWI2VRJRKTF7BByvtdpeEjWmiRMolDTccP2q8%2Bx1osD3JvvCLezIgvqJFQtu8JJvyBF%2FxB8QUtCtIkvsEQFB7Zj%2F%2BXTa42v%2B%2FHIMqQZcL1EBCTmR5iW9GnNvXkSJ1%2B&X-Amz-Signature=4e895263de92add8f849804d15a9b2670c85517a61efc266162a4c1f6e3f45c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVUH36AV%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T150143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIGTNDFzIYhtd50Fq9jiMxrbP2dw57rLxz0bu8DMXGVD%2BAiEA69nE3RJPJ6Ajz4C%2FOTJkmz00ynj0vb%2BdmgNtT9uNRF8q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDDWlcf1SkXRlxVeosCrcA1IoShonUlTfmx462%2Frv9V%2FUHB2qFdom5DlQFVs%2BXn8O01kzLdwRWJa8jSYrPMYTLtHjiryUpnfIMJFY2GiSvm9v0h8MGfBIOnPyfOgP7CWzaxN%2FyWX%2Fj2l3MvKjOTRYXsN7Th%2BGwq2FSG%2FPNNOIr6svIZcQ%2Fd8nES5iwzX%2BhdCWzDoLwjg2QxzAokRf0GSwXscpcP6y8p3iXkx3SfKhhUlPaphUFsPr9fzor94WN2xZ6Rkcu%2Ft66bkSiYbn4%2Bf5AMLBiBe95b%2Fr50sCZvQRnr0yKfnpx%2BXCl7X5exVwAZAZDQvMWCLMmzsVcP0Iy0c7M2q6uYG5WIA8AwKO%2Fh65p%2FCQLBm9c5r5s9hfbAuwTC6co4Kj8GKoRIDCwmmgGchsx8q%2FjsQz2Y86fC3Kq1GicWAZY0NYVp6IoZ2pxksmTqE255lIIvRHoyg15Z%2FPIcS4GuYunkKqrlRIb5YQ5kQ%2FuqikSHYa0ewsNjilHVnYIWU8h2T74%2BKi2urAtaXqjwa54n2%2Fq8DpkHw%2Bk7ZMB9tjNdqv67C%2BK1Kef4hlIEc7zkLYAysSrrrcJmUs9pkKiZFy8WPJDzorYW7rYMfeQXbdk47SvhA5PPww6sa7M4udIVTmWqsnTUFt3J5ftjS4MOeSwckGOqUBT3jIAhpiJyF9IVrhqSL7u3BeCHcKmjvbRJVrqM9jaFJZcFA0raQ2MdyzLwA7DGVLsjoTZNIUMHmQnPlpQOSW96IcVO73ZjTz%2FdfoEwG8fyzzyYtNty21EfEzO%2FRoLVwqqAD82RwtWSzTBmlxAihjGmqMBRKL3sTm5J6GnmLWejL5xZErdSiPYZsYLkPV%2BMabJfmxeCyxTnU1hc%2BJtmnqKEhxOmAM&X-Amz-Signature=621e1ffaa83e13213988b7878397629cc0d56c3400d17eadfa4d5c3cbdb803cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVUH36AV%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T150143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIGTNDFzIYhtd50Fq9jiMxrbP2dw57rLxz0bu8DMXGVD%2BAiEA69nE3RJPJ6Ajz4C%2FOTJkmz00ynj0vb%2BdmgNtT9uNRF8q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDDWlcf1SkXRlxVeosCrcA1IoShonUlTfmx462%2Frv9V%2FUHB2qFdom5DlQFVs%2BXn8O01kzLdwRWJa8jSYrPMYTLtHjiryUpnfIMJFY2GiSvm9v0h8MGfBIOnPyfOgP7CWzaxN%2FyWX%2Fj2l3MvKjOTRYXsN7Th%2BGwq2FSG%2FPNNOIr6svIZcQ%2Fd8nES5iwzX%2BhdCWzDoLwjg2QxzAokRf0GSwXscpcP6y8p3iXkx3SfKhhUlPaphUFsPr9fzor94WN2xZ6Rkcu%2Ft66bkSiYbn4%2Bf5AMLBiBe95b%2Fr50sCZvQRnr0yKfnpx%2BXCl7X5exVwAZAZDQvMWCLMmzsVcP0Iy0c7M2q6uYG5WIA8AwKO%2Fh65p%2FCQLBm9c5r5s9hfbAuwTC6co4Kj8GKoRIDCwmmgGchsx8q%2FjsQz2Y86fC3Kq1GicWAZY0NYVp6IoZ2pxksmTqE255lIIvRHoyg15Z%2FPIcS4GuYunkKqrlRIb5YQ5kQ%2FuqikSHYa0ewsNjilHVnYIWU8h2T74%2BKi2urAtaXqjwa54n2%2Fq8DpkHw%2Bk7ZMB9tjNdqv67C%2BK1Kef4hlIEc7zkLYAysSrrrcJmUs9pkKiZFy8WPJDzorYW7rYMfeQXbdk47SvhA5PPww6sa7M4udIVTmWqsnTUFt3J5ftjS4MOeSwckGOqUBT3jIAhpiJyF9IVrhqSL7u3BeCHcKmjvbRJVrqM9jaFJZcFA0raQ2MdyzLwA7DGVLsjoTZNIUMHmQnPlpQOSW96IcVO73ZjTz%2FdfoEwG8fyzzyYtNty21EfEzO%2FRoLVwqqAD82RwtWSzTBmlxAihjGmqMBRKL3sTm5J6GnmLWejL5xZErdSiPYZsYLkPV%2BMabJfmxeCyxTnU1hc%2BJtmnqKEhxOmAM&X-Amz-Signature=621e1ffaa83e13213988b7878397629cc0d56c3400d17eadfa4d5c3cbdb803cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

