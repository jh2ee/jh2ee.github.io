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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YLCYCBX%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T180121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCICdXCx4NKdW%2BYkovFabQE3RwKJEGmEQPbNJavdr2%2FgtYAiBeFEmLDpE0ZJjci%2Bmkdvb%2F%2BEUkN%2Fo4RqwAkXQdehheGSr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMkRYCmmKjmi0vyzCzKtwDQ8Svzi%2F8Yjpb4hnhc9jAhg3NxQjUseE2DvM21emsX3YgopHCn2VZsBTnpC5dT8am7cO1HcOysrwae4NZi3c%2FjFSGl727ErtJItIMfZgP8QCdMIy8ysCe%2BAEyjt1Z7n9yib2BbihXhTk5Fa7%2BtaoVDKuCkdFigK9lyEu6euHd%2BilWPUpVj8iLXhCJrW8J6ofZsYUgIHKUpDHpg77CnmwP5FVNq1T%2Fn%2B6UEKe0o4ltx4oK3TGG7zJoAv2cK3%2BWCKV0Hcfab2%2F8d3Bmwg5VOb%2BlmcdP32z7cE%2BSe21qgD2kUdo%2BYtX9NQapejR4lfPVFr0gE07LRRHxM4xDiWd15mxf7hUi7ycDlHhC1ASIUaIr5Gjwop83ROMY4bScqG850Ad6uhcb8P8sF%2Ba7BO%2BZpmitn8DjCY6LIaMm3ImOhnYrNNoUfxCe522PGe6g0rjQc8VmRXQVKuU0wHNKuZca35EHpOkhwiRu%2BfdYqpMcM0y%2BWi2fcONkc3%2B2Washk7wbjpXMJi1oJqLvKw%2FESfQmY42KndQdaYGmTU%2BbvWHgshTDA7Bx7mfTJM81%2FgtxqGemcaHfw4YF0cwo9x9FQGaNESswbXEMYGkC8PiRYS%2FqJtAKW7OFDiDSPV8mFn%2F0FWUw%2BubByQY6pgGXNe6OpRaHQluU%2BgCfUxiTkIk5uH1pQXdt%2FX6ni7ThcVRRMnOComF5D9pzcxIr6Z0CVMfvVuqQlrcb6g8NZJBRbVIKKPDhsNsY2Uzye60H79V%2Bnv40z%2BP8%2FlPXcHn3hVMU%2F%2FHYWmM2vFXloOcApAwHPJMoVIHOFU6S0a3ou8uNg25UJsJ%2BdYaJuM0wxiaZE57DBwiawhZGvtXSFVE%2BpuFr6RrNyBLN&X-Amz-Signature=43c2d139945921860511491887e772cac44b15ad9de2d76533d736162580516e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YLCYCBX%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T180121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCICdXCx4NKdW%2BYkovFabQE3RwKJEGmEQPbNJavdr2%2FgtYAiBeFEmLDpE0ZJjci%2Bmkdvb%2F%2BEUkN%2Fo4RqwAkXQdehheGSr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMkRYCmmKjmi0vyzCzKtwDQ8Svzi%2F8Yjpb4hnhc9jAhg3NxQjUseE2DvM21emsX3YgopHCn2VZsBTnpC5dT8am7cO1HcOysrwae4NZi3c%2FjFSGl727ErtJItIMfZgP8QCdMIy8ysCe%2BAEyjt1Z7n9yib2BbihXhTk5Fa7%2BtaoVDKuCkdFigK9lyEu6euHd%2BilWPUpVj8iLXhCJrW8J6ofZsYUgIHKUpDHpg77CnmwP5FVNq1T%2Fn%2B6UEKe0o4ltx4oK3TGG7zJoAv2cK3%2BWCKV0Hcfab2%2F8d3Bmwg5VOb%2BlmcdP32z7cE%2BSe21qgD2kUdo%2BYtX9NQapejR4lfPVFr0gE07LRRHxM4xDiWd15mxf7hUi7ycDlHhC1ASIUaIr5Gjwop83ROMY4bScqG850Ad6uhcb8P8sF%2Ba7BO%2BZpmitn8DjCY6LIaMm3ImOhnYrNNoUfxCe522PGe6g0rjQc8VmRXQVKuU0wHNKuZca35EHpOkhwiRu%2BfdYqpMcM0y%2BWi2fcONkc3%2B2Washk7wbjpXMJi1oJqLvKw%2FESfQmY42KndQdaYGmTU%2BbvWHgshTDA7Bx7mfTJM81%2FgtxqGemcaHfw4YF0cwo9x9FQGaNESswbXEMYGkC8PiRYS%2FqJtAKW7OFDiDSPV8mFn%2F0FWUw%2BubByQY6pgGXNe6OpRaHQluU%2BgCfUxiTkIk5uH1pQXdt%2FX6ni7ThcVRRMnOComF5D9pzcxIr6Z0CVMfvVuqQlrcb6g8NZJBRbVIKKPDhsNsY2Uzye60H79V%2Bnv40z%2BP8%2FlPXcHn3hVMU%2F%2FHYWmM2vFXloOcApAwHPJMoVIHOFU6S0a3ou8uNg25UJsJ%2BdYaJuM0wxiaZE57DBwiawhZGvtXSFVE%2BpuFr6RrNyBLN&X-Amz-Signature=43c2d139945921860511491887e772cac44b15ad9de2d76533d736162580516e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UD2C4GSF%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T180126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCICs%2Bjk%2Fd1%2FZY9QxhxADgojCou69U4yUNukRfcEbkdMBaAiA6jYdRaldd%2FWPWuIO%2FaLry3zj%2B9aq3wy1o%2BbsWHPpY%2Fir%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMLf4laR9ORzc%2BOxDLKtwDIoTrf8BiWFt9bRWXoJMVP3lKM4LjZ5BSVgNq5mcCq6I85wY645erSQMqP5%2F7TUvaM998pIr0%2Fu8WIVmehp5i3QqmYk%2FUOcPSOKIVirZKPuioiDQLgzNThd53Y3XBce6wHV8ultKlFetYa8TEDGD8O6x7KbVL%2BIXjefpcOHKxIKEUpouuzuCCWmILbKu7uyPN%2FxDtvej9BkCtyu7adS%2FS5q9bc%2BssW16EUtONBwrqwfQEJQaipmNuYUaKiAmu8sKsyYqrEcfuUw2oBGKbu4vAFLSm1hMZohe2f4C%2FaZCIo64nCdyr4QaFvrpN7nNf754VykKuaWoFbKkuraIurNxAsd21yZXW9ZUfYayk3b6tXv0TWsVvcCbq625kdoI4xEzfG7qPktLzq7%2FvzJIqz6t9UHXGE7XnrHW%2BA0%2Fy9yyd%2FLqsPwBzwuw0GiyPJ7q%2F9trRJ5F5GeHuLwrKBbsmp%2B95F37vFEuUIAQmwD6emIL0D7CwBnJ%2B4vgzH9DSdCnofaVoiPSbcLpbxDf5KunMgyPxAPNxG5hrB4Ad5dMvu6qTDJGj8Z8zOdVzkZAtzJV3enFYytOJeB6lMyIREf6Q8WzSCJ5d5%2FDYHlLlB9G1465P9V6wwRSrfOp%2BrneQ0B4w%2FebByQY6pgGc41iZe6rWb6jF9SORwpyEvTTQQpyJI%2BSGxA2nlfWePep7gHNaLlbEX8U0OENFYaQ9RuZPKvpdNPGFUVK38n1Eo31VHHoDtlAPzAkvHox1PxCjw8rOFASm8e1VftpNovbau4p1uq0Hg4NNv517lmXlV7YqVHmXNlYNUa%2B17RRa86oVpmT8tOzI32eGSUVVd23sh21UqABYz5UWw6G5Sz8IlzKM%2FJjH&X-Amz-Signature=3caa6abf53a0270d60c455b9d2733f13bb88c6a8e4b4da27af419c974d00b2f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UD2C4GSF%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T180126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCICs%2Bjk%2Fd1%2FZY9QxhxADgojCou69U4yUNukRfcEbkdMBaAiA6jYdRaldd%2FWPWuIO%2FaLry3zj%2B9aq3wy1o%2BbsWHPpY%2Fir%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMLf4laR9ORzc%2BOxDLKtwDIoTrf8BiWFt9bRWXoJMVP3lKM4LjZ5BSVgNq5mcCq6I85wY645erSQMqP5%2F7TUvaM998pIr0%2Fu8WIVmehp5i3QqmYk%2FUOcPSOKIVirZKPuioiDQLgzNThd53Y3XBce6wHV8ultKlFetYa8TEDGD8O6x7KbVL%2BIXjefpcOHKxIKEUpouuzuCCWmILbKu7uyPN%2FxDtvej9BkCtyu7adS%2FS5q9bc%2BssW16EUtONBwrqwfQEJQaipmNuYUaKiAmu8sKsyYqrEcfuUw2oBGKbu4vAFLSm1hMZohe2f4C%2FaZCIo64nCdyr4QaFvrpN7nNf754VykKuaWoFbKkuraIurNxAsd21yZXW9ZUfYayk3b6tXv0TWsVvcCbq625kdoI4xEzfG7qPktLzq7%2FvzJIqz6t9UHXGE7XnrHW%2BA0%2Fy9yyd%2FLqsPwBzwuw0GiyPJ7q%2F9trRJ5F5GeHuLwrKBbsmp%2B95F37vFEuUIAQmwD6emIL0D7CwBnJ%2B4vgzH9DSdCnofaVoiPSbcLpbxDf5KunMgyPxAPNxG5hrB4Ad5dMvu6qTDJGj8Z8zOdVzkZAtzJV3enFYytOJeB6lMyIREf6Q8WzSCJ5d5%2FDYHlLlB9G1465P9V6wwRSrfOp%2BrneQ0B4w%2FebByQY6pgGc41iZe6rWb6jF9SORwpyEvTTQQpyJI%2BSGxA2nlfWePep7gHNaLlbEX8U0OENFYaQ9RuZPKvpdNPGFUVK38n1Eo31VHHoDtlAPzAkvHox1PxCjw8rOFASm8e1VftpNovbau4p1uq0Hg4NNv517lmXlV7YqVHmXNlYNUa%2B17RRa86oVpmT8tOzI32eGSUVVd23sh21UqABYz5UWw6G5Sz8IlzKM%2FJjH&X-Amz-Signature=3caa6abf53a0270d60c455b9d2733f13bb88c6a8e4b4da27af419c974d00b2f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5A5BFGR%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T180119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIHaCSzV91X6CNj6kBOM%2Fn0urCxOsz1KgsEahwmlpt1k2AiAZ7bawYLTV3EKS1S5bmvFN86Nt%2FCk%2FGEoDyNDxQ5Bg2Sr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMUlNT4RSR8AUYcuZSKtwDZvZz63x5HM%2Fu0Hcz0Pd7RbdcoOlUomnse9l0A%2BfUPpfwrbpDgRTNIPClBtNb9JahZxkBGiOpj93PJu1%2BhiL3G%2B%2FDNG5Ptd3jd5DRtaA7OK6k5%2BEyOhkwqpLitNA%2FeCF0QzsOqJ7WHFqmx%2Fp%2BDwoNwkgAqejYAE%2FHvwuQDmLBli9%2BUkhXxu%2BWmeYv5jQ5azfMRiumAaEp7XJjZ0Zmk4ARSdiWRCTbPMBHSCKmljfWQv7c7BmJNpiC%2FQetihC7pmNXGi6hGEOKHi7Ic%2FVZOMNHVbqNy2%2BjFx4BdqOUyifkyo8PKS4f7SN%2FlaKyP270vVNVIB7dmbAz3BFTsewxIPcPKPxbrUM4xq5lz4xAIoQEDoFifu24kYy930%2BBSmyP1hC8L56ewm6225GF0q8cDmc8KR0ZK5JHToWR60g%2FkBwcqdax%2FK4MAY1DtEO%2Bb6AoOH8OKfoBpndi9B7XqbFTPZxuRizJCAhX8tGEfOENCeTRFZVOsC96PS7G14PQxVtNXpesejD9GWnjMglNAZ51W5w8BJRdHyE2bgBdrZir5KmZzxZ19nGMOP0gbS9FMnQrOUlekmklfvRgkcVPmVLVv3WG9oByG4Wni8fp6eg3C2FNgo6kP29tor%2B8RW%2BYSJYwzubByQY6pgHfBJCVs4eTvBwuBJ7iszUj5AmCHEM7KbWvxU%2BzyQZvpJwveFdmJMfU2BRCqd3fb2b5o4ohnw2s%2FqWdHkU4exVa4nHMTrxYQZzsGdyeJx0YU1bGji9S%2BoncDsjXYP44riQNBnUNZgtkJ1e%2BrLh5CQAjCsOQDwMeP%2F%2BUKQY52CU3jDAh2Ob7QkDlpJ%2FN7%2BYz4YDDqB699g5yS7e3PWqs847PQWPyo7l9&X-Amz-Signature=35656ee8da90f97101d63871f5b25da7b54b034918294b93d4ba99a2cce70697&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SIERCRD%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T180130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDl7UsmO6rycMacG7jZ3uG%2BIWalxCFuJuRr1%2FRrI7mpuQIgfI%2BoRmFBF1e%2FgrZeid9SGFme5JRYd4g3jTCMltZzoecq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDJZ4asfafRtK%2FLK%2BBCrcAylgko8cs9ii5higDkIcNJvAFWBVP50jE9YLJSAjQ1oJf25NAUq%2Fb3Rbgmiu1fo%2FBKc6mzUi0iOirSnSWYuvhkTsqhqt3WdBCQE7nDUz1ltw83B3rBZ2vWDpbsDjeuyn40I2zMyuxJjr2aS%2FdE2i99b5eEMgLhxoQyEyXjporOmFlO6riZLtwXFDVBRU2m32Z7IjX6eIZRLRgHPPAQRQmoAxKZPFsgoLkIywk2P%2BjwZcnBZH6XrWWNxDXpSZkoui1VkdFgBAxkln5%2FeaZp6lotIU4lRj%2FuQYLZK445G6BkMFkhG3cZcPcH%2Bu9xMrvHrX2yP9KgFYxf3%2FJ4BBOUwaAE4wjtFFaabPay%2FnHqom1R1v2z4IhMPtZGY1NueI6yzNERkVjqI611HC3%2BqFPY9WU9v7Jk4c%2FD6LImTWEhRGz7g5RdETigv3%2BZcPavDRhKjI0pkV2eqKpfBO4jEo%2FY%2BAVnb7tjCfCyP%2FK2k5FgibuCpuaX9GzN%2FQrmPHkQlkCbu3BM%2FAxKKVy1njoTJvLYeMb92lBSUU1OH6mHOhMJ%2BmkaYF%2BTL3caoroToPXJL4ix1pNE8LLC%2FsF1J%2F0QLYY1njMYFyXGCa5D1t7%2B54MVPH7pgUvVMkTSHR4a9QN1UlMKnnwckGOqUBoqUREo8kMk1xL%2FOg%2BdPUHrBS7cRz0F5aItrP4pqoBu%2BpAg07%2FQAWnaW3LKegVTC19r%2BtOPZ%2BtjPz5pSRtcGcS5s9QrohkQlZW0wZvjzXdqPkNZrUWZkW13xDKMjqpzOHl%2BMwuCIZ6q4absODAzEd%2B1vi8bPo4s%2FYe3LdXqTIJtGrICyDMB7mfcCQcQ5me07uQTzFkFsK7m%2FefW5tdKTkGFZzCSUD&X-Amz-Signature=fad8c317e38ac97e1de8bdc590753c8602e64ac74a0b87f7d022b4ab781e5833&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SIERCRD%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T180130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDl7UsmO6rycMacG7jZ3uG%2BIWalxCFuJuRr1%2FRrI7mpuQIgfI%2BoRmFBF1e%2FgrZeid9SGFme5JRYd4g3jTCMltZzoecq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDJZ4asfafRtK%2FLK%2BBCrcAylgko8cs9ii5higDkIcNJvAFWBVP50jE9YLJSAjQ1oJf25NAUq%2Fb3Rbgmiu1fo%2FBKc6mzUi0iOirSnSWYuvhkTsqhqt3WdBCQE7nDUz1ltw83B3rBZ2vWDpbsDjeuyn40I2zMyuxJjr2aS%2FdE2i99b5eEMgLhxoQyEyXjporOmFlO6riZLtwXFDVBRU2m32Z7IjX6eIZRLRgHPPAQRQmoAxKZPFsgoLkIywk2P%2BjwZcnBZH6XrWWNxDXpSZkoui1VkdFgBAxkln5%2FeaZp6lotIU4lRj%2FuQYLZK445G6BkMFkhG3cZcPcH%2Bu9xMrvHrX2yP9KgFYxf3%2FJ4BBOUwaAE4wjtFFaabPay%2FnHqom1R1v2z4IhMPtZGY1NueI6yzNERkVjqI611HC3%2BqFPY9WU9v7Jk4c%2FD6LImTWEhRGz7g5RdETigv3%2BZcPavDRhKjI0pkV2eqKpfBO4jEo%2FY%2BAVnb7tjCfCyP%2FK2k5FgibuCpuaX9GzN%2FQrmPHkQlkCbu3BM%2FAxKKVy1njoTJvLYeMb92lBSUU1OH6mHOhMJ%2BmkaYF%2BTL3caoroToPXJL4ix1pNE8LLC%2FsF1J%2F0QLYY1njMYFyXGCa5D1t7%2B54MVPH7pgUvVMkTSHR4a9QN1UlMKnnwckGOqUBoqUREo8kMk1xL%2FOg%2BdPUHrBS7cRz0F5aItrP4pqoBu%2BpAg07%2FQAWnaW3LKegVTC19r%2BtOPZ%2BtjPz5pSRtcGcS5s9QrohkQlZW0wZvjzXdqPkNZrUWZkW13xDKMjqpzOHl%2BMwuCIZ6q4absODAzEd%2B1vi8bPo4s%2FYe3LdXqTIJtGrICyDMB7mfcCQcQ5me07uQTzFkFsK7m%2FefW5tdKTkGFZzCSUD&X-Amz-Signature=fad8c317e38ac97e1de8bdc590753c8602e64ac74a0b87f7d022b4ab781e5833&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

